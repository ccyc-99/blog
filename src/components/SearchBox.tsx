'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { loadSearchIndex, searchPostsLocal, type SearchPost } from '@/lib/search-client';

export default function SearchBox({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [allPosts, setAllPosts] = useState<SearchPost[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSearchIndex().then(setAllPosts);
  }, []);

  useEffect(() => {
    if (!query.trim() || allPosts.length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const found = searchPostsLocal(allPosts, query).slice(0, 8);
    setResults(found);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query, allPosts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      window.location.href = `/posts/${results[selectedIndex].slug}`;
    }
  };

  return (
    <div ref={containerRef} className={compact ? 'relative' : 'relative w-full max-w-2xl'}>
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={compact ? '搜索...' : '搜索文章标题、标签、内容...'}
          className={`w-full pl-10 pr-10 py-2.5 text-sm bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-300 focus:bg-white transition-all duration-200 placeholder:text-gray-400 ${compact ? 'text-xs py-2' : ''}`}
        />
        {!compact && !query && (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded-md border border-gray-200">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-xl shadow-xl shadow-black/5 overflow-hidden max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-400">未找到相关文章</p>
            </div>
          ) : (
            <>
              <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100">找到 {results.length} 篇文章</div>
              {results.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 hover:bg-indigo-50/50 transition-colors duration-150 ${index === selectedIndex ? 'bg-indigo-50/80' : ''} ${index < results.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{post.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate">{post.excerpt}</div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-block px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-center text-sm text-indigo-600 hover:bg-indigo-50/50 border-t border-gray-100 font-medium transition-colors"
              >
                查看全部结果 →
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
