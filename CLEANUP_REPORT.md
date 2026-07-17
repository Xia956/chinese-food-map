# 项目清理报告

扫描日期：2026-07-16

## 扫描范围与结论

- 已扫描项目源码、样式、数据、脚本、公开图片、依赖锁文件、构建目录、日志/缓存、本地部署状态与常见敏感信息特征。
- 基线命令 `npm run build` 已通过。
- 入口与引用链完整：`src/main.tsx` → `src/App.tsx` → 3 个页面组件；`src/styles.css` 已由入口加载。
- 发现的 41 个 CSS 类名均能在 React 源码中找到使用位置，未发现可明确删除的组件、页面或 CSS。
- `src/data/foods.ts` 引用了 229 张本地图片，全部存在。
- `public/food-images/` 共 230 张 PNG（约 544 MiB）；未发现内容哈希完全相同的图片。
- 未发现旧版本、备份文件、日志文件或多个 package lock。
- 未发现 `.env` 文件、API key、token、密码、私钥或代码中的环境变量引用。

## 1. 可以安全删除

以下均为可重新生成或无业务内容的本机文件：

- `node_modules/`：依赖安装目录，约 204 MiB，可由 `npm install` 恢复。
- `dist/`：Vite 构建产物，扫描前约 693 MiB，可由 `npm run build` 恢复。
- 根目录、`public/`、`dist/client/` 中的 `.DS_Store`：macOS Finder 元数据。
- 空目录 `build/`、`worker/`：没有文件，也没有源码引用。

说明：最终验证时 `npm install` 会重新生成 `node_modules/`，`npm run build` 会重新生成 `dist/`；两者继续由 Git 忽略。

## 2. 应该保留

- `src/`：当前应用源码、组件、样式与结构化美食数据，均在使用。
- `public/food-images/` 中 229 张被 `src/data/foods.ts` 引用的图片。
- `data/` 与 `scripts/generate-food-audit.mjs`：可人工审阅的审计数据、表格与生成脚本。
- `package.json` 与唯一的 `package-lock.json`：项目配置和可复现依赖版本。
- `index.html`、`tsconfig.json`、`vite.config.ts`：构建入口与配置。
- `vercel.json`、`.vercelignore`：部署配置。
- `AGENTS.md`、`PRD.md`：项目规范与产品文档。
- `.gitignore`：已存在，后续补充环境文件、日志、缓存及其他构建目录规则。

## 3. 不确定，需要确认

- `public/food-images/fujian-xiapu-seaweed.png`：当前没有被 `src/data/foods.ts` 引用。它可能是待录入条目的人工图片，按照“保护人工整理数据”的原则不自动删除。
- `.vercel/`：Vercel CLI 生成的本地项目关联状态，包含项目/组织标识但未发现密钥。它已被 Git 忽略；删除会解除本地关联，因此本轮不自动删除。
- `data/food-removal-candidates.json` 与 `data/food-removal-candidates.xlsx`：名称表明它们是候选清单，但属于人工审计成果，不能仅凭文件名判断为废弃。

## 项目文件完整性

- `.gitignore`：已存在；需要补充 `.env*`（保留 `.env.example`）、日志、缓存、`build/`、`.next/` 等规则。
- `README.md`：缺少，建议补充项目说明和开发命令。
- `.env.example`：缺少；当前代码没有读取任何环境变量，因此暂时不需要创建空模板。将来引入环境变量时应同步创建。
- package lock：仅有 `package-lock.json`，没有 Yarn、pnpm 或 Bun 锁文件冲突。

## 敏感信息检查

- 常见 API key、token、密码、私钥特征扫描无命中。
- 未发现 `.env` 或 `.env.*` 文件。
- `.vercel/project.json` 是本地部署关联元数据，已由 `.gitignore` 排除，不会进入 Git 初始提交。

## 构建观察

- TypeScript 检查与 Vite 构建成功。
- Vite 提示主 JavaScript 包约 2.88 MB（gzip 约 813 KB），超过默认 500 kB 提示阈值。地图与 ECharts 是主要可能来源；建议另立性能优化任务处理，不在本轮清理中改动运行逻辑。
