export default function Footer() {
  const links = [
    { label: '文章', href: '/' },
    { label: '标签', href: '/tags' },
    { label: '关于', href: '/about' },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs">
              ✦
            </span>
            <span className="text-sm font-medium text-gray-700">思维漫游</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} 思维漫游 — 用文字记录思考，让思考留下痕迹。</p>
        </div>
      </div>
    </footer>
  );
}
