import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

const categoryColors: Record<string, string> = {
  '前端': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'React': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Vue': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'JavaScript': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'TypeScript': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'CSS': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  '后端': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Node.js': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Python': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Go': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Rust': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'AI': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'LLM': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  '机器学习': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'DevOps': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Docker': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Kubernetes': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  '算法': 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  '软件工程': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  '架构': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  '安全': 'bg-red-500/10 text-red-400 border-red-500/20',
  '数据库': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  '网络': 'bg-green-500/10 text-green-400 border-green-500/20',
  '移动开发': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  '成长': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

function getTagColor(tag: string): string {
  return categoryColors[tag] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
}

export default function PostCard({ post, compact = false }: { post: PostMeta; compact?: boolean }) {
  return (
    <article className="group cursor-pointer">
      <Link
        href={`/posts/${post.slug}`}
        className={`glass-card block rounded-2xl ${compact ? 'p-4' : 'p-5 md:p-6'}`}
      >
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </div>

        <h2 className={`font-bold text-gray-100 group-hover:text-indigo-400 transition-colors duration-200 leading-snug mb-2 ${compact ? 'text-sm md:text-base' : 'text-lg md:text-xl'}`}>
          {post.title}
        </h2>

        {!compact && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, compact ? 2 : 4).map((tag) => {
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
            {post.tags.length > (compact ? 2 : 4) && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600">
                +{post.tags.length - (compact ? 2 : 4)}
              </span>
            )}
          </div>
        )}
      </Link>
    </article>
  );
}
