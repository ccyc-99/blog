import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

// 领域分类映射
const categories = [
  {
    name: '前端技术',
    slug: 'frontend',
    tags: ['前端', 'React', 'Vue', 'Svelte', 'JavaScript', 'CSS', 'Web Components', 'WebAssembly', 'Canvas', 'WebRTC', 'SVG', 'Next.js', 'Tailwind'],
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
  },
  {
    name: '后端开发',
    slug: 'backend',
    tags: ['后端', 'Node.js', 'Python', 'Go', 'Rust', 'Java', '数据库', 'Redis', 'MySQL', 'MongoDB', 'API', 'GraphQL', 'gRPC', 'WebSocket', 'Elasticsearch'],
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
  },
  {
    name: 'DevOps & 云原生',
    slug: 'devops',
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', '云原生', 'Terraform', '监控', '日志', '安全', 'GitHub', 'GitOps', 'Service Mesh', 'SRE', 'IaC', 'Ansible'],
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50',
  },
  {
    name: '编程语言',
    slug: 'languages',
    tags: ['编程', 'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C++', 'Java', 'Kotlin', 'Swift', 'Dart', 'Lua', 'Scala', 'Elixir', 'Haskell', 'Julia', 'Zig', 'Shell'],
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
  },
  {
    name: '数据与 AI',
    slug: 'data-ai',
    tags: ['AI', '机器学习', '深度学习', 'LLM', '数据科学', '大数据', 'SQL', 'NLP', 'RAG', 'LangChain', '向量数据库', 'Prompt', '推荐系统', 'Spark', 'Flink', 'ETL', '数据仓库', '数据可视化'],
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
  },
  {
    name: '软件工程',
    slug: 'engineering',
    tags: ['软件工程', '架构', 'DDD', '设计模式', '重构', '测试', '项目管理', '工程化', '代码审查', '文档', '敏捷', '开源', '技术债务', '微服务'],
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    color: 'from-amber-500 to-yellow-500',
    bg: 'bg-amber-50',
  },
  {
    name: '移动开发',
    slug: 'mobile',
    tags: ['移动开发', 'React Native', 'Flutter', 'iOS', 'Android', 'SwiftUI', 'Compose', '小程序', '跨平台'],
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    color: 'from-sky-500 to-indigo-500',
    bg: 'bg-sky-50',
  },
  {
    name: '计算机网络',
    slug: 'network',
    tags: ['网络', 'HTTP', 'TCP', 'DNS', 'HTTPS', 'CDN', '协议', '代理', 'IPv6'],
    icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0',
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
  },
  {
    name: '算法与数据结构',
    slug: 'algorithms',
    tags: ['算法', '数据结构', '动态规划', '图论', '缓存', '分布式'],
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
    color: 'from-fuchsia-500 to-pink-500',
    bg: 'bg-fuchsia-50',
  },
  {
    name: '职业成长',
    slug: 'growth',
    tags: ['成长', '学习方法', '面试', '写作', '知识管理', '领导力', '个人品牌', '心理健康', '远程工作', '效率', '英语', '演讲', '副业'],
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    color: 'from-rose-500 to-orange-500',
    bg: 'bg-rose-50',
  },
];

function groupPostsByCategory(posts: ReturnType<typeof getAllPosts>) {
  return categories.map((cat) => {
    const filtered = posts.filter((p) =>
      p.tags.some((t) => cat.tags.includes(t))
    );
    return { ...cat, posts: filtered, count: filtered.length };
  });
}

export default function Home() {
  const allPosts = getAllPosts();
  const groupedCategories = groupPostsByCategory(allPosts);
  const categoriesWithPosts = groupedCategories.filter((c) => c.count > 0);

  // 最近更新的文章（前 8 篇）
  const recentPosts = allPosts.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-indigo-50 via-violet-50/80 to-rose-50/60" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 lg:py-32 text-center">
          {/* Status badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-gray-600 font-medium">持续更新 · {allPosts.length} 篇文章</span>
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
            <span className="text-gradient">思维漫游</span>
          </h1>

          <p className="animate-fade-in-up-delay-2 text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            用文字记录思考，分享技术、生活与成长。
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in-up-delay-3 max-w-lg mx-auto mb-10">
            <form action="/search" method="GET" className="relative group">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                name="q"
                placeholder="搜索 210 篇文章..."
                className="w-full pl-12 pr-4 py-3.5 text-sm bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-indigo-500/5 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-300 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
              />
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-medium text-gray-400 bg-gray-100/80 rounded-md border border-gray-200/60">
                <span className="text-xs">⌘</span>K
              </kbd>
            </form>
          </div>

          {/* Quick stats */}
          <div className="animate-fade-in-up-delay-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="text-gray-600 font-medium">{allPosts.length} 篇文章</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-gray-600 font-medium">{categories.length} 大领域</span>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="animate-fade-in-up-delay-4 absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
            <span className="text-xs text-gray-400">向下浏览分类</span>
            <svg className="w-4 h-4 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categoriesWithPosts.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border border-transparent hover:border-gray-200 hover:bg-white/80 hover:shadow-sm ${cat.bg}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
              </svg>
              <span className="text-gray-700">{cat.name}</span>
              <span className="text-xs text-gray-400">({cat.count})</span>
            </a>
          ))}
          <Link
            href="/tags"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-indigo-600 bg-indigo-50/80 border border-indigo-100 whitespace-nowrap hover:bg-indigo-100 transition-all duration-200"
          >
            全部标签 →
          </Link>
        </div>
      </section>

      {/* Category Sections */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-16 space-y-16">
        {categoriesWithPosts.map((cat) => (
          <section key={cat.slug} id={cat.slug}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{cat.name}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{cat.count} 篇文章</p>
                </div>
              </div>
              {cat.count > 5 && (
                <Link
                  href={`/tags/${encodeURIComponent(cat.tags[0])}`}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
                >
                  更多
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Posts Grid */}
            {cat.count === 0 ? (
              <div className="text-center py-8 bg-white/40 rounded-2xl border border-gray-100">
                <p className="text-gray-400 text-sm">暂无该分类文章</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {cat.posts.slice(0, 6).map((post) => (
                  <PostCard key={post.slug} post={post} compact />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Recent Updates */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              最近更新
            </h2>
            <p className="text-gray-400 text-sm mt-1">最新发布的文章</p>
          </div>
          <Link
            href="/tags"
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200"
          >
            浏览标签
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      </section>

      {/* Empty state */}
      {allPosts.length === 0 && (
        <section className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">还没有文章</h2>
          <p className="text-gray-500">
            在 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">src/content/posts/</code> 目录下添加 Markdown 文件即可开始写作。
          </p>
        </section>
      )}
    </div>
  );
}
