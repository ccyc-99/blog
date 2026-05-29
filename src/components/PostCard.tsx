import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

// 领域标签 → 颜色映射
const categoryColors: Record<string, string> = {
  '前端': 'bg-blue-50 text-blue-600 border-blue-100',
  'React': 'bg-cyan-50 text-cyan-600 border-cyan-100',
  'Vue': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'JavaScript': 'bg-yellow-50 text-yellow-600 border-yellow-100',
  'TypeScript': 'bg-blue-50 text-blue-600 border-blue-100',
  'CSS': 'bg-sky-50 text-sky-600 border-sky-100',
  '后端': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Node.js': 'bg-green-50 text-green-600 border-green-100',
  'Python': 'bg-blue-50 text-blue-600 border-blue-100',
  'Go': 'bg-cyan-50 text-cyan-600 border-cyan-100',
  'Rust': 'bg-orange-50 text-orange-600 border-orange-100',
  'AI': 'bg-pink-50 text-pink-600 border-pink-100',
  'LLM': 'bg-purple-50 text-purple-600 border-purple-100',
  '机器学习': 'bg-rose-50 text-rose-600 border-rose-100',
  'DevOps': 'bg-orange-50 text-orange-600 border-orange-100',
  'Docker': 'bg-blue-50 text-blue-600 border-blue-100',
  'Kubernetes': 'bg-indigo-50 text-indigo-600 border-indigo-100',
  '算法': 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
  '软件工程': 'bg-amber-50 text-amber-600 border-amber-100',
  '架构': 'bg-violet-50 text-violet-600 border-violet-100',
  '安全': 'bg-red-50 text-red-600 border-red-100',
  '数据库': 'bg-teal-50 text-teal-600 border-teal-100',
  '网络': 'bg-green-50 text-green-600 border-green-100',
  '移动开发': 'bg-sky-50 text-sky-600 border-sky-100',
  '成长': 'bg-rose-50 text-rose-600 border-rose-100',
};

function getTagColor(tag: string): string {
  return categoryColors[tag] || 'bg-gray-50 text-gray-500 border-gray-100';
}

export default function PostCard({ post, compact = false }: { post: PostMeta; compact?: boolean }) {
  return (
    <article className="group cursor-pointer">
      <Link
        href={`/posts/${post.slug}`}
        className={`glass-card block rounded-2xl ${compact ? 'p-4 md:p-5' : 'p-6 md:p-7'}`}
      >
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
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
        <h2 className={`font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug mb-2 ${compact ? 'text-base md:text-lg' : 'text-xl md:text-2xl'}`}>
          {post.title}
        </h2>

        {/* Excerpt - only show on non-compact */}
        {!compact && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}

        {/* Tags with category colors */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, compact ? 3 : 6).map((tag) => {
              const colorClass = getTagColor(tag);
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border transition-all duration-200 group-hover:shadow-sm ${colorClass}`}
                >
                  {tag}
                </span>
              );
            })}
            {post.tags.length > (compact ? 3 : 6) && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs text-gray-400">
                +{post.tags.length - (compact ? 3 : 6)}
              </span>
            )}
          </div>
        )}
      </Link>
    </article>
  );
}
