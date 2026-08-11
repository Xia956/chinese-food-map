import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { MapChart, ScatterChart } from 'echarts/charts';
import { GeoComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts, EChartsOption } from 'echarts';
import { ChinaData } from 'china-map-geojson';
import { MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Geometry, Position } from 'geojson';
import { foodById } from '../data/foods';
import { cityById, provinceByMapName } from '../data/provinces';
import type { CityEntry } from '../types';

interface ChinaMapProps {
  selectedProvince?: string;
  onSelectProvince: (provinceName: string) => void;
  mapControl?: ReactNode;
}

type MapLabelPoint = Pick<CityEntry, 'id' | 'name' | 'longitude' | 'latitude'>;

const MAP_NAME = 'delicious-china';
const MAP_LAYOUT_SIZE = '102%';
const MOBILE_MAP_LAYOUT_SIZE = '96%';
const SELECTED_VIEW_SCALE = 124 / 102;
const SELECTED_MAP_ZOOM = 3.18 * SELECTED_VIEW_SCALE;
const MIN_SELECTED_MAP_ZOOM = 1.82 * SELECTED_VIEW_SCALE;
const DEFAULT_MAP_ZOOM = 1.34;
const MOBILE_DEFAULT_MAP_ZOOM = 1;
const SELECTED_MAP_PADDING = 0.96;
const MAP_MOVE_DURATION = 1400;
const CITY_REVEAL_DURATION = 760;
const PROVINCE_LABEL_OFFSETS: Partial<Record<string, [number, number]>> = {
  河北: [-18, 10],
  北京: [10, -11],
  天津: [16, 9],
  香港: [16, -3],
  澳门: [-16, 10],
};

echarts.use([GeoComponent, MapChart, ScatterChart, TooltipComponent, CanvasRenderer]);
echarts.registerMap(MAP_NAME, ChinaData as Parameters<typeof echarts.registerMap>[1]);

function isInsideRing(point: [number, number], ring: Position[]) {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }

  return inside;
}

function isInsidePolygon(point: [number, number], polygon: Position[][]) {
  const [outer, ...holes] = polygon;
  if (!outer || !isInsideRing(point, outer)) return false;
  return !holes.some((hole) => isInsideRing(point, hole));
}

function geometryContainsPoint(geometry: Geometry, point: [number, number]) {
  if (geometry.type === 'Polygon') {
    return isInsidePolygon(point, geometry.coordinates);
  }

  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.some((polygon) => isInsidePolygon(point, polygon));
  }

  return false;
}

interface GeoBounds {
  minLongitude: number;
  maxLongitude: number;
  minLatitude: number;
  maxLatitude: number;
}

function getGeometryBounds(geometry: Geometry): GeoBounds | undefined {
  if (!('coordinates' in geometry)) return undefined;

  const bounds: GeoBounds = {
    minLongitude: Number.POSITIVE_INFINITY,
    maxLongitude: Number.NEGATIVE_INFINITY,
    minLatitude: Number.POSITIVE_INFINITY,
    maxLatitude: Number.NEGATIVE_INFINITY,
  };
  const visitCoordinates = (coordinates: unknown) => {
    if (!Array.isArray(coordinates)) return;
    if (
      coordinates.length >= 2 &&
      typeof coordinates[0] === 'number' &&
      typeof coordinates[1] === 'number'
    ) {
      bounds.minLongitude = Math.min(bounds.minLongitude, coordinates[0]);
      bounds.maxLongitude = Math.max(bounds.maxLongitude, coordinates[0]);
      bounds.minLatitude = Math.min(bounds.minLatitude, coordinates[1]);
      bounds.maxLatitude = Math.max(bounds.maxLatitude, coordinates[1]);
      return;
    }
    coordinates.forEach(visitCoordinates);
  };

  visitCoordinates(geometry.coordinates);
  return Number.isFinite(bounds.minLongitude) ? bounds : undefined;
}

const CHINA_BOUNDS = ChinaData.features.reduce<GeoBounds | undefined>((combined, feature) => {
  const featureBounds = getGeometryBounds(feature.geometry);
  if (!featureBounds) return combined;
  if (!combined) return { ...featureBounds };
  return {
    minLongitude: Math.min(combined.minLongitude, featureBounds.minLongitude),
    maxLongitude: Math.max(combined.maxLongitude, featureBounds.maxLongitude),
    minLatitude: Math.min(combined.minLatitude, featureBounds.minLatitude),
    maxLatitude: Math.max(combined.maxLatitude, featureBounds.maxLatitude),
  };
}, undefined);

function getSelectedProvinceView(geometry: Geometry) {
  const bounds = getGeometryBounds(geometry);
  if (!bounds || !CHINA_BOUNDS) return undefined;

  const provinceWidth = Math.max(bounds.maxLongitude - bounds.minLongitude, 0.01);
  const provinceHeight = Math.max(bounds.maxLatitude - bounds.minLatitude, 0.01);
  const chinaWidth = CHINA_BOUNDS.maxLongitude - CHINA_BOUNDS.minLongitude;
  const chinaHeight = CHINA_BOUNDS.maxLatitude - CHINA_BOUNDS.minLatitude;
  const fittedZoom =
    Math.min(chinaWidth / provinceWidth, chinaHeight / provinceHeight) * SELECTED_MAP_PADDING * SELECTED_VIEW_SCALE;

  return {
    center: [
      (bounds.minLongitude + bounds.maxLongitude) / 2,
      (bounds.minLatitude + bounds.maxLatitude) / 2,
    ] as [number, number],
    zoom: Math.min(SELECTED_MAP_ZOOM, Math.max(MIN_SELECTED_MAP_ZOOM, fittedZoom)),
  };
}

function findProvinceAtCoordinate(coordinate: unknown) {
  if (!Array.isArray(coordinate) || coordinate.length < 2) return undefined;
  const point: [number, number] = [Number(coordinate[0]), Number(coordinate[1])];
  if (!Number.isFinite(point[0]) || !Number.isFinite(point[1])) return undefined;

  return ChinaData.features.find((feature) => geometryContainsPoint(feature.geometry, point));
}

function resizeChartToNode(chart: ECharts, node: HTMLDivElement) {
  const width = node.clientWidth;
  const height = node.clientHeight;
  if (width <= 0 || height <= 0 || (chart.getWidth() === width && chart.getHeight() === height)) return;
  chart.resize({ width, height });
}

export function ChinaMap({ selectedProvince, onSelectProvince, mapControl }: ChinaMapProps) {
  const chartNodeRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ECharts | null>(null);
  const [compactMap, setCompactMap] = useState(false);
  const [cityReveal, setCityReveal] = useState({ province: selectedProvince, opacity: 1 });
  const selectedEntry = selectedProvince ? provinceByMapName.get(selectedProvince) : undefined;
  const cityOpacity = selectedProvince && cityReveal.province === selectedProvince ? cityReveal.opacity : 0;

  const selectedMapPlaces = useMemo(
    () => {
      if (!selectedEntry) return [];

      const points = new Map<string, MapLabelPoint>();
      selectedEntry.cityIds
        .map((id) => cityById.get(id))
        .filter((city): city is CityEntry => Boolean(city))
        .forEach((city) => {
          points.set(city.name, {
            id: city.id,
            name: city.name,
            longitude: city.longitude,
            latitude: city.latitude,
          });
        });

      selectedEntry.foodIds.forEach((foodId) => {
        const food = foodById.get(foodId);
        if (!food || food.city === '待核实' || food.province === '待核实') return;
        if (!Number.isFinite(food.longitude) || !Number.isFinite(food.latitude)) return;
        if (points.has(food.city)) return;

        points.set(food.city, {
          id: `${selectedEntry.id}-${food.city}`,
          name: food.city,
          longitude: food.longitude,
          latitude: food.latitude,
        });
      });

      return Array.from(points.values());
    },
    [selectedEntry],
  );

  const option = useMemo<EChartsOption>(() => {
    const selectedFeature = ChinaData.features.find((feature) => feature.properties.name === selectedProvince);
    const selectedView = selectedFeature ? getSelectedProvinceView(selectedFeature.geometry) : undefined;
    const selectedCenter =
      selectedView?.center ??
      selectedFeature?.properties.cp ??
      (selectedMapPlaces[0] ? ([selectedMapPlaces[0].longitude, selectedMapPlaces[0].latitude] as [number, number]) : undefined);
    const cityLabelSize = selectedMapPlaces.length > 8 ? 10 : selectedMapPlaces.length > 4 ? 11 : 12;

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDurationUpdate: MAP_MOVE_DURATION,
      animationEasingUpdate: 'cubicInOut',
      tooltip: {
        show: false,
      },
      geo: {
        map: MAP_NAME,
        roam: selectedProvince ? 'move' : false,
        silent: false,
        center: selectedCenter,
        zoom: selectedProvince ? (selectedView?.zoom ?? SELECTED_MAP_ZOOM) : compactMap ? MOBILE_DEFAULT_MAP_ZOOM : DEFAULT_MAP_ZOOM,
        aspectScale: 0.86,
        layoutCenter: [compactMap && !selectedProvince ? '50%' : '49%', compactMap && !selectedProvince ? '58%' : '52%'],
        layoutSize: compactMap && !selectedProvince ? MOBILE_MAP_LAYOUT_SIZE : MAP_LAYOUT_SIZE,
        itemStyle: {
          areaColor: '#2d403a',
          borderColor: 'rgba(218, 190, 137, 0.28)',
          borderWidth: 0.58,
          shadowBlur: 24,
          shadowColor: 'rgba(0, 0, 0, 0.32)',
        },
        label: {
          show: false,
          color: '#fff6e6',
          fontFamily: '"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif',
          fontSize: 12,
          fontWeight: 800,
          textBorderColor: 'rgba(12, 9, 7, 0.78)',
          textBorderWidth: 1.4,
        },
        emphasis: {
          label: {
            show: true,
            color: '#fff1cf',
            fontFamily: '"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif',
            fontSize: 18,
            fontWeight: 800,
            textBorderColor: 'rgba(12, 9, 7, 0.82)',
            textBorderWidth: 1.8,
          },
          itemStyle: {
            areaColor: '#b65a38',
            borderColor: '#ffd18b',
            borderWidth: 0.9,
            shadowBlur: 22,
            shadowColor: 'rgba(214, 89, 50, 0.5)',
          },
        },
        select: {
          disabled: true,
        },
        regions: ChinaData.features.map((feature) => {
          const name = feature.properties.name;
          const isSelected = selectedProvince === name;
          const isDimmed = Boolean(selectedProvince && !isSelected);
          return {
            name,
            itemStyle: {
              areaColor: isSelected ? '#b94632' : isDimmed ? 'rgba(58, 72, 66, 0.32)' : '#2d403a',
              borderColor: isSelected ? '#ffd38f' : isDimmed ? 'rgba(176, 156, 116, 0.13)' : 'rgba(218, 190, 137, 0.28)',
              borderWidth: isSelected ? 1 : isDimmed ? 0.42 : 0.58,
              shadowBlur: isSelected ? 34 : 10,
              shadowColor: isSelected ? 'rgba(210, 76, 46, 0.58)' : 'rgba(0, 0, 0, 0.16)',
            },
            label: {
              show: true,
              offset: selectedProvince ? [0, 0] : PROVINCE_LABEL_OFFSETS[name],
              color: isDimmed ? 'rgba(255, 239, 204, 0.66)' : '#fff0cf',
              fontFamily: '"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif',
              fontSize: isSelected ? 18 : isDimmed ? 10 : 12,
              fontWeight: isSelected ? 800 : 700,
              textBorderColor: 'rgba(12, 9, 7, 0.78)',
              textBorderWidth: isSelected ? 1.9 : 1.4,
            },
          };
        }),
      },
      series: [
        {
          name: '城市',
          type: 'scatter',
          coordinateSystem: 'geo',
          animation: false,
          symbol: 'circle',
          symbolSize: selectedMapPlaces.length > 8 ? 5 : selectedMapPlaces.length > 4 ? 6 : 8,
          zlevel: 2,
          data: selectedMapPlaces.map((city) => ({
            name: city.name,
            value: [city.longitude, city.latitude, 1],
          })),
          label: {
            show: true,
            formatter: '{b}',
            position: 'right',
            distance: selectedMapPlaces.length > 8 ? 4 : selectedMapPlaces.length > 4 ? 5 : 8,
            color: '#f9ebc8',
            fontSize: cityLabelSize,
            fontWeight: 700,
            textBorderColor: 'rgba(16, 13, 11, 0.72)',
            textBorderWidth: 1.2,
            opacity: cityOpacity,
          },
          labelLayout: {
            hideOverlap: true,
          },
          itemStyle: {
            color: '#58c4b6',
            borderColor: '#f8df9a',
            borderWidth: 0.8,
            shadowBlur: 18,
            shadowColor: 'rgba(88, 196, 182, 0.72)',
            opacity: cityOpacity,
          },
          emphasis: {
            scale: 1.3,
          },
        },
      ],
    };
  }, [cityOpacity, compactMap, selectedMapPlaces, selectedProvince]);

  useEffect(() => {
    if (!selectedProvince) {
      setCityReveal({ province: undefined, opacity: 1 });
      return;
    }
    let revealFrame = 0;

    const revealTimer = window.setTimeout(() => {
      const revealStart = window.performance.now();
      const revealCities = (now: number) => {
        const progress = Math.min((now - revealStart) / CITY_REVEAL_DURATION, 1);
        const easedOpacity = progress * progress * (3 - 2 * progress);
        setCityReveal({ province: selectedProvince, opacity: easedOpacity });
        if (progress < 1) revealFrame = window.requestAnimationFrame(revealCities);
      };
      revealFrame = window.requestAnimationFrame(revealCities);
    }, MAP_MOVE_DURATION);

    return () => {
      window.clearTimeout(revealTimer);
      window.cancelAnimationFrame(revealFrame);
    };
  }, [selectedProvince]);

  useLayoutEffect(() => {
    const node = chartNodeRef.current;
    if (!node) return;

    const chart = echarts.init(node, null, { renderer: 'canvas' });
    chartRef.current = chart;
    setCompactMap(node.clientWidth <= 620);

    chart.on('click', (params) => {
      if (typeof params.name === 'string' && provinceByMapName.has(params.name)) {
        onSelectProvince(params.name);
      }
    });
    chart.getZr().on('click', (event) => {
      const coordinate = chart.convertFromPixel({ geoIndex: 0 }, [event.offsetX, event.offsetY]);
      const feature = findProvinceAtCoordinate(coordinate);
      if (feature && provinceByMapName.has(feature.properties.name)) {
        onSelectProvince(feature.properties.name);
      }
    });
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(() => {
        setCompactMap((current) => {
          const next = node.clientWidth <= 620;
          return current === next ? current : next;
        });
        if (!chart.isDisposed()) resizeChartToNode(chart, node);
      });
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, [onSelectProvince]);

  useLayoutEffect(() => {
    const chart = chartRef.current;
    const node = chartNodeRef.current;
    if (!chart || !node || chart.isDisposed()) return;

    resizeChartToNode(chart, node);
    chart.setOption(option, { replaceMerge: ['series'] });
  }, [option]);

  return (
    <section className="map-stage" aria-label="中国美食地图">
      <div className="map-panel">
        <div ref={chartNodeRef} className="echarts-map" role="img" aria-label="ECharts 和 GeoJSON 渲染的中国省份地图" />
        <div className="map-vignette" aria-hidden="true" />
        {mapControl}
        {selectedEntry ? (
          <div className="mobile-province-overlay" aria-live="polite">
            <h1>{selectedEntry.name}</h1>
            <p>{selectedEntry.intro}</p>
          </div>
        ) : null}
        <div className="map-accessibility-list" aria-label="省份快捷选择">
          {ChinaData.features.map((feature) => (
            <button key={feature.properties.name} type="button" onClick={() => onSelectProvince(feature.properties.name)}>
              查看{feature.properties.name}美食
            </button>
          ))}
        </div>
        {!selectedEntry ? (
          <div className="map-prompt">
            <span>一省一味</span>
            <h1>循着山河，去看人间风味</h1>
            <p>选择一处省份，展开当地的节目美食。</p>
          </div>
        ) : null}
      </div>

      {selectedEntry ? (
        <aside className="province-readout" aria-live="polite">
          <span className="readout-kicker">
            <MapPin size={15} aria-hidden="true" />
            当前省份
          </span>
          <h1>{selectedEntry.name}</h1>
          <p>{selectedEntry.intro}</p>
          <div className="city-chip-row">
            {selectedMapPlaces.map((city) => (
              <span key={city.id}>{city.name}</span>
            ))}
          </div>
        </aside>
      ) : null}
    </section>
  );
}
