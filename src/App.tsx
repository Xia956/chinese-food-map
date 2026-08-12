import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, RotateCcw, Search, SlidersHorizontal, Volume2 } from 'lucide-react';
import { ChinaMap } from './components/ChinaMap';
import { FlavorCarousel } from './components/FlavorCarousel';
import { FoodModal } from './components/FoodModal';
import { foodById, foods } from './data/foods';
import { provinceByMapName, provinces } from './data/provinces';
import { formatFoodLocation } from './foodDisplay';
import {
  getLocaleFromPath,
  localePath,
  localizeCategory,
  localizeEpisode,
  localizeFood,
  localizeProvince,
  localizeSeason,
  ui,
  type Locale,
} from './i18n';
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

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  locale: Locale;
}

function FilterSelect({ label, value, options, onChange, locale }: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  }, [open]);

  useEffect(() => {
    if (!open || !window.matchMedia('(max-width: 620px)').matches) return;

    const frame = window.requestAnimationFrame(() => {
      const optionsPanel = dropdownRef.current?.querySelector<HTMLElement>('.filter-options');
      if (!optionsPanel) return;

      const overflow = optionsPanel.getBoundingClientRect().bottom - (window.innerHeight - 12);
      if (overflow > 0) window.scrollBy({ top: overflow, behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  return (
    <div
      className={`filter-dropdown${open ? ' is-open' : ''}`}
      ref={dropdownRef}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      <span>{label}</span>
      <button
        className="filter-select-trigger"
        type="button"
        aria-label={`${label}：${selectedLabel}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="filter-select-value">{selectedLabel}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open ? (
        <div className="filter-options" role="listbox" aria-label={ui[locale].optionLabel(label)}>
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                className="filter-option"
                type="button"
                role="option"
                aria-selected={selected}
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {selected ? <Check size={15} aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => getLocaleFromPath(window.location.pathname));
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState(ALL_VALUE);
  const [categoryFilter, setCategoryFilter] = useState(ALL_VALUE);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [audioMessage, setAudioMessage] = useState<string>(() => ui[getLocaleFromPath(window.location.pathname)].playingMusic);
  const [selectedFood, setSelectedFood] = useState<FoodItem>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(MOBILE_INITIAL_COUNT);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const musicFadeTimerRef = useRef<number | undefined>(undefined);
  const musicPlayingRef = useRef(musicPlaying);
  const copy = ui[locale];
  musicPlayingRef.current = musicPlaying;

  useEffect(() => {
    if (window.location.pathname !== '/zh' && window.location.pathname !== '/en') {
      window.history.replaceState({}, '', `${localePath(locale)}${window.location.search}${window.location.hash}`);
    }
    const handleHistory = () => setLocale(getLocaleFromPath(window.location.pathname));
    window.addEventListener('popstate', handleHistory);
    return () => window.removeEventListener('popstate', handleHistory);
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    document.title = locale === 'zh' ? '《舌尖上的中国》美食地图' : 'A Bite of China Food Map';
    setAudioMessage(musicPlaying ? copy.playingMusic : copy.musicMuted);
  }, [copy.musicMuted, copy.playingMusic, locale, musicPlaying]);

  const switchLocale = () => {
    const nextLocale: Locale = locale === 'zh' ? 'en' : 'zh';
    window.history.pushState({}, '', `${localePath(nextLocale)}${window.location.search}${window.location.hash}`);
    setLocale(nextLocale);
  };

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
      const displayFood = localizeFood(food, locale);
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
        displayFood.name,
        displayFood.province,
        displayFood.city,
        displayFood.region,
        displayFood.category,
        displayFood.season,
        displayFood.episode,
        displayFood.flavorProfile,
        ...displayFood.ingredients,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesProvince && matchesSeason && matchesCategory && (!normalizedTerm || searchable.includes(normalizedTerm));
    });
  }, [categoryFilter, locale, searchTerm, seasonFilter, selectedProvince]);
  const hasActiveFilters =
    Boolean(searchTerm.trim()) || Boolean(selectedProvince) || seasonFilter !== ALL_VALUE || categoryFilter !== ALL_VALUE;

  const clearFilters = () => {
    setSelectedProvince(undefined);
    setSearchTerm('');
    setSeasonFilter(ALL_VALUE);
    setCategoryFilter(ALL_VALUE);
  };

  useEffect(() => {
    const audio = createBackgroundAudio();
    musicRef.current = audio;
    const initialCopy = ui[getLocaleFromPath(window.location.pathname)];

    const startMusic = () => {
      if (!musicPlayingRef.current) return;
      void audio
        .play()
        .then(() => {
          if (!musicPlayingRef.current) {
            audio.pause();
            audio.volume = 0;
            return;
          }
          fadeInMusic(audio);
          setAudioMessage(initialCopy.playingMusic);
        })
        .catch(() => setAudioMessage(initialCopy.clickForMusic));
    };
    const unlockMusic = () => {
      if (musicPlayingRef.current) startMusic();
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
      audio.muted = true;
      audio.volume = 0;
      audio.removeAttribute('src');
      musicRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    if (musicPlaying) {
      musicPlayingRef.current = false;
      window.clearInterval(musicFadeTimerRef.current);
      if (musicRef.current) {
        musicRef.current.muted = true;
        musicRef.current.volume = 0;
        musicRef.current.pause();
      }
      setMusicPlaying(false);
      setAudioMessage(copy.musicMuted);
      return;
    }

    try {
      if (!musicRef.current) musicRef.current = createBackgroundAudio();
      musicPlayingRef.current = true;
      musicRef.current.muted = false;
      await musicRef.current.play();
      fadeInMusic(musicRef.current);
      setMusicPlaying(true);
      setAudioMessage(copy.playingMusic);
    } catch {
      musicPlayingRef.current = false;
      setMusicPlaying(false);
      setAudioMessage(copy.musicUnavailable);
    }
  };

  useEffect(() => {
    setSelectedFood(undefined);
  }, [selectedProvince]);

  useEffect(() => {
    setMobileVisibleCount(MOBILE_INITIAL_COUNT);
  }, [categoryFilter, searchTerm, seasonFilter, selectedProvince]);

  useEffect(() => {
    if (hasActiveFilters) return;

    let lastTouchY = 0;
    const rememberTouchPosition = (event: TouchEvent) => {
      if (event.touches.length === 1) lastTouchY = event.touches[0].clientY;
    };
    const stopBottomOverscroll = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;

      const currentTouchY = event.touches[0].clientY;
      const movingTowardPageBottom = currentTouchY < lastTouchY;
      lastTouchY = currentTouchY;
      if ((event.target as Element | null)?.closest('.echarts-map')) return;

      const root = document.documentElement;
      const atPageBottom = window.scrollY + window.innerHeight >= root.scrollHeight - 1;
      if (atPageBottom && movingTowardPageBottom) event.preventDefault();
    };

    document.addEventListener('touchstart', rememberTouchPosition, { passive: true });
    document.addEventListener('touchmove', stopBottomOverscroll, { passive: false });
    return () => {
      document.removeEventListener('touchstart', rememberTouchPosition);
      document.removeEventListener('touchmove', stopBottomOverscroll);
    };
  }, [hasActiveFilters]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      const audio = musicRef.current;
      if (!audio) return;

      if (document.hidden) {
        audio.pause();
        return;
      }

      if (musicPlayingRef.current && audio.paused) {
        void audio
          .play()
          .then(() => fadeInMusic(audio))
          .catch(() => setAudioMessage(copy.clickForMusic));
      }
    };
    const pauseWhenLeaving = () => musicRef.current?.pause();

    document.addEventListener('visibilitychange', pauseWhenHidden);
    window.addEventListener('pagehide', pauseWhenLeaving);
    window.addEventListener('pageshow', pauseWhenHidden);
    return () => {
      document.removeEventListener('visibilitychange', pauseWhenHidden);
      window.removeEventListener('pagehide', pauseWhenLeaving);
      window.removeEventListener('pageshow', pauseWhenHidden);
    };
  }, [copy.clickForMusic]);

  return (
    <main className={`${selectedProvince ? 'app-shell is-province-page' : 'app-shell is-home-page'} lang-${locale}`}>
      <header className="topbar">
        <div>
          <span className="site-mark">
            <span className="site-mark-program">{copy.siteProgram}</span>
            {locale === 'en' ? ' ' : null}
            <span className="site-mark-suffix">{copy.siteSuffix}</span>
          </span>
        </div>
        <div className="toolbar">
          {selectedProvince ? (
            <button className="text-button" type="button" onClick={clearFilters}>
              <RotateCcw size={17} aria-hidden="true" />
              {copy.returnNational}
            </button>
          ) : null}
          <button className="text-button language-switch" type="button" aria-label={`${copy.languageLabel}: ${copy.languageName}`} onClick={switchLocale}>
            {copy.languageName}
          </button>
        </div>
        <span className="audio-status" aria-live="polite">
          {audioMessage}
        </span>
      </header>

      <ChinaMap
        locale={locale}
        selectedProvince={selectedProvince}
        onSelectProvince={setSelectedProvince}
        mapControl={
          <button
            className="icon-button ambient-audio-button"
            type="button"
            aria-label={musicPlaying ? copy.muteMusic : copy.playMusic}
            aria-pressed={musicPlaying}
            onClick={() => void toggleMusic()}
          >
            <Volume2 size={20} aria-hidden="true" />
          </button>
        }
      />

      {provinceEntry ? <FlavorCarousel locale={locale} foods={provinceFoods} provinceName={provinceEntry.name} onSelectFood={setSelectedFood} /> : null}

      <section
        className={`data-section${!hasActiveFilters ? ' is-awaiting-filter' : ''}`}
        aria-labelledby="food-data-title"
      >
        <div className="data-heading">
          <div>
            <span>{copy.dataSheet}</span>
            <h2 id="food-data-title">{selectedProvince ? copy.provinceEntries(localizeProvince(selectedProvince, locale)) : copy.allEntries}</h2>
          </div>
          <div className="data-summary">
            <p>
              <span className="result-count">{copy.results(filteredFoods.length)}</span>
              <span className="mobile-filter-hint">{copy.collected(foods.length)}</span>
            </p>
            <button
              className="mobile-filter-toggle"
              type="button"
              aria-expanded={mobileFiltersOpen}
              aria-controls="food-filter-controls"
              onClick={() => setMobileFiltersOpen((value) => !value)}
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              {mobileFiltersOpen ? copy.hideFilters : copy.filters}
            </button>
          </div>
        </div>

        <div id="food-filter-controls" className={`data-controls${mobileFiltersOpen ? ' is-open' : ''}`} aria-label={copy.filterLabel}>
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span>{copy.keyword}</span>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={copy.searchPlaceholder} />
          </label>
          <FilterSelect
            label={copy.province}
            value={selectedProvince ?? ALL_VALUE}
            options={[{ label: copy.allProvinces, value: ALL_VALUE }, ...provinces.map((province) => ({ label: localizeProvince(province.name, locale), value: province.name }))]}
            onChange={(value) => setSelectedProvince(value === ALL_VALUE ? undefined : value)}
            locale={locale}
          />
          <FilterSelect
            label={copy.season}
            value={seasonFilter}
            options={[{ label: copy.allSeasons, value: ALL_VALUE }, ...seasons.map((season) => ({ label: localizeSeason(season, locale) ?? season, value: season }))]}
            onChange={setSeasonFilter}
            locale={locale}
          />
          <FilterSelect
            label={copy.category}
            value={categoryFilter}
            options={[{ label: copy.allCategories, value: ALL_VALUE }, ...categories.map((category) => ({ label: localizeCategory(category, locale), value: category }))]}
            onChange={setCategoryFilter}
            locale={locale}
          />
        </div>

        {!hasActiveFilters ? <p className="mobile-filter-prompt">{copy.selectFilters}</p> : null}

        {filteredFoods.length ? (
          <div className="food-table-wrap">
            <table className="food-table">
              <thead>
                <tr>
                  <th scope="col">{copy.name}</th>
                  <th scope="col">{copy.location}</th>
                  <th scope="col">{copy.program}</th>
                  <th scope="col">{copy.category}</th>
                  <th scope="col">{copy.ingredients}</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoods.map((food, index) => {
                  const displayFood = localizeFood(food, locale);
                  return (
                  <tr
                    className={`is-interactive${index >= mobileVisibleCount ? ' is-mobile-hidden' : ''}`}
                    key={food.id}
                    role="button"
                    tabIndex={0}
                    aria-label={copy.viewDetails(displayFood.name)}
                    onClick={() => setSelectedFood(food)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedFood(food);
                      }
                    }}
                  >
                    <th scope="row">
                      <span className="food-result-thumb" aria-hidden="true">
                        {displayFood.image ? <img src={displayFood.image.url} alt="" loading="lazy" /> : <span>{copy.noImage}</span>}
                        <span className="food-result-overlay">
                          <strong>{displayFood.name}</strong>
                          <span>{formatFoodLocation(food, locale)}</span>
                          <small>{displayFood.category}</small>
                        </span>
                      </span>
                      <span className="food-result-name">{displayFood.name}</span>
                    </th>
                    <td data-label={copy.location}>{formatFoodLocation(food, locale)}</td>
                    <td data-label={copy.program}>
                      {localizeSeason(food.season, locale)} · {localizeEpisode(food.episode, locale)}
                    </td>
                    <td data-label={copy.category}>{displayFood.category}</td>
                    <td data-label={copy.ingredients}>{displayFood.ingredients.join(locale === 'zh' ? '、' : ', ')}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="data-empty">
            <span>{copy.noMatches}</span>
            <p>{copy.emptyHint}</p>
          </div>
        )}

        {!selectedProvince && filteredFoods.length > MOBILE_INITIAL_COUNT ? (
          <div className="mobile-results-actions">
            <span>
              {copy.shown(Math.min(mobileVisibleCount, filteredFoods.length), filteredFoods.length)}
            </span>
            <button
              type="button"
              onClick={() =>
                setMobileVisibleCount((count) =>
                  count >= filteredFoods.length ? MOBILE_INITIAL_COUNT : Math.min(count + MOBILE_LOAD_COUNT, filteredFoods.length),
                )
              }
            >
              {mobileVisibleCount >= filteredFoods.length ? copy.collapseEntries : copy.loadMore}
            </button>
          </div>
        ) : null}
      </section>

      <FoodModal locale={locale} food={selectedFood} onClose={() => setSelectedFood(undefined)} />
    </main>
  );
}
