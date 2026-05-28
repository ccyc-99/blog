import { getAllTags } from '@/lib/posts';
import Link from 'next/link';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">标签分类</h1>
      <p className="text-gray-500 mb-10">按标签浏览文章，找到你感兴趣的内容。</p>

      {tags.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">暂无标签</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="group inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              <span className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                {tag}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
