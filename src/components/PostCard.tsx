import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="card-lift group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-indigo-100">
      <Link href={`/posts/${post.slug}`} className="block p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug mb-2">
          {post.title}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
