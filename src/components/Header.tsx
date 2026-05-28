import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          ✦ 思维漫游
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            文章
          </Link>
          <Link href="/tags" className="text-gray-600 hover:text-gray-900 transition-colors">
            标签
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
