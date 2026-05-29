'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface PostMeta {
  slug: string;
  title: string;
}

export default function SpinningTitle({ posts }: { posts: PostMeta[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rotateTitle = () => {
    if (posts.length === 0) return;
    setIsTransitioning(true);
    setIsAnimating(true);
    // 翻转动画中途切换标题
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
      setIsAnimating(false);
    }, 300);
    // 翻转动画结束
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  useEffect(() => {
    if (posts.length === 0) return;
    // 初始随机位置
    setCurrentIndex(Math.floor(Math.random() * posts.length));
    // 每 4 秒旋转一次
    intervalRef.current = setInterval(rotateTitle, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [posts.length]);

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];
  const nextPost = posts[(currentIndex + 1) % posts.length];

  return (
    <Link
      href={`/posts/${currentPost.slug}`}
      className="group inline-flex items-center gap-1.5 text-sm cursor-pointer"
      title={currentPost.title}
    >
      {/* 旋转指示器 */}
      <span className={`relative flex-shrink-0 w-3.5 h-3.5 ${isTransitioning ? 'opacity-70' : ''}`}>
        <svg
          className={`w-full h-full text-indigo-400 transition-transform duration-1000 ${isTransitioning ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </span>

      {/* 标题翻转区域 */}
      <span className="relative inline-flex overflow-hidden" style={{ height: '1.25rem' }}>
        {/* 当前标题 — 上翻离开 */}
        <span
          className={`whitespace-nowrap text-gray-500 font-medium transition-all duration-300 ${
            isAnimating
              ? '-translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        >
          {currentPost.title}
        </span>

        {/* 下一个标题 — 从下方翻入 */}
        <span
          className={`absolute inset-0 whitespace-nowrap text-gray-500 font-medium transition-all duration-300 ${
            isAnimating
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        >
          {nextPost.title}
        </span>
      </span>

      {/* 箭头指示 */}
      <svg
        className="w-3 h-3 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
