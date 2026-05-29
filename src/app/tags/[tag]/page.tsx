import { getPostsByTag, getAllTags } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      {/* Back link */}
      <Link
        href="/tags"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        所有标签
      </Link>

      {/* Tag header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 glass-card rounded-2xl">
          <span className="text-lg font-bold text-indigo-600">
            {decodedTag}
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="text-sm text-gray-400">
            {posts.length} 篇文章
          </span>
        </div>
      </div>

      {/* Posts list */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
