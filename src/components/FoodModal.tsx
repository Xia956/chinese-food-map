import { useEffect } from 'react';
import { X } from 'lucide-react';
import { getProgramLink } from '../data/programLinks';
import { formatFoodLocation } from '../foodDisplay';
import { localizeFood, localizeRegion, localizeEpisode, localizeSeason, type Locale } from '../i18n';
import type { FoodItem } from '../types';

interface FoodModalProps {
  food?: FoodItem;
  onClose: () => void;
  locale: Locale;
}

export function FoodModal({ food, onClose, locale }: FoodModalProps) {
  useEffect(() => {
    if (!food) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [food, onClose]);

  if (!food) return null;
  const displayFood = localizeFood(food, locale);
  const programLink = getProgramLink(food, locale);
  const copy = locale === 'zh'
    ? {
        close: '关闭详情', noImage: '暂无图片', ingredients: '主要食材', flavor: '风味特征', program: '节目链接',
        geography: '地理归档', pending: '待核实', openProgram: (title: string) => `在央视网打开：${title}`,
      }
    : {
        close: 'Close details', noImage: 'Image unavailable', ingredients: 'Main ingredients', flavor: 'Flavor profile', program: 'Program link',
        geography: 'Geographic archive', pending: 'Pending verification', openProgram: (title: string) => `Open on YouTube: ${title}`,
      };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="food-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-button modal-close" type="button" aria-label={copy.close} onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
        <div className="modal-image">
          {displayFood.image ? <img src={displayFood.image.url} alt={displayFood.image.alt} /> : <span>{copy.noImage}</span>}
        </div>
        <div className="modal-copy">
          <span className="modal-kicker">
            {formatFoodLocation(food, locale)} · {displayFood.category}
          </span>
          <h2 id="food-modal-title">{displayFood.name}</h2>
          <dl className="food-facts">
            <div>
              <dt>{copy.ingredients}</dt>
              <dd>{displayFood.ingredients.join(locale === 'zh' ? '、' : ', ')}</dd>
            </div>
            <div>
              <dt>{copy.flavor}</dt>
              <dd>{displayFood.flavorProfile}</dd>
            </div>
            <div className={programLink ? 'food-fact-program' : undefined}>
              <dt>{copy.program}</dt>
              <dd>
                {programLink ? (
                  <a
                    className="program-episode-link"
                    href={programLink.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={copy.openProgram(programLink.programTitle)}
                  >
                    <span>{programLink.programTitle}</span>
                  </a>
                ) : food.season && food.episode ? (
                  locale === 'zh'
                    ? `${food.season} · ${food.episode}`
                    : `${localizeSeason(food.season, locale)} · ${localizeEpisode(food.episode, locale)} · YouTube link pending verification`
                ) : (
                  copy.pending
                )}
              </dd>
            </div>
            <div>
              <dt>{copy.geography}</dt>
              <dd>{food.region === '待核实' ? copy.pending : `${localizeRegion(food.region, locale)} · ${formatFoodLocation(food, locale)}`}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  );
}
