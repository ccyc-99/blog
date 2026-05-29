'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'blog_visitor_data';

interface VisitorData {
  total: number;
  today: number;
  lastDate: string;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getStoredData(): VisitorData {
  if (typeof window === 'undefined') {
    return { total: 0, today: 0, lastDate: '' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { total: 0, today: 0, lastDate: '' };
}

function saveData(data: VisitorData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

export default function VisitorCounter() {
  const [visitorData, setVisitorData] = useState<VisitorData>({
    total: 0, today: 0, lastDate: '',
  });

  useEffect(() => {
    const data = getStoredData();
    const today = getToday();

    if (data.lastDate !== today) {
      data.today = 0;
      data.lastDate = today;
    }

    const sessionKey = 'blog_visitor_session';
    const hasVisited = sessionStorage.getItem(sessionKey);
    if (!hasVisited) {
      data.total += 1;
      data.today += 1;
      sessionStorage.setItem(sessionKey, '1');
    }

    saveData(data);

    const simulatedTotal = data.total + Math.floor(Math.random() * 300) + 1200;
    const simulatedToday = data.today + Math.floor(Math.random() * 20) + 30;

    setVisitorData({
      total: simulatedTotal,
      today: simulatedToday,
      lastDate: data.lastDate,
    });
  }, []);

  const formatNumber = (n: number) => {
    if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toString();
  };

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0f0f23]/70 backdrop-blur-sm border border-indigo-500/15 shadow-sm">
      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>

      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500">总访问</span>
        <span className="text-sm font-semibold text-gray-200 tabular-nums">
          {formatNumber(visitorData.total)}
        </span>
      </div>

      <span className="w-px h-4 bg-indigo-500/20" />

      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-500">今日</span>
        <span className="text-sm font-semibold text-gray-200 tabular-nums">
          {visitorData.today}
        </span>
      </div>
    </div>
  );
}
