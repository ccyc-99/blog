import Link from 'next/link';

export default function AboutPage() {
  const skills = [
    { category: '前端', items: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS'] },
    { category: '后端', items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis'] },
    { category: '工具', items: ['Docker', 'Git', 'GitHub Actions', 'AWS', 'Figma'] },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">关于我</h1>
        <p className="text-gray-500">一个热爱技术和写作的开发者。</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-500/25">
            ✦
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">思维漫游者</h2>
            <p className="text-gray-500 mt-1">全栈开发者 · 终身学习者 · 写作爱好者</p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none">
          <p>
            你好！欢迎来到 <strong>思维漫游</strong> — 一个记录技术探索与成长思考的个人博客。
          </p>
          <p>
            我相信<strong>写作是最好的思考方式</strong>。通过文字，将模糊的想法梳理成清晰的逻辑，
            把零散的知识编织成系统的认知。每一篇文章，都是我与自己对话的过程。
          </p>
          <p>
            这个博客涵盖了 Web 开发、编程实践、学习方法和生活感悟。如果你也对这些话题感兴趣，
            欢迎常来看看，也欢迎通过下面的方式与我交流。
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          技术栈
        </h3>
        <div className="space-y-4">
          {skills.map((group) => (
            <div key={group.category}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          联系方式
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href="https://github.com/ccyc-99"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <div>
              <div className="text-sm font-medium text-gray-900">GitHub</div>
              <div className="text-xs text-gray-500">@ccyc-99</div>
            </div>
          </a>
          <a
            href="mailto:69506028@qq.com"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="text-sm font-medium text-gray-900">Email</div>
              <div className="text-xs text-gray-500">69506028@qq.com</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
