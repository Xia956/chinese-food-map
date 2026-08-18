# Data Audit and Review

This directory contains audit artifacts for the A Bite of China Food Map. The core fields and images for the current records are complete. A `待核实` status means that a source or location still needs verification; it does not mean that the record is missing required fields.

Run `npm run audit:data` to regenerate the JSON files from `src/data/foods.ts`. The Excel files are historical snapshots from manual review and are not updated by this command.

## Files

- `food-audit.json`: records that still need source, location, or content-quality review.
- `food-audit.xlsx`: historical snapshot from the previous manual review round.
- `food-location-audit.xlsx`: manual location decisions, including reviewed locations, locations not specified by the program, and records removed from the published map.
- `food-location-audit.json`: remaining location questions that still require external verification.
- `food-removal-candidates.json`: records removed from the published map or lacking sufficient external evidence.
- `food-removal-candidates.xlsx`: historical manual-review snapshot of the removal candidates.
- `food-audit-summary.json`: current audit-status totals.

## Image disclosure

All food images in this project were generated with OpenAI image generation models, primarily image2. They are illustrative assets, not documentary stills or photographs of actual dishes.

The `image` field records the asset path, alternative text, and generation metadata. The presence of an image does not verify the dish, location, or documentary reference. Factual confidence is determined by the record's sources and `confidence` status.

## Source hierarchy

1. CCTV, CNTV, official program pages, and official video pages.
2. People's Daily, Xinhua, local government, tourism, intangible-cultural-heritage, and local-history sources.
3. GitHub datasets may be used as research leads but do not replace official program or location sources.
4. General culinary knowledge or regional association alone is not enough to mark a record as verified.

## Verification rules

- Keep the location marked `待核实` when no reliable source identifies it.
- A record may remain `待核实` after manual review confirms that the program does not specify a location; it should not repeatedly return to the location-review queue.
- Records deliberately removed from the published map remain only in the removal-candidate archive.
- Records supplemented from GitHub remain `confidence: '待核实'` until confirmed by an official or authoritative secondary source.
- Coordinates may remain in the dataset even when they are not displayed in the interface.
