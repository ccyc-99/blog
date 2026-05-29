'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';

interface PostMeta {
  slug: string;
  title: string;
  tag?: string;
}

export default function SpinningTitle({ posts }: { posts: PostMeta[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerFlip = useCallback(() => {
    if (posts.length <= 1) return;
    setDirection((prev) => (prev === 'up' ? 'down' : 'up'));
    setIsFlipping(true);
    flipTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 350);
    flipTimeoutRef.current = setTimeout(() => {
      setIsFlipping(false);
    }, 700);
  }, [posts.length]);

  useEffect(() => {
    if (posts.length === 0) return;
    setCurrentIndex(Math.floor(Math.random() * posts.length));

    intervalRef.current = setInterval(() => {
      if (!isPaused) triggerFlip();
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, [posts.length, isPaused, triggerFlip]);

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];
  const nextPost = posts[(currentIndex + 1) % posts.length];

  const palettes = [
    { from: 'from-indigo-500', to: 'to-violet-500', text: 'text-indigo-400', border: 'border-indigo-500/30' },
    { from: 'from-emerald-500', to: 'to-teal-500', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    { from: 'from-orange-500', to: 'to-rose-500', text: 'text-orange-400', border: 'border-orange-500/30' },
    { from: 'from-sky-500', to: 'to-cyan-500', text: 'text-sky-400', border: 'border-sky-500/30' },
    { from: 'from-fuchsia-500', to: 'to-pink-500', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30' },
  ];
  const palette = palettes[currentIndex % palettes.length];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>随机推荐</span>

        <span className="flex items-center gap-1 ml-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`block w-1 h-1 rounded-full transition-all duration-500 ${
                i === currentIndex % 5 ? 'bg-indigo-400 w-3' : 'bg-gray-600'
              }`}
            />
          ))}
        </span>

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsPaused(!isPaused); }}
          className="ml-2 p-0.5 rounded hover:bg-white/5 transition-colors"
          title={isPaused ? '继续轮播' : '暂停轮播'}
        >
          {isPaused ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      </div>

      <Link
        href={`/posts/${currentPost.slug}`}
        className="group block w-full max-w-lg mx-auto"
        onMouseEnter={() => { if (intervalRef.current) clearInterval(intervalRef.current); }}
        onMouseLeave={() => { if (!isPaused) intervalRef.current = setInterval(() => triggerFlip(), 3500); }}
      >
        <div className="relative perspective-[800px]" style={{ height: '80px' }}>
          <div className="absolute inset-0 rounded-2xl glass-card overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${palette.from} ${palette.to} opacity-70`} />

            <div className="relative flex items-center h-full px-4 overflow-hidden">
              <div className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${palette.from} ${palette.to} flex items-center justify-center shadow-md mr-3`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              <div className="flex-1 min-w-0 relative overflow-hidden" style={{ height: '48px' }}>
                <div
                  className={`absolute inset-0 flex items-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isFlipping
                      ? direction === 'up' ? '-translate-y-full opacity-0 rotateX-90' : 'translate-y-full opacity-0 -rotateX-90'
                      : 'translate-y-0 opacity-100 rotateX-0'
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-200 leading-snug line-clamp-2">
                    {currentPost.title}
                  </span>
                </div>
                <div
                  className={`absolute inset-0 flex items-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isFlipping
                      ? 'translate-y-0 opacity-100 rotateX-0'
                      : direction === 'up' ? 'translate-y-full opacity-0 -rotateX-90' : '-translate-y-full opacity-0 rotateX-90'
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-200 leading-snug line-clamp-2">
                    {nextPost.title}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2 ml-3">
                {currentPost.tag && (
                  <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${palette.text} ${palette.border} bg-white/5`}>
                    {currentPost.tag}
                  </span>
                )}
                <svg className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerFlip(); }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0f0f23]/80 backdrop-blur-sm border border-indigo-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#1a1a3e] hover:shadow-sm z-10"
            title="下一篇"
          >
            <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-500 ${isFlipping ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </Link>

      <p className="text-[11px] text-gray-600 flex items-center gap-1">
        <span>点击卡片阅读</span>
        <span className="w-px h-3 bg-gray-700" />
        <span>自动轮播中</span>
      </p>
    </div>
  );
}
