import type { FoodItem } from '../types';
import { localizeEpisode, localizeSeason, type Locale } from '../i18n';

export interface ProgramLink {
  url: string;
  programTitle: string;
}

const episodePages: Record<string, string> = {
  '第一季|1': 'https://tv.cctv.com/2018/02/15/VIDE4x73eueOfNOCFlISpwnq180215.shtml',
  '第一季|2': 'https://tv.cctv.com/2018/02/15/VIDEbmZhF9U0vsliKGRCuEl4180215.shtml',
  '第一季|3': 'https://tv.cctv.com/2017/07/02/VIDEx18ZyhzTYexDbsPJBvxI170702.shtml',
  '第一季|4': 'https://tv.cctv.com/2018/02/15/VIDENUwNi7VcRQzJK4JbwxNZ180215.shtml',
  '第一季|5': 'https://tv.cctv.com/2018/02/15/VIDEsY88ZDZdQbvqoBIRdkSq180215.shtml',
  '第一季|6': 'https://tv.cctv.com/2018/02/15/VIDE60n0kWPz0hk3mUXbdQf2180215.shtml',
  '第一季|7': 'https://tv.cctv.com/2018/02/15/VIDEE2GwsPw3CFj2pwJLiHdP180215.shtml',
  '第二季|1': 'https://tv.cctv.com/2018/02/12/VIDEfRwKwKQU1SLLkN3MxjKr180212.shtml',
  '第二季|2': 'https://tv.cctv.com/2018/02/13/VIDErkI2n9NHI9Pl8JdYYVNC180213.shtml',
  '第二季|3': 'https://tv.cctv.com/2018/02/14/VIDEcg116qzPtkMYZu1rhCui180214.shtml',
  '第二季|4': 'https://tv.cctv.com/2018/02/15/VIDEogcsCliX7U6d7Kr5gC6A180215.shtml',
  '第二季|5': 'https://tv.cctv.com/2018/02/16/VIDEiEuzvbyDCOnyJFnsyFim180216.shtml',
  '第二季|6': 'https://tv.cctv.com/2018/02/16/VIDEAcEhgbK96lcPkLOCgjcM180216.shtml',
  '第二季|7': 'https://tv.cctv.com/2018/02/16/VIDEyxzwAa6TUTrjxku5sSQV180216.shtml',
  '第三季|1': 'https://tv.cctv.com/2025/05/13/VIDEiLcWk0RWquulISjqm9We250513.shtml',
  '第三季|2': 'https://tv.cctv.com/2025/05/13/VIDEl90boDS2j1kQpoGyRI31250513.shtml',
  '第三季|3': 'https://tv.cctv.com/2025/05/13/VIDETlqr8YXqz4q6oPC9NqHS250513.shtml',
  '第三季|4': 'https://tv.cctv.com/2025/05/13/VIDEmirEwHw9aMm3yg27lXeI250513.shtml',
  '第三季|5': 'https://tv.cctv.com/2025/05/13/VIDEgRJv4I2hoGJA3picVcmq250513.shtml',
  '第三季|6': 'https://tv.cctv.com/2025/05/13/VIDEs12QthynAUnCWOf685BH250513.shtml',
  '第三季|7': 'https://tv.cctv.com/2025/05/13/VIDEB2EkkTfasx1UE3tWBBcI250513.shtml',
  '第三季|8': 'https://tv.cctv.com/2025/05/13/VIDER7yHCeFlVULkdmuytlBZ250513.shtml',
  '第四季|1': 'https://tv.cctv.com/2025/07/14/VIDECAsDoy9uQWpgo6PufgoN250714.shtml',
  '第四季|2': 'https://tv.cctv.com/2025/02/04/VIDEMxDx1lS6kuOpbsXaTDUC250204.shtml',
  '第四季|3': 'https://tv.cctv.com/2025/02/05/VIDEZ4kVhxeIJ8bXUQv6I83f250205.shtml',
  '第四季|4': 'https://tv.cctv.com/2025/02/06/VIDEJpifeTWN2sbugmvtC7JL250206.shtml',
  '第四季|5': 'https://tv.cctv.com/2025/07/19/VIDEtSExtkkKiGaottzs6GzT250719.shtml',
  '第四季|6': 'https://tv.cctv.com/2025/02/08/VIDENyoDhD86mtl7aS5524BO250208.shtml',
  '第四季|7': 'https://tv.cctv.com/2025/07/22/VIDEl9ee0jmAj3ccbJTKTE0C250722.shtml',
};

// English-facing links prefer official or CCTV-affiliated uploads with English
// subtitles or an English audio track. Every URL is verified against its
// channel, season, and episode title before being added here.
const youtubeEpisodePages: Record<string, string> = {
  '第一季|1': 'https://www.youtube.com/watch?v=uMwrHiNtbmg',
  '第一季|2': 'https://www.youtube.com/watch?v=zHuecEXqXq0',
  '第一季|3': 'https://www.youtube.com/watch?v=jeLDqxIcfk0',
  '第一季|4': 'https://www.youtube.com/watch?v=YtrUsRZ6mp0',
  '第一季|5': 'https://www.youtube.com/watch?v=PreQN1KBYAw',
  '第一季|6': 'https://www.youtube.com/watch?v=XkhaqdLsdYQ',
  '第一季|7': 'https://www.youtube.com/watch?v=gPuO9isKHj4',
  '第二季|1': 'https://www.youtube.com/watch?v=mech5uaDfLE',
  '第二季|2': 'https://www.youtube.com/watch?v=2jdTfdttwx4',
  '第二季|3': 'https://www.youtube.com/watch?v=KQ3Yfh3NtvA',
  '第二季|4': 'https://www.youtube.com/watch?v=2GUSMJYvkVI',
  '第二季|5': 'https://www.youtube.com/watch?v=ZG54i-KevnQ',
  '第二季|6': 'https://www.youtube.com/watch?v=oyvjGa3nIgE',
  '第二季|7': 'https://www.youtube.com/watch?v=FymWj8Ue3SA',
  '第三季|1': 'https://www.youtube.com/watch?v=8LaZZfU3M5E',
  '第三季|2': 'https://www.youtube.com/watch?v=niOD9DIpopo',
  '第三季|3': 'https://www.youtube.com/watch?v=pjNy-ruUUYw',
  '第三季|4': 'https://www.youtube.com/watch?v=XHtat2dgYxY',
  '第三季|5': 'https://www.youtube.com/watch?v=t4NDdCtiXLo',
  '第三季|6': 'https://www.youtube.com/watch?v=nmaSpi1ea4g',
  '第三季|7': 'https://www.youtube.com/watch?v=AaYXOIFnOI4',
  '第三季|8': 'https://www.youtube.com/watch?v=NQAbUi-0mC0',
  '第四季|1': 'https://www.youtube.com/watch?v=ENIcXc8HH7Y',
  '第四季|2': 'https://www.youtube.com/watch?v=sVFPo833HoU',
  '第四季|3': 'https://www.youtube.com/watch?v=9PillIvA3vs',
  '第四季|4': 'https://www.youtube.com/watch?v=IdaPsExLQAs',
  '第四季|5': 'https://www.youtube.com/watch?v=wp-_K6TRnIw',
  '第四季|6': 'https://www.youtube.com/watch?v=a4WNcPzuLMc',
  '第四季|7': 'https://www.youtube.com/watch?v=a9USDnhvNSE',
};

export function getProgramLink(food: FoodItem, locale: Locale = 'zh'): ProgramLink | undefined {
  if (!food.season || !food.episode) return undefined;

  const episodeNumber = food.episode.match(/第(\d+)集/)?.[1];
  const pages = locale === 'en' ? youtubeEpisodePages : episodePages;
  const episodeUrl = episodeNumber ? pages[`${food.season}|${episodeNumber}`] : undefined;
  if (!episodeUrl) return undefined;

  return {
    url: episodeUrl,
    programTitle: `${localizeSeason(food.season, locale)} · ${localizeEpisode(food.episode, locale)}`,
  };
}
