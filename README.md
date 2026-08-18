# 中国美食地图 / A Bite of China Food Map

一个以地图为核心的中英双语美食探索网页，帮助用户按省份、城市和地域浏览食物条目及其文化背景。项目采用结构化数据维护内容，并对与《舌尖上的中国》相关的信息保留来源与核实状态。

- 中文入口：`/zh`
- English: `/en`

两个语言入口共用地图、图片和核实后的事实数据；英文版使用独立的英文显示层和带英文字幕或英文音轨的 YouTube 分集链接。

## English overview

**A Bite of China Food Map** is a bilingual, map-first data product for exploring regional Chinese food, ingredients, and cultural context. It uses one shared structured dataset with separate Chinese and English presentation layers.

The project explores how AI can support research, translation, and product development without treating generated output as ground truth. Documentary references, locations, and cultural claims retain source metadata and a visible verification status.

### Highlights

- Interactive province-level map with food search and filters.
- 232 structured food records in the latest committed data audit.
- Source attribution and confidence labels at record level.
- 174 verified records and 58 records explicitly marked for further review in the latest audit snapshot.
- Chinese and English routes backed by the same facts and media.
- Reproducible audit outputs for missing fields, location review, and removal candidates.
- Responsive interface built for desktop and mobile exploration.

### Data model and quality workflow

Food records are maintained in [`src/data/foods.ts`](src/data/foods.ts) and include location, coordinates, category, ingredients, flavor profile, story, cultural context, media sources, documentary season/episode references, and confidence status.

Run `npm run audit:data` to regenerate the review files in [`data/`](data/). The workflow keeps uncertain information visible as pending verification instead of silently presenting it as fact. Official documentary and institutional sources are preferred; supplementary datasets are treated as leads until independently verified.

### Tech stack

- React, TypeScript, and Vite
- Apache ECharts with `china-map-geojson`
- Structured TypeScript data and a Node.js audit script
- Responsive CSS with bilingual routing at `/zh` and `/en`

### Run locally

```bash
npm install
npm run dev
```

Useful commands:

- `npm run build` — type-check and build the production site.
- `npm run audit:data` — regenerate data-quality audit files.
- `npm run preview` — preview the production build locally.

### Data and media note

This repository records source and license metadata for external facts and media. Verification status describes the project's review state, not ownership or permission to redistribute third-party material. Review each linked source and license before reusing the dataset or media.

## 本地开发

需要 Node.js 与 npm。

```bash
npm install
npm run dev
```

开发服务器启动后，按终端显示的本地地址访问。

## 可用命令

- `npm run dev`：启动 Vite 开发服务器。
- `npm run build`：运行 TypeScript 检查并生成生产构建。
- `npm run preview`：本地预览生产构建。
- `npm run audit:data`：重新生成美食数据审计文件。

## 项目结构

- `src/`：React 组件、样式、类型与美食数据。
- `public/food-images/`：网页使用的本地食物图片。
- `data/`：数据审计结果与人工复核材料。
- `scripts/`：数据维护脚本。
- `CLEANUP_REPORT.md`：项目文件、敏感信息与清理候选扫描报告。

## 内容维护

美食条目主要维护在 `src/data/foods.ts`。新增或修改内容时，请确保地点、节目季集、文化背景与来源可以核实；无法确认的信息应明确标记为待核实，不能写成已确认事实。

当前项目不使用环境变量，因此没有 `.env.example`。如果后续引入环境变量，请同步添加仅包含变量名和安全示例值的 `.env.example`。
