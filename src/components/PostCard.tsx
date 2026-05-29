import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group cursor-pointer">
      <Link
        href={`/posts/${post.slug}`}
        className="glass-card block rounded-2xl p-6 md:p-7"
      >
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug mb-3">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-lg border border-gray-100 group-hover:border-indigo-200 group-hover:bg-indigo-50/50 group-hover:text-indigo-600 transition-all duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
