---
title: "CSS 现代布局完全指南：Flexbox 与 Grid"
date: "2026-05-24"
excerpt: "掌握 Flexbox 和 CSS Grid 的核心用法，告别浮动布局时代。附大量实战案例和对比分析。"
tags:
  - "CSS"
  - "前端"
  - "布局"
---

## 引言

几年前，我们还在用 `float` 和 `clearfix` 来布局页面。如今，**Flexbox** 和 **CSS Grid** 已经成为现代 Web 布局的标准工具。

理解何时用 Flexbox、何时用 Grid，是每个前端开发者的必修课。

## Flexbox：一维布局之王

Flexbox 擅长处理**一个方向**（行或列）上的元素排列。

### 核心属性速查

```css
/* 容器属性 */
.container {
  display: flex;
  flex-direction: row | column;
  justify-content: center;     /* 主轴对齐 */
  align-items: center;         /* 交叉轴对齐 */
  gap: 16px;                   /* 间距 */
  flex-wrap: wrap;             /* 换行 */
}

/* 项目属性 */
.item {
  flex: 1;                     /* 弹性伸缩 */
  align-self: flex-end;        /* 单独对齐 */
}
```

### 经典场景：导航栏

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
}

.nav-links {
  display: flex;
  gap: 24px;
}
```

只需几行 CSS，一个响应式导航栏就完成了。

### 经典场景：居中

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Flexbox 让居中变得前所未有的简单。

## CSS Grid：二维布局利器

Grid 擅长同时控制**行和列**的布局。

### 核心属性速查

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 三列等宽 */
  grid-template-rows: auto 1fr auto;      /* 三行：头-内容-尾 */
  gap: 24px;
}
```

### 经典场景：卡片网格

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
```

`auto-fill` + `minmax()` 的组合可以自动计算列数，无需媒体查询！

### 经典场景：圣杯布局

```css
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }
```

`grid-template-areas` 让布局结构一目了然。

## Flexbox vs Grid：何时用哪个？

| 场景 | 推荐方案 | 原因 |
|------|----------|------|
| 导航栏 | Flexbox | 一维排列，简单直观 |
| 卡片列表 | Grid | 二维控制，自动响应列数 |
| 表单行 | Flexbox | 单行内元素对齐 |
| 整体页面布局 | Grid | 同时控制行列 |
| 水平居中 | Flexbox | 最简洁的方案 |
| 画廊/相册 | Grid | 精确的行列控制 |

## 实战技巧

### 1. 使用 `gap` 代替 `margin`

```css
/* ❌ 旧方式 */
.item { margin-right: 16px; }
.item:last-child { margin-right: 0; }

/* ✅ 新方式 */
.container { gap: 16px; }
```

### 2. 使用 `place-items` 一步居中

```css
.center-grid {
  display: grid;
  place-items: center;  /* = justify-items + align-items */
}
```

### 3. 子元素撑满父容器

```css
.full-height {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
```

## 总结

- **Flexbox** 是一维的，适合组件级别的排列
- **Grid** 是二维的，适合页面级别的布局
- 两者可以**嵌套使用**——Grid 里用 Flexbox 排列子元素
- 告别 `float`，拥抱现代布局

> 掌握 Flexbox 和 Grid，你就拥有了构建任何布局的能力。
