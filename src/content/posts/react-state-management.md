---
title: "React 状态管理方案选型指南"
date: "2026-05-22"
excerpt: "面对 useState、useReducer、Context、Zustand、Redux 等众多状态管理方案，该如何选择？本文帮你理清思路。"
tags:
  - "React"
  - "前端"
  - "状态管理"
---

## 前言

React 生态中的状态管理方案层出不穷，从最基础的 `useState` 到企业级的 Redux Toolkit，每个方案都有其适用的场景。选错方案轻则代码臃肿，重则维护噩梦。

本文将从实际场景出发，帮你建立清晰的选择框架。

## 状态分类

在选方案之前，先理解状态的四种类型：

| 类型 | 示例 | 生命周期 |
|------|------|----------|
| **局部 UI 状态** | 表单输入、开关状态 | 组件内 |
| **跨组件状态** | 主题、语言偏好 | 多组件共享 |
| **服务端状态** | API 返回的数据 | 与服务器同步 |
| **全局应用状态** | 用户登录信息、购物车 | 整个应用 |

## 方案对比

### useState — 组件内状态

```tsx
// 最简单的局部状态
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**适用场景：** 表单输入、toggle、计数器等独立组件的简单状态。

### useReducer — 复杂局部逻辑

```tsx
type Action = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'TOGGLE_TODO':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    default:
      return state;
  }
}
```

**适用场景：** 状态逻辑复杂、多个子值互相关联、下一个状态依赖上一个状态。

### Context — 跨组件共享

```tsx
const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Child />
    </ThemeContext.Provider>
  );
}
```

**注意：** Context 不适合高频更新的状态，任何值变化都会触发所有消费者重新渲染。

### Zustand — 轻量全局状态

```tsx
import { create } from 'zustand';

interface BearStore {
  bears: number;
  increase: () => void;
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

// 在组件中使用
function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} bears</h1>;
}
```

**优点：** API 极简、无需 Provider、支持选择器避免不必要渲染。

### TanStack Query — 服务端状态

```tsx
import { useQuery } from '@tanstack/react-query';

function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5分钟内不重新请求
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>出错了</div>;
  return <ul>{data.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>;
}
```

**核心价值：** 自动缓存、后台更新、乐观更新、分页/无限滚动开箱即用。

## 决策流程图

```
状态是否需要跨多个组件共享？
├── 否 → useState / useReducer
└── 是 → 是否来自服务端 API？
    ├── 是 → TanStack Query / SWR
    └── 否 → 更新频率高吗？
        ├── 是 → Zustand / Jotai
        └── 否 → Context + useState
```

## 总结

没有银弹，只有最合适的方案：

- **简单局部状态** → `useState`
- **复杂局部逻辑** → `useReducer`
- **低频全局状态** → `Context`
- **高频全局状态** → `Zustand`
- **服务端数据** → `TanStack Query`

核心原则：**保持状态尽可能局部化，只在必要时提升。**
