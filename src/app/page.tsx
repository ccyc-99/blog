import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-indigo-50 via-violet-50/80 to-rose-50/60" />

        {/* Decorative blur circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32 lg:py-40 text-center">
          {/* Status badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-gray-600 font-medium">持续更新中</span>
          </div>

          {/* Main heading */}
          <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
            <span className="text-gradient">
              思维漫游
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            用文字记录思考，分享技术、生活与成长。
            <br />
            每一个想法，都值得被书写。
          </p>

          {/* Quick stats */}
          <div className="animate-fade-in-up-delay-3 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="text-gray-600 font-medium">{posts.length} 篇文章</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-gray-600 font-medium">多标签分类</span>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="animate-fade-in-up-delay-4 absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
            <span className="text-xs text-gray-400">向下浏览文章</span>
            <svg className="w-4 h-4 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:py-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-indigo-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">还没有文章</h2>
            <p className="text-gray-500">
              在 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">src/content/posts/</code> 目录下添加 Markdown 文件即可开始写作。
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  最新文章
                </h2>
                <p className="text-gray-400 text-sm mt-1">发现有趣的思考和见解</p>
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
            <div className="grid gap-4">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
