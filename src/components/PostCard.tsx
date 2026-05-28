import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      <Link href={`/posts/${post.slug}`} className="block space-y-3">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <time dateTime={post.date}>{post.date}</time>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{post.readingTime} 分钟阅读</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
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
