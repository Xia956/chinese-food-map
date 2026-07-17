/// <reference types="vite/client" />

declare module 'china-map-geojson' {
  import type { FeatureCollection, Geometry } from 'geojson';

  export const ChinaData: FeatureCollection<
    Geometry,
    { id: string; name: string; cp?: [number, number] }
  >;
  export const ProvinceData: Record<string, FeatureCollection>;
}
