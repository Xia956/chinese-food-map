import type { FoodItem } from './types';
import { localizeCity, localizeProvince, type Locale } from './i18n';

export const formatFoodLocation = (food: Pick<FoodItem, 'province' | 'city'>, locale: Locale = 'zh') =>
  food.city === '待核实'
    ? localizeProvince(food.province, locale)
    : `${localizeProvince(food.province, locale)} · ${localizeCity(food.city, locale)}`;

export const formatFoodPlaceLabel = (food: Pick<FoodItem, 'province' | 'city'>, locale: Locale = 'zh') =>
  food.city === '待核实' ? localizeProvince(food.province, locale) : localizeCity(food.city, locale);
