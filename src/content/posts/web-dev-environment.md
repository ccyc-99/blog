---
title: "从零搭建现代 Web 开发环境"
date: "2026-05-20"
excerpt: "介绍如何从零开始配置一个高效、现代化的 Web 开发环境，涵盖编辑器、终端、版本控制等工具链。"
tags:
  - "前端"
  - "工具"
  - "开发环境"
---

## 引言

一个高效舒适的开发环境是提升生产力的基石。本文将分享我个人的 Web 开发环境配置，希望能帮你搭建一套属于自己的高效工具链。

## 终端与 Shell

### Zsh + Oh My Zsh

macOS 默认使用 Zsh，我推荐安装 [Oh My Zsh](https://ohmyz.sh/) 来增强终端体验：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

推荐的插件：

- `zsh-autosuggestions` — 命令自动补全建议
- `zsh-syntax-highlighting` — 语法高亮
- `fzf` — 模糊搜索

### Starship 提示符

[Starship](https://starship.rs/) 是一个轻量、快速的 Shell 提示符工具，支持多种 Shell：

```bash
curl -sS https://starship.rs/install.sh | sh
```

## 代码编辑器

### VS Code 配置

我使用 VS Code 作为主力编辑器，以下是我的核心扩展：

| 扩展 | 用途 |
|------|------|
| ESLint | 代码检查 |
| Prettier | 代码格式化 |
| Tailwind CSS IntelliSense | Tailwind 智能提示 |
| GitHub Copilot | AI 辅助编码 |
| GitLens | Git 增强 |

### 推荐的 settings.json

```json
{
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', monospace",
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.minimap.enabled": false
}
```

## 版本控制

### Git 配置

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
```

### 推荐别名

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

## 包管理器

### pnpm — 快速、节省磁盘空间

```bash
npm install -g pnpm
```

pnpm 使用硬链接和符号链接来节省磁盘空间，安装速度也更快。

## 总结

一个良好的开发环境配置能让你：

1. **更专注** — 减少不必要的上下文切换
2. **更高效** — 自动化重复性任务
3. **更舒适** — 赏心悦目的工作环境

记住，工具是为我们服务的。不要陷入无止境的配置优化中，找到适合自己的设置后就专注于创造。
