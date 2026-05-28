export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">关于我</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        {/* Avatar & Name */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            S
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">思维漫游者</h2>
            <p className="text-gray-500 text-sm">全栈开发者 · 终身学习者</p>
          </div>
        </div>

        {/* Bio */}
        <div className="prose prose-gray max-w-none">
          <p>
            你好！欢迎来到我的博客 —— <strong>思维漫游</strong>。
          </p>
          <p>
            我是一名热爱技术的全栈开发者，专注于 Web 开发、系统设计和开源社区。
            这个博客是我记录学习心得、技术探索和生活感悟的地方。
          </p>
          <p>
            我相信 <strong>写作是最好的思考方式</strong>，通过文字将模糊的想法梳理清晰，
            也希望这些内容能对你有所启发。
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">技术栈</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'TypeScript', 'React', 'Next.js', 'Node.js',
              'Python', 'Go', 'PostgreSQL', 'Docker',
              'Tailwind CSS', 'GraphQL', 'Redis', 'AWS',
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">联系方式</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-800">GitHub:</span>{' '}
              <a href="https://github.com" className="text-blue-600 hover:underline">
                github.com/your-username
              </a>
            </p>
            <p>
              <span className="font-medium text-gray-800">Email:</span>{' '}
              <a href="mailto:hello@example.com" className="text-blue-600 hover:underline">
                hello@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
