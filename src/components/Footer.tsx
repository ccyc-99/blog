export default function Footer() {
  const links = [
    { label: '文章', href: '/' },
    { label: '标签', href: '/tags' },
    { label: '关于', href: '/about' },
  ];

  return (
    <footer className="border-t border-indigo-500/10 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-sm shadow-indigo-500/20">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-300">思维漫游</span>
          </div>

          <nav className="flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-4 pt-4 border-t border-indigo-500/10 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} 思维漫游 — 用文字记录思考，让思考留下痕迹。
          </p>
        </div>
      </div>
    </footer>
  );
}
