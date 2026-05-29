const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');
const outDir = path.join(__dirname, '..', 'public', 'data');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const fileNames = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

function calculateReadingTime(content) {
  const wordsPerMinute = 300;
  const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
  return Math.max(1, Math.ceil((chineseChars + englishWords) / wordsPerMinute));
}

const posts = fileNames.map(fileName => {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDir, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    excerpt: data.excerpt || content.slice(0, 150).replace(/[#*`>\n]/g, ' ').trim() + '...',
    tags: data.tags || [],
    readingTime: calculateReadingTime(content),
  };
}).sort((a, b) => (a.date > b.date ? -1 : 1));

fs.writeFileSync(path.join(outDir, 'search-index.json'), JSON.stringify(posts));
console.log(`✅ 搜索索引已生成: ${posts.length} 篇文章`);
