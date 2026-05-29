import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-400 transition-colors mb-10 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回文章列表
      </Link>

      {/* Article header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-200 mb-6 leading-[1.15] tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-indigo-500/15 text-indigo-400 rounded-full hover:bg-indigo-500/25 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Decorative divider */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-indigo-500/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#0a0a1a] px-3">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
        </div>
      </div>

      {/* Article content */}
      <MarkdownRenderer content={post.content} />

      {/* Footer navigation */}
      <div className="mt-16 pt-8 border-t border-indigo-500/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-all duration-200 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>

          <Link
            href="/tags"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all duration-200 group"
          >
            浏览更多标签
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
