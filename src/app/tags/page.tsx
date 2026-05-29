import { getAllTags } from '@/lib/posts';
import Link from 'next/link';

export default function TagsPage() {
  const tags = getAllTags();

  const gradients = [
    'from-indigo-400 via-violet-400 to-purple-500',
    'from-emerald-400 to-teal-500',
    'from-orange-400 to-rose-500',
    'from-sky-400 to-blue-500',
    'from-violet-400 to-fuchsia-500',
    'from-amber-400 to-yellow-500',
    'from-cyan-400 to-blue-500',
    'from-pink-400 to-rose-500',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          标签分类
        </h1>
        <p className="text-gray-500">
          按标签浏览文章，找到你感兴趣的内容。
        </p>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-lg text-gray-400">暂无标签</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {tags.map(({ tag, count }, index) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="glass-card group rounded-2xl p-5 cursor-pointer relative overflow-hidden"
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative">
                <span className="block text-gray-900 font-semibold group-hover:text-indigo-600 transition-colors duration-200">
                  {tag}
                </span>
                <span className="block mt-2 text-xs text-gray-400">
                  {count} 篇文章
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
