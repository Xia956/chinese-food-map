import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const FOODS_FILE = path.join(ROOT, 'src/data/foods.ts');
const OUT_DIR = path.join(ROOT, 'data');

const readFoods = async () => {
  const source = fs.readFileSync(FOODS_FILE, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`;
  const mod = await import(moduleUrl);
  return {
    foods: mod.foods,
    removalCandidateFoods: mod.removalCandidateFoods ?? [],
  };
};

const sourceTierFor = (food) => {
  const urls = food.sources.map((source) => source.url);
  if (urls.some((url) => url.startsWith('manual-review://food-location-audit/'))) return '人工审核';
  if (urls.some((url) => /cctv\.com|cntv\.cn/.test(url))) return '官方节目页';
  if (urls.some((url) => url.includes('github.com/zhuyuxiao/Chinese-cuisine'))) return 'GitHub辅助';
  if (urls.some((url) => url.includes('wikipedia.org'))) return '分集表';
  return '待扩展';
};

const missingFieldsFor = (food) => {
  const missing = [];
  const locationReviewed = food.sources.some((source) => source.url.startsWith('manual-review://food-location-audit/'));
  if (!locationReviewed && food.province === '待核实') missing.push('province');
  if (!locationReviewed && food.city === '待核实') missing.push('city');
  if (!locationReviewed && food.region === '待核实') missing.push('region');
  if (!food.ingredients.length || food.ingredients.some((ingredient) => ['待补充', '待核实'].includes(ingredient))) {
    missing.push('ingredients');
  }
  if (food.flavorProfile.includes('待继续')) missing.push('flavorProfile');
  if (food.story.includes('后续可继续补入人物与制作过程')) missing.push('story');
  if (food.culturalContext.includes('仍待人工校订') || food.culturalContext.includes('未稳定给出明确拍摄地点')) missing.push('culturalContext');
  if (!food.image) missing.push('image');
  if (food.confidence !== '已核实') missing.push('confidence');
  return missing;
};

const priorityFor = (food, missingFields) => {
  if (missingFields.includes('province')) return 'P0-先补省份';
  if (missingFields.includes('city')) return 'P1-补城市';
  if (missingFields.some((field) => ['ingredients', 'flavorProfile', 'story', 'culturalContext'].includes(field))) return 'P2-补内容';
  if (missingFields.includes('image')) return 'P3-补素材';
  return 'P4-复核';
};

const actionFor = (food, missingFields, sourceTier) => {
  if (missingFields.includes('province')) return '先查央视网片段页和官方视频标题；找不到时再查权威媒体或地方文旅/非遗页面。';
  if (missingFields.includes('city')) return '优先确认节目拍摄地或菜名标题中的城市；不能确认时保留省份，城市继续待核实。';
  if (sourceTier === 'GitHub辅助') return '用央视网、人民网、新华网或地方政府/文旅页面复核后，才能从待核实改为已核实。';
  if (missingFields.includes('ingredients')) return '补主要食材时只写稳定事实，避免从菜名过度推断。';
  if (missingFields.includes('story') || missingFields.includes('culturalContext')) return '补原创概述，不复制节目解说词或网页长文。';
  if (missingFields.includes('image')) return '优先使用项目生成图、开放授权图或用户授权素材。';
  return '人工抽样复核来源和页面展示。';
};

const queryFor = (food, kind) => {
  const episode = [food.season, food.episode].filter(Boolean).join(' ');
  if (kind === 'official') return `site:tv.cctv.com 舌尖上的中国 ${episode} ${food.name}`;
  if (kind === 'media') return `舌尖上的中国 ${food.name} ${food.province === '待核实' ? '' : food.province} 地点`;
  if (kind === 'local') return `${food.name} ${food.province === '待核实' ? '' : food.province} 文旅 非遗 地方志`;
  return `site:github.com ${food.name} 中国菜 数据`;
};

const summarize = (foods, auditRows, locationRows) => {
  const officialRows = foods.filter((food) => sourceTierFor(food) === '官方节目页');
  const githubRows = foods.filter((food) => sourceTierFor(food) === 'GitHub辅助');
  const byPriority = auditRows.reduce((acc, row) => {
    acc[row.priority] = (acc[row.priority] ?? 0) + 1;
    return acc;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    total: foods.length,
    auditRows: auditRows.length,
    locationAuditRows: locationRows.length,
    missingProvince: auditRows.filter((row) => row.missingFields.includes('province')).length,
    missingCity: auditRows.filter((row) => row.missingFields.includes('city')).length,
    missingIngredients: foods.filter((food) => food.ingredients.includes('待补充')).length,
    missingImage: foods.filter((food) => !food.image).length,
    officialSourceRows: officialRows.length,
    githubSupplementRows: githubRows.length,
    verifiedRows: foods.filter((food) => food.confidence === '已核实').length,
    pendingRows: foods.filter((food) => food.confidence !== '已核实').length,
    byPriority,
  };
};

const { foods, removalCandidateFoods } = await readFoods();
const auditRows = foods
  .map((food) => {
    const missingFields = missingFieldsFor(food);
    const sourceTier = sourceTierFor(food);
    return {
      id: food.id,
      name: food.name,
      season: food.season ?? '',
      episode: food.episode ?? '',
      province: food.province,
      city: food.city,
      region: food.region,
      category: food.category,
      confidence: food.confidence,
      sourceTier,
      missingFields,
      priority: priorityFor(food, missingFields),
      recommendedAction: actionFor(food, missingFields, sourceTier),
      officialSearch: queryFor(food, 'official'),
      mediaSearch: queryFor(food, 'media'),
      localSearch: queryFor(food, 'local'),
      githubSearch: queryFor(food, 'github'),
      sourceUrls: food.sources.map((source) => source.url),
    };
  })
  .filter((row) => row.missingFields.length > 0)
  .sort((a, b) => {
    const priority = a.priority.localeCompare(b.priority, 'zh-Hans-CN');
    if (priority) return priority;
    const season = a.season.localeCompare(b.season, 'zh-Hans-CN');
    if (season) return season;
    return a.episode.localeCompare(b.episode, 'zh-Hans-CN') || a.name.localeCompare(b.name, 'zh-Hans-CN');
  });

const locationRows = auditRows.filter((row) => row.missingFields.some((field) => ['province', 'city', 'region'].includes(field)));
const summary = summarize(foods, auditRows, locationRows);
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'food-audit.json'), `${JSON.stringify(auditRows, null, 2)}\n`);
fs.writeFileSync(path.join(OUT_DIR, 'food-location-audit.json'), `${JSON.stringify(locationRows, null, 2)}\n`);
fs.writeFileSync(path.join(OUT_DIR, 'food-audit-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync(path.join(OUT_DIR, 'food-removal-candidates.json'), `${JSON.stringify(removalCandidateFoods, null, 2)}\n`);

console.log(`Generated ${auditRows.length} audit rows in data/food-audit.json`);
console.log(`Generated ${locationRows.length} location audit rows in data/food-location-audit.json`);
console.log(`Generated ${removalCandidateFoods.length} removal candidates in data/food-removal-candidates.json`);
console.log(JSON.stringify(summary, null, 2));
