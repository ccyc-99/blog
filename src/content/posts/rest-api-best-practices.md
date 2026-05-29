---
title: "REST API 设计最佳实践"
date: "2026-05-29"
excerpt: "从 URL 设计到错误处理，从版本控制到分页策略，全面梳理 RESTful API 设计规范和常见陷阱。"
tags:
  - "API"
  - "后端"
  - "最佳实践"
---

## 前言

一个好的 API 设计能让前后端协作事半功倍，而糟糕的 API 设计则会成为团队的噩梦。本文总结 RESTful API 设计中的核心原则和实战经验。

## URL 设计

### 使用名词而非动词

```
❌ POST   /createUser
❌ GET    /getUserById?id=123
❌ POST   /updateUserStatus

✅ POST   /users
✅ GET    /users/123
✅ PATCH  /users/123/status
```

**原则：** URL 表示资源，HTTP 方法表示操作。

### 资源层级关系

```text
/users                          # 用户集合
/users/123                      # 特定用户
/users/123/orders               # 用户的订单
/users/123/orders/456           # 用户的特定订单
/users/123/orders/456/items     # 订单中的商品
```

**注意：** 嵌套不宜超过 3 层，过深时考虑独立端点。

### 使用复数形式

```
✅ /users
✅ /users/123
✅ /articles
✅ /products

❌ /user
❌ /getUser
```

## HTTP 方法语义

| 方法 | 操作 | 幂等 | 安全 |
|------|------|------|------|
| `GET` | 获取资源 | ✅ | ✅ |
| `POST` | 创建资源 | ❌ | ❌ |
| `PUT` | 完整替换 | ✅ | ❌ |
| `PATCH` | 部分更新 | ❌ | ❌ |
| `DELETE` | 删除资源 | ✅ | ❌ |

### 实战示例

```bash
# 获取文章列表（支持筛选和分页）
GET /articles?status=published&page=1&limit=20

# 获取单篇文章
GET /articles/123

# 创建文章
POST /articles
Content-Type: application/json
{ "title": "...", "content": "..." }

# 更新文章部分字段
PATCH /articles/123
Content-Type: application/json
{ "title": "新标题" }

# 删除文章
DELETE /articles/123
```

## 状态码使用

### 常用状态码速查

```text
2xx 成功
  200 OK              — 请求成功
  201 Created          — 资源创建成功
  204 No Content       — 成功但无返回内容

3xx 重定向
  301 Moved Permanently
  304 Not Modified

4xx 客户端错误
  400 Bad Request      — 请求格式错误
  401 Unauthorized     — 未认证
  403 Forbidden        — 无权限
  404 Not Found        — 资源不存在
  409 Conflict         — 资源冲突
  422 Unprocessable    — 参数校验失败
  429 Too Many Requests — 请求过多

5xx 服务端错误
  500 Internal Error   — 服务器内部错误
  503 Service Unavailable — 服务暂不可用
```

## 统一响应格式

```json
{
  "success": true,
  "data": {
    "id": 123,
    "title": "REST API 设计",
    "author": {
      "id": 456,
      "name": "思维漫游者"
    }
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数校验失败",
    "details": [
      { "field": "email", "message": "邮箱格式不正确" },
      { "field": "age", "message": "年龄必须在 1-150 之间" }
    ]
  }
}
```

**关键：** 错误信息要对开发者友好，明确告知哪里出了问题。

## 版本控制

三种常见策略：

```text
# 方式1：URL 版本（推荐）
/api/v1/users
/api/v2/users

# 方式2：请求头版本
Accept: application/vnd.api.v2+json

# 方式3：查询参数版本
/api/users?version=2
```

**推荐 URL 版本控制** — 最直观，方便调试和文档生成。

## 分页设计

```json
// 请求
GET /articles?page=2&limit=20&sort=-created_at

// 响应
{
  "data": [ /* 20 条数据 */ ],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}
```

### 游标分页（适合大数据量）

```json
// 请求
GET /articles?cursor=eyJpZCI6MTIzfQ&limit=20

// 响应
{
  "data": [ /* ... */ ],
  "pagination": {
    "nextCursor": "eyJpZCI6MTAzfQ",
    "hasMore": true
  }
}
```

游标分页避免了 offset 分页在大数据量下的性能问题。

## 安全与性能

### 速率限制

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 75
X-RateLimit-Reset: 1680000000
```

### 字段过滤

```
GET /users/123?fields=id,name,avatar
```

只返回需要的字段，减少传输数据量。

### 安全头

```http
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

## 总结

设计一个好的 API 需要关注：

- **URL 命名** — 名词复数，层级清晰
- **HTTP 方法** — 正确使用语义
- **状态码** — 准确传达结果
- **统一格式** — 降低前端解析成本
- **错误信息** — 对开发者友好
- **分页与版本** — 为扩展做好准备

> 好的 API 设计是对未来自己的善待。
