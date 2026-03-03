# Lumina Workspace 🌌

> 一个拥有极致美学与现代全栈工程化的高级 Web 启动器 (A Premium Next.js Monorepo Starter).

Lumina Workspace 是一套基于 **pnpm workspace (Monorepo)** 架构打造的企业级全栈解决方案母版。它融合了目前最前沿的 Web 开发流派，专为构建具有**大留白、超大圆角、深软阴影**等极简科技风视觉呈现的现代 SaaS 平台、金融控制台或 AI 应用底座而设计。

---

## 🚀 核心架构与技术栈 (Core Architecture)

项目采用高度解耦的单体仓库 (Monorepo) 模式，实现了前后端应用、UI 资产、TypeScript 类型定义与配置的完美共享。

- **框架核心**: [Next.js (App Router)](https://nextjs.org/) - 强大的 React 全栈框架，兼顾极致的 SSR 性能与灵活的 API Routes。
- **包管理器**: [pnpm](https://pnpm.io/) - 利用 Workspace 原生支持极速的依赖提升与幽灵依赖隔离，彻底告别依赖地狱。
- **视觉美学 (UI/UX)**:
  - [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS，配置了整套奢华级别的圆角 (`rounded-[2rem]`) 与沉浸式环境软阴影 (`shadow-soft`)。
  - [Lucide Icons](https://lucide.dev/) - 清新、极简的现代 SVG 图标合集。
- **国际化 (i18n)**: [next-intl](https://next-intl-docs.vercel.app/) - 深度集成于 App Router 的全站多语言路由与 JSON 字典渲染能力。
- **构建协作**: [Turborepo](https://turbo.build/) _(规划中)_ - 用于管理复杂项目的增量构建与并发任务。

---

## 📂 推荐工作区结构 (Directory Structure)

本架构将应用逻辑与可复用资产彻底解耦：

```text
lumina-workspace/
├── apps/                 # 应用程序入口目录
│   ├── web/              # [核心应用] 客户端主站 (展示落地页、用户控制台)
│   └── admin/            # [待建/规划中] 内部管理系统 (B端运营后台)
├── packages/             # 共享的复用包资源
│   ├── ui/               # [待建] 共享的 Tailwind UI 组件库
│   ├── utils/            # [待建] 公共业务逻辑与工具函数
│   ├── config-tailwind/  # [待建] Tailwind 核心主题与样式注入谱系
│   └── config-typescript/# [待建] 全局统一的 TS 编译标准
├── package.json          # Root 配置与工作区依赖管理
└── pnpm-workspace.yaml   # 工作区定义描述文件
```

---

## 🛠️ 设计规范与 UI 哲学 (Design System)

Lumina 拒绝冗杂的传统中后台（如 AntDesign 默认态）风格，我们崇尚：

1.  **极度克制的配色**: 使用大面积的白 (`#FFFFFF`) 与浅灰 (`#FAFAFA`) 作为基调，仅在交互锚点使用具有科技感的蓝/青渐变色 (`#1E60F2`)。
2.  **夸张的平滑圆角**: 基础卡片采用 `32px` 或更大的连续圆角，打破常规界面的生硬拘束。
3.  **巨大的 Z 轴悬浮景深**: 放弃粗糙的阴影投影，使用多层次的扩散式半透明阴影 (`box-shadow`) 营造部件模块的堆叠漂浮感。
4.  **响应式至上 (Mobile First)**: 全组件内含自动降级策略，例如侧边栏在移动端自动转换为极致丝滑的毛玻璃 Drawer 抽屉菜单。

---

## 📖 快速上手 (Quick Start)

1.  **克隆与初始化依赖**
    建议全局安装 pnpm (`npm i -g pnpm`)。在根目录执行：

    ```bash
    pnpm install
    ```

2.  **启动开发环境**
    启动整个工作区的核心 Web 应用：

    ```bash
    pnpm run dev
    ```

3.  **构建与生产部署**
    ```bash
    pnpm run build
    ```

---

## 🌐 国际化与文案 (Localization)

所有的页面硬编码内容都在逐步向 JSON 字典持续剥离。语言文件统一挂载，您可以轻松地追加更多小语种，框架会自动处理子路由后缀并完成渲染分发。

---

_Lumina Workspace — Created for Next-Generation Interfaces._
