import type { FoodItem } from './types';

export const formatFoodLocation = (food: Pick<FoodItem, 'province' | 'city'>) =>
  food.city === '待核实' ? food.province : `${food.province} · ${food.city}`;

export const formatFoodPlaceLabel = (food: Pick<FoodItem, 'province' | 'city'>) =>
  food.city === '待核实' ? food.province : food.city;
