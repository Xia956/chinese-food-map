import { useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw, Search, Volume2, VolumeX } from 'lucide-react';
import { ChinaMap } from './components/ChinaMap';
import { FlavorCarousel } from './components/FlavorCarousel';
import { FoodModal } from './components/FoodModal';
import { foodById, foods } from './data/foods';
import { provinceByMapName, provinces } from './data/provinces';
import { formatFoodLocation } from './foodDisplay';
import type { FoodItem } from './types';

const ALL_VALUE = '全部';
const DIALECT_AUDIO_ENABLED = false;

export default function App() {
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState(ALL_VALUE);
  const [categoryFilter, setCategoryFilter] = useState(ALL_VALUE);
  const [muted, setMuted] = useState(false);
  const [audioMessage, setAudioMessage] = useState('尚未选择省份');
  const [selectedFood, setSelectedFood] = useState<FoodItem>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const provinceEntry = selectedProvince ? provinceByMapName.get(selectedProvince) : undefined;
  const provinceFoods = useMemo(() => {
    const foods = provinceEntry?.foodIds.map((id) => foodById.get(id)).filter((food): food is FoodItem => Boolean(food)) ?? [];
    const seenNames = new Set<string>();

    return foods.filter((food) => {
      if (seenNames.has(food.name)) return false;
      seenNames.add(food.name);
      return true;
    });
  }, [provinceEntry]);
  const seasons = useMemo(() => Array.from(new Set(foods.map((food) => food.season).filter((season): season is string => Boolean(season)))), []);
  const categories = useMemo(() => Array.from(new Set(foods.map((food) => food.category))).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN')), []);
  const filteredFoods = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return foods.filter((food) => {
      const matchesProvince = selectedProvince ? food.province === selectedProvince : true;
      const matchesSeason = seasonFilter === ALL_VALUE ? true : food.season === seasonFilter;
      const matchesCategory = categoryFilter === ALL_VALUE ? true : food.category === categoryFilter;
      const searchable = [
        food.name,
        food.province,
        food.city,
        food.region,
        food.category,
        food.season,
        food.episode,
        food.flavorProfile,
        ...food.ingredients,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesProvince && matchesSeason && matchesCategory && (!normalizedTerm || searchable.includes(normalizedTerm));
    });
  }, [categoryFilter, searchTerm, seasonFilter, selectedProvince]);

  const clearFilters = () => {
    setSelectedProvince(undefined);
    setSearchTerm('');
    setSeasonFilter(ALL_VALUE);
    setCategoryFilter(ALL_VALUE);
  };

  useEffect(() => {
    if (!DIALECT_AUDIO_ENABLED) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.56;
    }

    const audio = audioRef.current;
    audio.pause();
    audio.removeAttribute('src');

    if (!provinceEntry) {
      setAudioMessage('尚未选择省份');
      return;
    }

    if (!provinceEntry.dialectAudio) {
      setAudioMessage(`${provinceEntry.name}暂无方言音频`);
      return;
    }

    if (muted) {
      setAudioMessage('声音已关闭');
      return;
    }

    audio.src = provinceEntry.dialectAudio.url;
    audio.currentTime = 0;
    audio
      .play()
      .then(() => setAudioMessage(`正在播放${provinceEntry.name}代表方言`))
      .catch(() => setAudioMessage('浏览器暂未允许自动播放，请再次点击省份或开启声音'));
  }, [provinceEntry, muted]);

  useEffect(() => {
    setSelectedFood(undefined);
  }, [selectedProvince]);

  return (
    <main className={selectedProvince ? 'app-shell is-province-page' : 'app-shell is-home-page'}>
      <header className="topbar">
        <div>
          <span className="site-mark">《舌尖上的中国》美食地图</span>
        </div>
        <div className="toolbar">
          {selectedProvince ? (
            <button className="text-button" type="button" onClick={clearFilters}>
              <RotateCcw size={17} aria-hidden="true" />
              返回全国
            </button>
          ) : null}
          {DIALECT_AUDIO_ENABLED ? (
            <button className="icon-button" type="button" aria-label={muted ? '开启声音' : '关闭声音'} onClick={() => setMuted((value) => !value)}>
              {muted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
            </button>
          ) : null}
        </div>
      </header>

      <ChinaMap selectedProvince={selectedProvince} onSelectProvince={setSelectedProvince} />

      {provinceEntry ? <FlavorCarousel foods={provinceFoods} provinceName={provinceEntry.name} onSelectFood={setSelectedFood} /> : null}

      <section className="data-section" aria-labelledby="food-data-title">
        <div className="data-heading">
          <div>
            <span>资料表</span>
            <h2 id="food-data-title">{selectedProvince ? `${selectedProvince}美食条目` : '全部美食条目'}</h2>
          </div>
          <p>{filteredFoods.length} 条结果</p>
        </div>

        <div className="data-controls" aria-label="美食资料筛选">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span>关键词</span>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="莲藕 / 云南 / 第1集" />
          </label>
          <label>
            <span>省份</span>
            <select value={selectedProvince ?? ALL_VALUE} onChange={(event) => setSelectedProvince(event.target.value === ALL_VALUE ? undefined : event.target.value)}>
              <option value={ALL_VALUE}>全部省份</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>季数</span>
            <select value={seasonFilter} onChange={(event) => setSeasonFilter(event.target.value)}>
              <option value={ALL_VALUE}>全部季数</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>类别</span>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value={ALL_VALUE}>全部类别</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredFoods.length ? (
          <div className="food-table-wrap">
            <table className="food-table">
              <thead>
                <tr>
                  <th scope="col">名称</th>
                  <th scope="col">地点</th>
                  <th scope="col">节目</th>
                  <th scope="col">类别</th>
                  <th scope="col">主要食材</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoods.map((food) => (
                  <tr key={food.id}>
                    <th scope="row">{food.name}</th>
                    <td>{formatFoodLocation(food)}</td>
                    <td>
                      {food.season} · {food.episode}
                    </td>
                    <td>{food.category}</td>
                    <td>{food.ingredients.join('、')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="data-empty">
            <span>未找到匹配条目</span>
            <p>可以清空关键词，或切换省份、季数和类别。</p>
          </div>
        )}
      </section>

      <FoodModal food={selectedFood} onClose={() => setSelectedFood(undefined)} />
    </main>
  );
}
