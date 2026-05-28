import { getAllTags } from '@/lib/posts';
import Link from 'next/link';

export default function TagsPage() {
  const tags = getAllTags();

  const gradients = [
    'from-indigo-500 to-purple-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-rose-500',
    'from-sky-500 to-blue-500',
    'from-violet-500 to-fuchsia-500',
    'from-amber-500 to-yellow-500',
    'from-cyan-500 to-blue-500',
    'from-pink-500 to-rose-500',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">标签分类</h1>
        <p className="text-gray-500">按标签浏览文章，找到你感兴趣的内容。</p>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <p className="text-lg">暂无标签</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {tags.map(({ tag, count }, index) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-lg hover:border-transparent transition-all duration-300 card-lift"
            >
              {/* Gradient bar on top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-semibold group-hover:text-indigo-600 transition-colors">
                  {tag}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {count} 篇文章
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
