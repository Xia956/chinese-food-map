import { useEffect } from 'react';
import { X } from 'lucide-react';
import { getProgramLink } from '../data/programLinks';
import { formatFoodLocation } from '../foodDisplay';
import type { FoodItem } from '../types';

interface FoodModalProps {
  food?: FoodItem;
  onClose: () => void;
}

export function FoodModal({ food, onClose }: FoodModalProps) {
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
  const programLink = getProgramLink(food);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="food-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-button modal-close" type="button" aria-label="关闭详情" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
        <div className="modal-image">
          {food.image ? <img src={food.image.url} alt={food.image.alt} /> : <span>暂无图片</span>}
        </div>
        <div className="modal-copy">
          <span className="modal-kicker">
            {formatFoodLocation(food)} · {food.category}
          </span>
          <h2 id="food-modal-title">{food.name}</h2>
          <dl className="food-facts">
            <div>
              <dt>主要食材</dt>
              <dd>{food.ingredients.join('、')}</dd>
            </div>
            <div>
              <dt>风味特征</dt>
              <dd>{food.flavorProfile}</dd>
            </div>
            <div className={programLink ? 'food-fact-program' : undefined}>
              <dt>节目链接</dt>
              <dd>
                {programLink ? (
                  <a
                    className="program-episode-link"
                    href={programLink.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`在央视网打开：${programLink.programTitle}`}
                  >
                    <span>{programLink.programTitle}</span>
                  </a>
                ) : food.season && food.episode ? (
                  `${food.season} · ${food.episode}`
                ) : (
                  '待核实'
                )}
              </dd>
            </div>
            <div>
              <dt>地理归档</dt>
              <dd>{food.region === '待核实' ? '待核实' : `${food.region} · ${formatFoodLocation(food)}`}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  );
}
