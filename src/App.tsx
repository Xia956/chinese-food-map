import { useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw, Search, SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';
import { ChinaMap } from './components/ChinaMap';
import { FlavorCarousel } from './components/FlavorCarousel';
import { FoodModal } from './components/FoodModal';
import { foodById, foods } from './data/foods';
import { provinceByMapName, provinces } from './data/provinces';
import { formatFoodLocation } from './foodDisplay';
import type { FoodItem } from './types';

const ALL_VALUE = '全部';
const BACKGROUND_MUSIC_URL = '/audio/pipa-chinese-restaurant-background-5.mp3';
const BACKGROUND_MUSIC_VOLUME = 0.1;
const BACKGROUND_MUSIC_FADE_MS = 1800;
const MOBILE_INITIAL_COUNT = 16;
const MOBILE_LOAD_COUNT = 10;

function createBackgroundAudio() {
  const audio = new Audio(BACKGROUND_MUSIC_URL);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;
  return audio;
}

export default function App() {
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState(ALL_VALUE);
  const [categoryFilter, setCategoryFilter] = useState(ALL_VALUE);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [audioMessage, setAudioMessage] = useState('正在播放琵琶风格配乐《中式餐叙背景曲 5》');
  const [selectedFood, setSelectedFood] = useState<FoodItem>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(MOBILE_INITIAL_COUNT);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const musicFadeTimerRef = useRef<number | undefined>(undefined);

  const fadeInMusic = (audio: HTMLAudioElement) => {
    window.clearInterval(musicFadeTimerRef.current);
    audio.volume = 0;
    const startedAt = performance.now();

    musicFadeTimerRef.current = window.setInterval(() => {
      const progress = Math.min((performance.now() - startedAt) / BACKGROUND_MUSIC_FADE_MS, 1);
      audio.volume = BACKGROUND_MUSIC_VOLUME * progress;
      if (progress === 1) window.clearInterval(musicFadeTimerRef.current);
    }, 50);
  };

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
    const audio = createBackgroundAudio();
    musicRef.current = audio;

    const startMusic = () => {
      void audio
        .play()
        .then(() => {
          fadeInMusic(audio);
          setAudioMessage('正在播放琵琶风格配乐《中式餐叙背景曲 5》');
        })
        .catch(() => setAudioMessage('点击页面后即可播放背景音乐'));
    };
    const unlockMusic = () => {
      startMusic();
      document.removeEventListener('pointerdown', unlockMusic, true);
      document.removeEventListener('keydown', unlockMusic, true);
    };

    startMusic();
    document.addEventListener('pointerdown', unlockMusic, true);
    document.addEventListener('keydown', unlockMusic, true);

    return () => {
      document.removeEventListener('pointerdown', unlockMusic, true);
      document.removeEventListener('keydown', unlockMusic, true);
      window.clearInterval(musicFadeTimerRef.current);
      audio.pause();
      audio.removeAttribute('src');
      musicRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    if (musicPlaying) {
      window.clearInterval(musicFadeTimerRef.current);
      musicRef.current?.pause();
      setMusicPlaying(false);
      setAudioMessage('背景音乐已静音');
      return;
    }

    try {
      if (!musicRef.current) musicRef.current = createBackgroundAudio();
      await musicRef.current.play();
      fadeInMusic(musicRef.current);
      setMusicPlaying(true);
      setAudioMessage('正在播放琵琶风格配乐《中式餐叙背景曲 5》');
    } catch {
      setAudioMessage('浏览器暂时无法播放背景音乐，请稍后重试');
    }
  };

  useEffect(() => {
    setSelectedFood(undefined);
  }, [selectedProvince]);

  useEffect(() => {
    setMobileVisibleCount(MOBILE_INITIAL_COUNT);
  }, [categoryFilter, searchTerm, seasonFilter, selectedProvince]);

  return (
    <main className={selectedProvince ? 'app-shell is-province-page' : 'app-shell is-home-page'}>
      <header className="topbar">
        <div>
          <span className="site-mark">
            <span className="site-mark-program">《舌尖上的中国》</span>
            <span className="site-mark-suffix">美食地图</span>
          </span>
        </div>
        {selectedProvince ? (
          <div className="toolbar">
            <button className="text-button" type="button" onClick={clearFilters}>
              <RotateCcw size={17} aria-hidden="true" />
              返回全国
            </button>
          </div>
        ) : null}
        <span className="audio-status" aria-live="polite">
          {audioMessage}
        </span>
      </header>

      <ChinaMap
        selectedProvince={selectedProvince}
        onSelectProvince={setSelectedProvince}
        mapControl={
          <button
            className="icon-button ambient-audio-button"
            type="button"
            aria-label={musicPlaying ? '静音背景音乐' : '播放背景音乐'}
            aria-pressed={musicPlaying}
            onClick={() => void toggleMusic()}
          >
            {musicPlaying ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
          </button>
        }
      />

      {provinceEntry ? <FlavorCarousel foods={provinceFoods} provinceName={provinceEntry.name} onSelectFood={setSelectedFood} /> : null}

      <section className="data-section" aria-labelledby="food-data-title">
        <div className="data-heading">
          <div>
            <span>资料表</span>
            <h2 id="food-data-title">{selectedProvince ? `${selectedProvince}美食条目` : '全部美食条目'}</h2>
          </div>
          <div className="data-summary">
            <p>{filteredFoods.length} 条结果</p>
            <button
              className="mobile-filter-toggle"
              type="button"
              aria-expanded={mobileFiltersOpen}
              aria-controls="food-filter-controls"
              onClick={() => setMobileFiltersOpen((value) => !value)}
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              {mobileFiltersOpen ? '收起筛选' : '筛选'}
            </button>
          </div>
        </div>

        <div id="food-filter-controls" className={`data-controls${mobileFiltersOpen ? ' is-open' : ''}`} aria-label="美食资料筛选">
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
                {filteredFoods.map((food, index) => (
                  <tr
                    className={`is-interactive${index >= mobileVisibleCount ? ' is-mobile-hidden' : ''}`}
                    key={food.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`查看${food.name}详情`}
                    onClick={() => setSelectedFood(food)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedFood(food);
                      }
                    }}
                  >
                    <th scope="row">{food.name}</th>
                    <td data-label="地点">{formatFoodLocation(food)}</td>
                    <td data-label="节目">
                      {food.season} · {food.episode}
                    </td>
                    <td data-label="类别">{food.category}</td>
                    <td data-label="主要食材">{food.ingredients.join('、')}</td>
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

        {!selectedProvince && filteredFoods.length > MOBILE_INITIAL_COUNT ? (
          <div className="mobile-results-actions">
            <span>
              已展示 {Math.min(mobileVisibleCount, filteredFoods.length)} / {filteredFoods.length} 条
            </span>
            <button
              type="button"
              onClick={() =>
                setMobileVisibleCount((count) =>
                  count >= filteredFoods.length ? MOBILE_INITIAL_COUNT : Math.min(count + MOBILE_LOAD_COUNT, filteredFoods.length),
                )
              }
            >
              {mobileVisibleCount >= filteredFoods.length ? '收起条目' : '加载更多'}
            </button>
          </div>
        ) : null}
      </section>

      <FoodModal food={selectedFood} onClose={() => setSelectedFood(undefined)} />
    </main>
  );
}
