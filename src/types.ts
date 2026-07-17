export type Confidence = '已核实' | '待核实' | '素材已核实';

export interface MediaSource {
  title: string;
  author: string;
  license: string;
  url: string;
}

export interface CityEntry {
  id: string;
  name: string;
  province: string;
  longitude: number;
  latitude: number;
  foodIds: string[];
}

export interface ProvinceEntry {
  id: string;
  name: string;
  mapName: string;
  region: string;
  intro: string;
  cityIds: string[];
  foodIds: string[];
  dialectAudio?: {
    url: string;
    source: MediaSource;
  };
}

export interface FoodItem {
  id: string;
  name: string;
  province: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  category: string;
  ingredients: string[];
  flavorProfile: string;
  story: string;
  culturalContext: string;
  image?: {
    url: string;
    alt: string;
    source: MediaSource;
  };
  season?: string;
  episode?: string;
  sources: MediaSource[];
  confidence: Confidence;
}
