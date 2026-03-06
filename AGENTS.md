# Repository Guidelines

## Project Structure & Module Organization
本仓库使用 `pnpm workspace` 管理多个 Next.js 应用与共享包。`apps/web` 是对外站点，主要代码在 `apps/web/src/app/[locale]`、`apps/web/src/components` 与 `apps/web/messages`；`apps/admin` 是后台，路由按 `src/app/(auth)` 与 `src/app/(dashboard)` 分组；`apps/proposal` 用于提案/报价页面。共享逻辑集中在 `packages/core/src`，当前包含 Prisma 客户端与认证服务；`packages/ui`、`packages/utils`、`packages/config-*` 预留给通用组件和配置。数据库模型在 `prisma/schema.prisma`，初始化脚本在 `scripts/seed-admin.ts`。

## Build, Test, and Development Commands
- `pnpm install`：安装整个工作区依赖。
- `pnpm dev`：启动 `web` 应用；`pnpm dev:admin`：启动后台。
- `pnpm --filter proposal dev`：单独启动提案应用。
- `pnpm build` / `pnpm build:admin` / `pnpm --filter proposal build`：构建指定应用。
- `pnpm lint`：递归执行各包 ESLint；调试单个应用时用 `pnpm --filter web lint`。

## Coding Style & Naming Conventions
优先使用 TypeScript，并保持 `strict` 兼容。应用代码遵循现有 Next.js 风格：组件文件使用 `PascalCase.tsx`，工具与服务使用 `camelCase.ts`，路由目录使用 Next 约定命名。`apps/*/src` 内优先使用 `@/*` 路径别名。新增导出请汇总到 `packages/core/src/index.ts`。仓库未配置 Prettier，请以现有文件风格为准；在 `apps/web`、`apps/admin` 中保持双引号与分号，不要提交 `.next/` 或 `node_modules/` 生成物。

## Testing Guidelines
当前没有内置自动化测试脚本，`lint` 是最低门槛。提交前至少运行相关应用的 `pnpm --filter <app> lint`，并对变更应用执行一次 `pnpm --filter <app> build`。新增复杂业务逻辑或共享服务时，建议在同目录补充 `*.test.ts` 或 `*.spec.ts`。涉及 Prisma 变更时，同时检查 `prisma/schema.prisma`、本地 `DATABASE_URL` 配置，以及管理员初始化流程是否可用。

## Commit & Pull Request Guidelines
提交信息遵循现有 Conventional Commits 风格，例如 `feat: ...`、`feat(客服系统): ...`、`refactor: ...`。PR 需说明变更目的、影响的应用/包、是否涉及数据库或环境变量，并给出手动验证步骤。界面改动请附截图；若修改 `apps/web` 的对外页面或 `apps/admin` 仪表盘，建议同时标注受影响路由。

## Security & Configuration Tips
敏感配置仅放在本地环境文件中，至少包括 `DATABASE_URL` 与 `NEXT_PUBLIC_TAWK_WIDGET_URL`。不要在源码、截图或日志中泄露真实凭据；提交 Prisma 或认证相关修改时，优先说明回滚方式与兼容性影响。
