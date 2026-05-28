---
title: "TypeScript 高级类型模式实战"
date: "2026-05-18"
excerpt: "深入探讨 TypeScript 中的高级类型模式，包括条件类型、模板字面量类型、映射类型等实际应用场景。"
tags:
  - "TypeScript"
  - "前端"
  - "编程"
---

## 前言

TypeScript 的类型系统图灵完备，这意味着我们可以用类型来表达极其复杂的逻辑。本文将分享几个在实际项目中非常有用的高级类型模式。

## 条件类型

条件类型是 TypeScript 类型系统的核心构建块之一：

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>;      // false
```

### 实际应用：提取 Promise 返回值

```typescript
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type Result = Awaited<Promise<Promise<string>>>; // string
```

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型非常强大：

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">; // "onClick"
type ChangeEvent = EventName<"change">; // "onChange"
```

### 实战：类型安全的事件系统

```typescript
type EventMap = {
  click: { x: number; y: number };
  change: { value: string };
  focus: void;
};

type EventHandlerMap = {
  [K in keyof EventMap as `on${Capitalize<K & string>}`]: 
    EventMap[K] extends void 
      ? () => void 
      : (payload: EventMap[K]) => void;
};

// { onClick: (payload: {x: number; y: number}) => void; ... }
```

## 映射类型与 Key Remapping

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }
```

## 递归类型

处理嵌套数据结构时非常有用：

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};
```

## 总结

掌握这些高级类型模式可以让你的 TypeScript 代码更加类型安全和表达力更强：

- **条件类型** 实现类型级别的条件逻辑
- **模板字面量类型** 操作字符串类型
- **映射类型** 批量转换对象类型
- **递归类型** 处理嵌套结构

关键在于：**不要为了炫技而使用复杂类型，而是为了解决实际问题**。
