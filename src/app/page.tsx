import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          思维漫游
        </h1>
        <p className="text-gray-500 text-lg">
          用文字记录思考，分享技术、生活与成长。
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">还没有文章</h2>
          <p className="text-gray-500">
            在 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">src/content/posts/</code> 目录下添加 Markdown 文件即可开始写作。
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
