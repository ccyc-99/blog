---
title: "整洁代码的 7 个核心原则"
date: "2026-05-15"
excerpt: "好的代码像一篇优美的散文。本文分享我在多年编程实践中总结的 7 个保持代码整洁的核心原则。"
tags:
  - "编程"
  - "最佳实践"
  - "代码质量"
---

## 写在前面

> "任何一个傻瓜都能写出计算机能理解的代码。好的程序员写出人类能理解的代码。" — Martin Fowler

代码是写给人看的，只是顺便让机器执行。以下是我认为最重要的 7 条原则。

## 1. 命名即文档

好的命名胜过千行注释：

```typescript
// ❌ 糟糕的命名
const d = new Date();
const n = users.filter(u => u.s === 'active');
const fn = (x: number) => x * 1.2;

// ✅ 清晰的命名
const currentDate = new Date();
const activeUsers = users.filter(user => user.status === 'active');
const applyTax = (price: number) => price * 1.2;
```

**原则：** 变量名应回答"为什么存在"，函数名应回答"做什么"。

## 2. 函数只做一件事

```typescript
// ❌ 函数做了太多事
function processOrder(order: Order) {
  validateOrder(order);
  applyDiscount(order);
  calculateShipping(order);
  updateInventory(order);
  sendEmailConfirmation(order);
  saveToDatabase(order);
}

// ✅ 拆分为组合函数
function processOrder(order: Order) {
  validateAndPrepare(order);
  fulfillOrder(order);
  notifyCustomer(order);
}
```

## 3. 避免深层嵌套

使用 **提前返回 (Early Return)** 减少嵌套层级：

```typescript
// ❌ 深层嵌套
function getDiscountedPrice(user: User | null, product: Product) {
  if (user) {
    if (user.isPremium) {
      if (product.discount) {
        return product.price * 0.8;
      }
    }
  }
  return product.price;
}

// ✅ 提前返回
function getDiscountedPrice(user: User | null, product: Product) {
  if (!user || !user.isPremium || !product.discount) {
    return product.price;
  }
  return product.price * 0.8;
}
```

## 4. DRY — 不要重复自己

```typescript
// ❌ 重复的验证逻辑
function createUser(data: UserData) {
  if (!data.email.includes('@')) throw new Error('Invalid email');
  if (data.name.length < 2) throw new Error('Name too short');
  // ...
}

function updateUser(id: string, data: Partial<UserData>) {
  if (data.email && !data.email.includes('@')) throw new Error('Invalid email');
  if (data.name && data.name.length < 2) throw new Error('Name too short');
  // ...
}

// ✅ 提取共用逻辑
const validators = {
  email: (email: string) => email.includes('@'),
  name: (name: string) => name.length >= 2,
};
```

## 5. 显式优于隐式

```typescript
// ❌ 魔法数字
if (user.age > 18) { /* ... */ }
setTimeout(save, 300000);

// ✅ 有意义的常量
const LEGAL_ADULT_AGE = 18;
const AUTO_SAVE_INTERVAL_MS = 5 * 60 * 1000;

if (user.age > LEGAL_ADULT_AGE) { /* ... */ }
setTimeout(save, AUTO_SAVE_INTERVAL_MS);
```

## 6. 组合优于继承

```typescript
// ❌ 继承导致僵化的层级结构
class Bird {
  fly() { /* ... */ }
}
class Penguin extends Bird {
  fly() { throw new Error("Can't fly!"); } // 违反里氏替换原则
}

// ✅ 组合更灵活
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }

class Penguin implements Swimmable {
  swim() { /* ... */ }
}
```

## 7. 保持代码简单

> "简单是可靠的先决条件。" — Edsger Dijkstra

- 如果不需要，不要引入额外的抽象
- 优先使用标准库而非第三方依赖
- 删除死代码，不要注释掉留着

## 结语

写出整洁代码不是一蹴而就的，它需要持续的练习和反思。每当你觉得一段代码"以后再来整理"的时候，那个"以后"往往永远不会到来。

**现在就把它写好。**
