'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="w-[120px] h-6" />;

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekday = weekdays[time.getDay()];

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
      {/* Clock Icon */}
      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>

      {/* Time display */}
      <span className="text-sm font-mono font-semibold text-gray-700 tabular-nums tracking-wider">
        {hours}
        <span className="animate-pulse text-indigo-400 mx-px">:</span>
        {minutes}
        <span className="animate-pulse text-indigo-400 mx-px">:</span>
        {seconds}
      </span>

      {/* Divider */}
      <span className="w-px h-4 bg-gray-200" />

      {/* Date */}
      <span className="text-xs text-gray-400">
        周{weekday}
      </span>
    </div>
  );
}
