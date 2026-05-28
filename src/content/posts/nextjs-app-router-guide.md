---
title: "Next.js App Router 完全指南"
date: "2026-05-10"
excerpt: "全面了解 Next.js App Router 的核心概念和最佳实践，包括路由、数据获取、服务端组件等关键特性。"
tags:
  - "Next.js"
  - "React"
  - "前端"
---

## App Router 是什么

Next.js 13 引入了全新的 **App Router**，基于 React Server Components 构建，是 Next.js 推荐的构建应用的方式。

## 核心概念

### 文件系统路由

App Router 使用基于文件夹的路由系统：

```
src/app/
├── layout.tsx        # 根布局（必须）
├── page.tsx          # 首页 /
├── about/
│   └── page.tsx      # /about
├── blog/
│   ├── page.tsx      # /blog
│   └── [slug]/
│       └── page.tsx  # /blog/:slug
```

### 特殊文件

| 文件 | 作用 |
|------|------|
| `page.tsx` | 页面组件 |
| `layout.tsx` | 布局组件（可嵌套） |
| `loading.tsx` | 加载状态 UI |
| `error.tsx` | 错误边界 |
| `not-found.tsx` | 404 页面 |
| `route.ts` | API 路由 |

## Server Components vs Client Components

```typescript
// Server Component（默认）
// ✅ 可以直接访问数据库、文件系统
// ✅ 减少客户端 JS 体积
export default async function BlogList() {
  const posts = await db.post.findMany();
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

```typescript
'use client';
// Client Component
// ✅ 可以使用 hooks、事件处理、浏览器 API
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

## 数据获取

### 在 Server Component 中直接获取

```typescript
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR: 每小时重新验证
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return <div>{/* render posts */}</div>;
}
```

## 总结

App Router 带来了更强大的功能和更好的开发体验：

- **Server Components** 默认，减少客户端代码
- **嵌套布局** 实现高效的页面组合
- **流式渲染** 提升首屏加载速度
- **更灵活的路由** 支持并行路由和拦截路由

迁移到 App Router 是值得的，但要循序渐进，可以从新页面开始。
