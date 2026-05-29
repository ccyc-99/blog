'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { loadSearchIndex, searchPostsLocal, type SearchPost } from '@/lib/search-client';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchPost[]>([]);
  const [allPosts, setAllPosts] = useState<SearchPost[]>([]);

  useEffect(() => {
    loadSearchIndex().then(setAllPosts);
  }, []);

  useEffect(() => {
    if (!activeQuery.trim() || allPosts.length === 0) {
      setResults([]);
      return;
    }
    setResults(searchPostsLocal(allPosts, activeQuery));
  }, [activeQuery, allPosts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
    router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">搜索文章</h1>
        <p className="text-gray-500 mb-6">按标题、摘要或标签搜索你感兴趣的内容。</p>

        <form onSubmit={handleSubmit} className="relative max-w-xl">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词搜索..."
            className="w-full pl-12 pr-24 py-3 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-300 focus:bg-white transition-all duration-200 shadow-sm"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-all duration-200 shadow-sm">
            搜索
          </button>
        </form>
      </div>

      {activeQuery ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              搜索 &ldquo;<span className="font-medium text-gray-700">{activeQuery}</span>&rdquo;，
              找到 <span className="font-semibold text-indigo-600">{results.length}</span> 篇文章
            </p>
          </div>
          {results.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-400 mb-2">没有找到匹配的文章</p>
              <p className="text-sm text-gray-300">试试其他关键词</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-400">输入关键词开始搜索</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <svg className="animate-spin w-8 h-8 text-indigo-400 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
