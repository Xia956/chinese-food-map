import { useEffect, useMemo, useRef, useState } from 'react';
import { formatFoodPlaceLabel } from '../foodDisplay';
import type { FoodItem } from '../types';

interface FlavorCarouselProps {
  foods: FoodItem[];
  provinceName?: string;
  onSelectFood: (food: FoodItem) => void;
}

const AUTO_SPEED = -0.34;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function FlavorCarousel({ foods, provinceName, onSelectFood }: FlavorCarouselProps) {
  const [offset, setOffset] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(AUTO_SPEED);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const pointerRef = useRef<{ x: number; time: number; moved: number }>({ x: 0, time: 0, moved: 0 });
  const isScrollable = contentWidth > viewportWidth + 1;
  const minOffset = isScrollable ? viewportWidth - contentWidth : 0;

  useEffect(() => {
    offsetRef.current = 0;
    setOffset(0);
    velocityRef.current = AUTO_SPEED;
  }, [provinceName]);

  useEffect(() => {
    const node = viewportRef.current;
    const track = trackRef.current;
    if (!node || !track) return;

    const updateDimensions = () => {
      setViewportWidth(node.clientWidth);
      setContentWidth(track.scrollWidth);
    };
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(node);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isScrollable) {
      offsetRef.current = 0;
      velocityRef.current = 0;
      setOffset(0);
      return;
    }

    velocityRef.current = AUTO_SPEED;
    let frame = 0;
    const tick = () => {
      if (!draggingRef.current) {
        const nextOffset = clamp(offsetRef.current + velocityRef.current, minOffset, 0);
        offsetRef.current = nextOffset;
        if (Math.abs(velocityRef.current - AUTO_SPEED) > 0.03) {
          velocityRef.current *= 0.94;
        } else {
          velocityRef.current = nextOffset > minOffset ? AUTO_SPEED : 0;
        }
        setOffset(offsetRef.current);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isScrollable, minOffset]);

  const beginDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!foods.length) return;
    draggingRef.current = true;
    suppressClickRef.current = false;
    pointerRef.current = { x: event.clientX, time: performance.now(), moved: 0 };
    velocityRef.current = 0;
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = event.clientX - pointerRef.current.x;
    const dt = Math.max(now - pointerRef.current.time, 16);
    pointerRef.current.moved += Math.abs(dx);
    pointerRef.current.x = event.clientX;
    pointerRef.current.time = now;
    if (!isScrollable) return;

    if (pointerRef.current.moved >= 8 && !event.currentTarget.hasPointerCapture(event.pointerId)) {
      suppressClickRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    offsetRef.current = clamp(offsetRef.current + dx, minOffset, 0);
    velocityRef.current = (dx / dt) * 16.67;
    setOffset(offsetRef.current);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const capped = Math.max(-24, Math.min(24, velocityRef.current));
    if ((offsetRef.current <= minOffset && capped < 0) || (offsetRef.current >= 0 && capped > 0)) {
      velocityRef.current = 0;
    } else {
      velocityRef.current = Math.abs(capped) < 0.18 ? AUTO_SPEED : capped;
    }
  };

  if (!provinceName) {
    return (
      <section className="film-shell is-empty" aria-label="味觉胶片">
        <div>
          <span>味觉胶片</span>
          <p>选择一个省份后，这里会出现对应美食轮播。</p>
        </div>
      </section>
    );
  }

  if (!foods.length) {
    return (
      <section className="film-shell is-empty" aria-label="味觉胶片">
        <div>
          <span>{provinceName}暂无节目条目</span>
          <p>当前节目资料中未收录该省份的美食条目。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="film-shell" aria-label={`${provinceName}味觉胶片`}>
      <div className="film-heading">
        <div>
          <span>味觉胶片</span>
          <h2>{provinceName}的风味片段</h2>
        </div>
      </div>
      <div
        ref={viewportRef}
        className={`film-viewport${isScrollable ? ' is-scrollable' : ''}`}
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="film-track" style={{ transform: `translate3d(${offset}px, 0, 0)` }}>
          {foods.map((food) => (
            <button
              type="button"
              className="food-card"
              key={food.id}
              data-food-id={food.id}
              aria-label={`查看${food.name}详情`}
              onClick={(event) => {
                if (event.detail === 0 || !suppressClickRef.current) onSelectFood(food);
                pointerRef.current = { x: 0, time: 0, moved: 0 };
              }}
            >
              <div className="food-image">
                {food.image ? <img src={food.image.url} alt={food.image.alt} draggable={false} /> : <span>暂无图片</span>}
              </div>
              <div className="food-card-copy">
                <span>{formatFoodPlaceLabel(food)}</span>
                <h3>{food.name}</h3>
                <p>{food.flavorProfile}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
