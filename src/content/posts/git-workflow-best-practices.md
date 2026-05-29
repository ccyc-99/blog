---
title: "Git 工作流最佳实践：从 Solo 到团队协作"
date: "2026-05-26"
excerpt: "整理 Git 从个人开发到团队协作的完整工作流程，包括分支策略、Commit 规范和 Code Review 指南。"
tags:
  - "Git"
  - "工具"
  - "最佳实践"
---

## 前言

Git 是每个开发者的必备技能，但"会用"和"用好"之间有很大差距。本文分享从个人项目到团队协作的 Git 最佳实践。

## 个人开发工作流

### 小而频繁的提交

```bash
# ❌ 一次提交包含所有改动
git commit -m "完成了用户模块、商品模块、订单模块"

# ✅ 每个逻辑单元单独提交
git commit -m "feat: 添加用户注册功能"
git commit -m "feat: 添加用户登录功能"
git commit -m "test: 添加用户模块单元测试"
```

**原则：** 一个 commit 做一件事，方便以后查找和回滚。

### 有意义的 Commit Message

采用 **Conventional Commits** 规范：

```
<type>(<scope>): <subject>

<body>
```

常用 type：

| Type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 Bug |
| `refactor` | 重构代码 |
| `docs` | 文档更新 |
| `style` | 代码格式 |
| `test` | 测试相关 |
| `chore` | 构建/工具变动 |

示例：

```
feat(auth): 添加 JWT token 刷新机制

- 在 token 过期前 5 分钟自动刷新
- 添加 refresh token 轮换策略
- 增加 token 黑名单机制

Closes #42
```

## 团队协作工作流

### Git Flow

适合有明确发布周期的项目：

```
main     ──●──────────●──────────●── 生产环境
            \        / \        /
develop ────●──●──●───●──●──●── 开发分支
              \    /   \    /
feature/A  ───●──●     ●──●── 功能分支
```

### GitHub Flow（推荐）

更简洁，适合持续部署的项目：

```
main ──●──●──●──●──●──●── 始终可部署

feature/xxx ──●──●── 功能分支，合并后删除
```

**流程：**
1. 从 `main` 创建功能分支
2. 在分支上开发和提交
3. 提交 Pull Request
4. Code Review 后合并到 `main`
5. 自动部署

### 分支命名规范

```bash
feature/user-auth      # 新功能
fix/login-error        # Bug 修复
refactor/api-layer     # 重构
docs/api-docs          # 文档
```

## 常用 Git 操作

### 合并 vs Rebase

```bash
# Merge：保留完整历史，产生合并提交
git merge feature/login

# Rebase：线性历史，更整洁
git rebase main
```

**建议：** 公共分支用 merge，个人分支用 rebase。

### 交互式 Rebase 整理提交

```bash
# 整理最近 3 个提交
git rebase -i HEAD~3

# 选项：
# pick   — 保留
# squash — 合并到上一个提交
# reword — 修改提交信息
# drop   — 删除提交
```

### 暂存工作现场

```bash
git stash                    # 暂存
git stash list               # 查看列表
git stash pop                # 恢复最近的暂存
git stash push -m "WIP: 重构用户模块"  # 带描述暂存
```

### 撤销操作

```bash
git reset --soft HEAD~1     # 撤销提交，保留改动
git reset --hard HEAD~1     # 撤销提交，丢弃改动
git revert HEAD             # 创建反向提交（安全）
git checkout -- file.ts     # 丢弃文件改动
```

## Code Review 指南

### 提交 PR 前自查

- [ ] 代码通过所有测试
- [ ] 没有遗留的调试代码
- [ ] 变量和函数命名清晰
- [ ] 复杂逻辑有注释
- [ ] PR 描述清楚改了什么、为什么改

### Review 关注点

| 关注点 | 说明 |
|--------|------|
| 逻辑正确性 | 边界情况处理了吗？ |
| 可读性 | 6 个月后还能看懂吗？ |
| 性能 | 有没有明显的性能问题？ |
| 安全 | 输入验证了吗？有注入风险吗？ |
| 测试 | 关键路径有测试覆盖吗？ |

## 总结

好的 Git 实践能极大提升开发效率和代码质量：

- **小步提交**，让每次改动都可追溯
- **规范命名**，让提交信息有用
- **分支策略**，让协作有序
- **Code Review**，让质量有保障

> Git 不仅是版本控制工具，更是团队协作的基石。
