import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            持续更新中
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
            思维漫游
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            用文字记录思考，分享技术、生活与成长。<br />
            每一个想法，都值得被书写。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-white/60">
            <span>{posts.length} 篇文章</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>持续更新</span>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">还没有文章</h2>
            <p className="text-gray-500">
              在 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">src/content/posts/</code> 目录下添加 Markdown 文件即可开始写作。
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
              <Link
                href="/tags"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                浏览标签 →
              </Link>
            </div>
            <div className="grid gap-5">
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
