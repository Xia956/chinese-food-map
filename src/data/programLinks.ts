import type { FoodItem } from '../types';

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

export function getProgramLink(food: FoodItem): ProgramLink | undefined {
  if (!food.season || !food.episode) return undefined;

  const episodeNumber = food.episode.match(/第(\d+)集/)?.[1];
  const episodeUrl = episodeNumber ? episodePages[`${food.season}|${episodeNumber}`] : undefined;
  if (!episodeUrl) return undefined;

  return {
    url: episodeUrl,
    programTitle: `${food.season} · ${food.episode}`,
  };
}
