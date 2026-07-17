import type { CityEntry, ProvinceEntry } from '../types';
import { foods } from './foods';

type ProvinceSeed = {
  name: string;
  region: string;
  intro: string;
  cities: Array<[string, number, number]>;
  foodIds?: string[];
};

const seeds: ProvinceSeed[] = [
  { name: '北京', region: '华北', intro: '古都与现代城市交叠，饮食里既有宫廷余韵，也有胡同烟火。', cities: [['北京', 116.4074, 39.9042]], foodIds: ['peking-duck'] },
  { name: '天津', region: '华北', intro: '河海相接的城市风味，早点与小吃尤其有辨识度。', cities: [['天津', 117.2009, 39.0842]] },
  { name: '河北', region: '华北', intro: '环绕京津，山海平原相连，饮食兼具农家与市镇气息。', cities: [['石家庄', 114.5149, 38.0428], ['保定', 115.4646, 38.8744], ['唐山', 118.1802, 39.6309]] },
  { name: '山西', region: '华北', intro: '面食、醋香与黄土高原的粮食记忆构成山西风味底色。', cities: [['太原', 112.5489, 37.8706], ['大同', 113.3001, 40.0768], ['运城', 111.0075, 35.0264]] },
  { name: '内蒙古', region: '华北', intro: '草原、农区与边贸城市并置，乳肉与谷物共同出现。', cities: [['呼和浩特', 111.7492, 40.8426], ['包头', 109.8403, 40.6574], ['赤峰', 118.8869, 42.2578]] },
  { name: '辽宁', region: '东北', intro: '海岸、平原与工业城市交织，风味爽利而厚实。', cities: [['沈阳', 123.4315, 41.8057], ['大连', 121.6147, 38.914], ['丹东', 124.3547, 40.0005]] },
  { name: '吉林', region: '东北', intro: '山林、黑土与寒地作物塑造出朴素扎实的餐桌。', cities: [['长春', 125.3235, 43.8171], ['吉林', 126.5494, 43.8378], ['延吉', 129.5089, 42.8913]] },
  { name: '黑龙江', region: '东北', intro: '黑土、江河与寒冷气候，让炖菜、粮食和山野味格外鲜明。', cities: [['哈尔滨', 126.5349, 45.8038], ['齐齐哈尔', 123.9579, 47.3421], ['牡丹江', 129.6332, 44.5517]] },
  { name: '上海', region: '华东', intro: '江南水网与近代都市相遇，点心、海派菜与市井小吃并存。', cities: [['上海', 121.4737, 31.2304]], foodIds: ['xiao-long-bao'] },
  { name: '江苏', region: '华东', intro: '湖河密布，城市风味细腻，甜、鲜、清雅各有层次。', cities: [['南京', 118.7969, 32.0603], ['苏州', 120.5853, 31.2989], ['扬州', 119.4129, 32.3942]] },
  { name: '浙江', region: '华东', intro: '山海湖田俱全，饮食讲究时令、清鲜与水乡气息。', cities: [['杭州', 120.1551, 30.2741], ['宁波', 121.5504, 29.8746], ['温州', 120.6994, 27.9949]] },
  { name: '安徽', region: '华东', intro: '江淮与徽州山地并立，发酵、腌制与山珍共同构成地方风味。', cities: [['合肥', 117.2272, 31.8206], ['黄山', 118.3375, 29.7147], ['芜湖', 118.4331, 31.3526]], foodIds: ['stinky-mandarin-fish'] },
  { name: '福建', region: '华东', intro: '山海之间，汤、茶、海味和侨乡饮食共同塑造闽味。', cities: [['福州', 119.2965, 26.0745], ['厦门', 118.0894, 24.4798], ['泉州', 118.6757, 24.8741]] },
  { name: '江西', region: '华东', intro: '湖泊、山地与稻作共同铺开，风味鲜辣而家常。', cities: [['南昌', 115.8582, 28.6829], ['景德镇', 117.1849, 29.2744], ['赣州', 114.9403, 25.8318]] },
  { name: '山东', region: '华东', intro: '半岛海味、齐鲁农耕与鲁菜传统，让味道厚重端正。', cities: [['济南', 117.1201, 36.6512], ['青岛', 120.3826, 36.0671], ['烟台', 121.4479, 37.4638]] },
  { name: '河南', region: '华中', intro: '中原粮仓的面食、汤食与市镇小吃，呈现出朴实宽厚的风味。', cities: [['郑州', 113.6254, 34.7466], ['洛阳', 112.454, 34.6197], ['开封', 114.3076, 34.7973]] },
  { name: '湖北', region: '华中', intro: '江汉平原与湖泊水网带来鱼米之味，早点文化也很丰盛。', cities: [['武汉', 114.3054, 30.5931], ['宜昌', 111.2865, 30.6919], ['襄阳', 112.1224, 32.009]] },
  { name: '湖南', region: '华中', intro: '山水与稻作之间，辣、酸、腊味构成鲜明的湘味表达。', cities: [['长沙', 112.9388, 28.2282], ['湘潭', 112.944, 27.8297], ['衡阳', 112.572, 26.8942]] },
  { name: '广东', region: '华南', intro: '岭南气候、海陆食材与茶楼传统，让清鲜与精细成为重要特征。', cities: [['广州', 113.2644, 23.1291], ['深圳', 114.0579, 22.5431], ['潮州', 116.6226, 23.6567]], foodIds: ['yum-cha'] },
  { name: '广西', region: '华南', intro: '山地、河谷与多民族生活交织，酸、鲜、米粉风味突出。', cities: [['南宁', 108.3669, 22.817], ['柳州', 109.4281, 24.3264], ['桂林', 110.2902, 25.2736]] },
  { name: '海南', region: '华南', intro: '岛屿气候带来椰香、海鲜与热带作物的明亮风味。', cities: [['海口', 110.1983, 20.044], ['三亚', 109.5119, 18.2528], ['文昌', 110.7977, 19.5433]] },
  { name: '重庆', region: '西南', intro: '山城江雾与码头生活，让麻辣、锅气和夜色餐桌格外鲜明。', cities: [['重庆', 106.5516, 29.563]], foodIds: ['sichuan-hotpot'] },
  { name: '四川', region: '西南', intro: '盆地物产丰饶，调味体系细密，麻辣之外也有复合而温润的层次。', cities: [['成都', 104.0665, 30.5723], ['乐山', 103.7656, 29.5521], ['自贡', 104.7784, 29.3392]], foodIds: ['sichuan-hotpot'] },
  { name: '贵州', region: '西南', intro: '山地、酸汤、发酵和辣味构成贵州餐桌独特的清亮劲道。', cities: [['贵阳', 106.6302, 26.6477], ['遵义', 106.9373, 27.7066], ['凯里', 107.981, 26.5669]] },
  { name: '云南', region: '西南', intro: '高原、雨林与多民族饮食并存，菌子、米线和香料都很有层次。', cities: [['昆明', 102.8329, 24.8801], ['大理', 100.2676, 25.6065], ['蒙自', 103.3649, 23.3962]], foodIds: ['crossing-bridge-noodles'] },
  { name: '西藏', region: '西南', intro: '高原环境让青稞、牦牛乳肉与茶共同构成日常饮食底色。', cities: [['拉萨', 91.1409, 29.6456], ['日喀则', 88.8851, 29.2675], ['林芝', 94.3615, 29.6489]] },
  { name: '陕西', region: '西北', intro: '关中平原与秦岭黄土相接，面食、小吃和香料气息浓厚。', cities: [['西安', 108.9398, 34.3416], ['宝鸡', 107.2377, 34.3619], ['延安', 109.4897, 36.5853]], foodIds: ['roujiamo'] },
  { name: '甘肃', region: '西北', intro: '河西走廊串起农牧与商旅，面、羊肉和香料构成开阔味道。', cities: [['兰州', 103.8343, 36.0611], ['敦煌', 94.6619, 40.1421], ['天水', 105.7249, 34.5809]] },
  { name: '青海', region: '西北', intro: '高原湖泊与牧区生活塑造出清冽、朴素而厚实的餐桌。', cities: [['西宁', 101.7782, 36.6171], ['海东', 102.1033, 36.5029], ['格尔木', 94.9281, 36.4067]] },
  { name: '宁夏', region: '西北', intro: '黄河灌区与西北风土交汇，羊肉、粮食和枸杞常入餐桌。', cities: [['银川', 106.2309, 38.4872], ['吴忠', 106.1986, 37.9978], ['中卫', 105.1968, 37.5002]] },
  { name: '新疆', region: '西北', intro: '绿洲、牧区与丝路城市交织，麦香、肉香和香料气息明朗。', cities: [['乌鲁木齐', 87.6168, 43.8256], ['喀什', 75.9898, 39.4704], ['伊宁', 81.2777, 43.908]], foodIds: ['dapanji'] },
  { name: '台湾', region: '港澳台', intro: '海岛、山地与城市夜市共同形成多元而细密的风味。', cities: [['台北', 121.5654, 25.033], ['台中', 120.6736, 24.1477], ['台南', 120.227, 22.9999]] },
  { name: '香港', region: '港澳台', intro: '港口城市的快节奏与茶餐厅、烧味、点心共同构成独特日常。', cities: [['香港', 114.1694, 22.3193]] },
  { name: '澳门', region: '港澳台', intro: '中西饮食长期相遇，街巷小吃与葡式风味互为映照。', cities: [['澳门', 113.5439, 22.1987]] },
];

const knownFoodIds = new Set(foods.map((food) => food.id));

export const provinces: ProvinceEntry[] = seeds.map((seed) => {
  const seededFoodIds = (seed.foodIds ?? []).filter((id) => knownFoodIds.has(id));
  const collectedFoodIds = foods.filter((food) => food.province === seed.name).map((food) => food.id);

  return {
    id: seed.name,
    name: seed.name,
    mapName: seed.name,
    region: seed.region,
    intro: seed.intro,
    cityIds: seed.cities.map(([name]) => `${seed.name}-${name}`),
    foodIds: Array.from(new Set([...seededFoodIds, ...collectedFoodIds])),
  };
});

export const cities: CityEntry[] = seeds.flatMap((seed) =>
  seed.cities.map(([name, longitude, latitude]) => ({
    id: `${seed.name}-${name}`,
    name,
    province: seed.name,
    longitude,
    latitude,
    foodIds: foods.filter((food) => food.province === seed.name && (food.city === name || food.city.includes(name))).map((food) => food.id),
  })),
);

export const provinceByMapName = new Map(provinces.map((province) => [province.mapName, province]));
export const cityById = new Map(cities.map((city) => [city.id, city]));
