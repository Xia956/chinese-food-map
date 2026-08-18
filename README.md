# A Bite of China Food Map

A bilingual, map-first data product for exploring regional Chinese food, ingredients, and cultural context. The Chinese and English experiences share one structured dataset while using separate presentation layers.

- Chinese route: `/zh`
- English route: `/en`

## Project overview

This project explores how AI can support research, translation, and product development without treating generated output as ground truth. Documentary references, locations, and cultural claims retain source metadata and a visible verification status.

### Highlights

- Interactive province-level map with food search and filters.
- 232 structured food records in the latest committed data audit.
- Source attribution and confidence labels at record level.
- 174 verified records and 58 records explicitly marked for further review in the latest audit snapshot.
- Shared facts and media across separate Chinese and English presentation layers.
- Reproducible audits for missing fields, location review, and removal candidates.
- Responsive exploration experience for desktop and mobile.

## Data model and quality workflow

Food records are maintained in [`src/data/foods.ts`](src/data/foods.ts). Each record can include:

- Name, province, city, region, and coordinates
- Category, ingredients, and flavor profile
- Story and cultural context
- Image and source metadata
- Documentary season and episode references
- Verification status

Run `npm run audit:data` to regenerate the review files in [`data/`](data/). The workflow keeps uncertain information marked as pending verification instead of presenting it as fact. Official documentary and institutional sources are preferred; supplementary datasets are treated as leads until independently verified.

## Tech stack

- React, TypeScript, and Vite
- Apache ECharts with `china-map-geojson`
- Structured TypeScript data and a Node.js audit script
- Responsive CSS and route-based localization

## Run locally

Node.js and npm are required.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite and visit either `/en` or `/zh`.

## Commands

- `npm run dev` — start the development server.
- `npm run build` — type-check and build the production site.
- `npm run preview` — preview the production build locally.
- `npm run audit:data` — regenerate the data-quality audit files.

## Repository structure

- `src/` — React components, styles, types, localization, and food data.
- `public/food-images/` — local food images used by the site.
- `data/` — generated audits and manual review materials.
- `scripts/` — data maintenance scripts.

## Content maintenance

Before adding or editing a record, verify its location, documentary reference, cultural context, and sources. Information that cannot be confirmed must remain marked as pending verification.

This repository records source and license metadata for external facts and media. Verification status describes the project's review state, not ownership or permission to redistribute third-party material. Review each linked source and license before reusing the dataset or media.

The project currently uses no environment variables. If that changes, add an `.env.example` containing variable names and safe example values only.
