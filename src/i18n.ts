import type { FoodItem, ProvinceEntry } from './types';

export type Locale = 'zh' | 'en';

export const localePath = (locale: Locale) => `/${locale}`;

export const getLocaleFromPath = (pathname: string): Locale => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh');

export const ui = {
  zh: {
    siteProgram: '《舌尖上的中国》',
    siteSuffix: '美食地图',
    languageLabel: '语言',
    languageName: 'English',
    returnNational: '返回全国',
    playingMusic: '正在播放琵琶风格配乐《中式餐叙背景曲 5》',
    clickForMusic: '点击页面后即可播放背景音乐',
    musicMuted: '背景音乐已静音',
    musicUnavailable: '浏览器暂时无法播放背景音乐，请稍后重试',
    muteMusic: '静音背景音乐',
    playMusic: '播放背景音乐',
    dataSheet: '资料表',
    allEntries: '全部美食条目',
    provinceEntries: (province: string) => `${province}美食条目`,
    results: (count: number) => `${count} 条结果`,
    collected: (count: number) => `共收录 ${count} 条`,
    hideFilters: '收起筛选',
    filters: '筛选',
    filterLabel: '美食资料筛选',
    keyword: '关键词',
    searchPlaceholder: '莲藕 / 云南 / 第1集',
    province: '省份',
    season: '季数',
    category: '类别',
    all: '全部',
    allProvinces: '全部省份',
    allSeasons: '全部季数',
    allCategories: '全部类别',
    selectFilters: '选择筛选条件后，将显示匹配的美食条目。',
    name: '名称',
    location: '地点',
    program: '节目',
    ingredients: '主要食材',
    viewDetails: (name: string) => `查看${name}详情`,
    noImage: '暂无图片',
    noMatches: '未找到匹配条目',
    emptyHint: '可以清空关键词，或切换省份、季数和类别。',
    shown: (shown: number, total: number) => `已展示 ${shown} / ${total} 条`,
    collapseEntries: '收起条目',
    loadMore: '加载更多',
    optionLabel: (label: string) => `${label}选项`,
  },
  en: {
    siteProgram: 'A Bite of China',
    siteSuffix: 'Food Map',
    languageLabel: 'Language',
    languageName: '中文',
    returnNational: 'Back to China',
    playingMusic: 'Playing "Chinese Restaurant Background 5," a pipa-inspired track',
    clickForMusic: 'Interact with the page to start the background music',
    musicMuted: 'Background music muted',
    musicUnavailable: 'Background music is temporarily unavailable. Please try again.',
    muteMusic: 'Mute background music',
    playMusic: 'Play background music',
    dataSheet: 'Archive',
    allEntries: 'All food entries',
    provinceEntries: (province: string) => `Food from ${province}`,
    results: (count: number) => `${count} results`,
    collected: (count: number) => `${count} entries in total`,
    hideFilters: 'Hide filters',
    filters: 'Filters',
    filterLabel: 'Food archive filters',
    keyword: 'Search',
    searchPlaceholder: 'lotus root / Yunnan / Episode 1',
    province: 'Province',
    season: 'Season',
    category: 'Category',
    all: 'All',
    allProvinces: 'All provinces',
    allSeasons: 'All seasons',
    allCategories: 'All categories',
    selectFilters: 'Choose a filter to display matching food entries.',
    name: 'Name',
    location: 'Location',
    program: 'Program',
    ingredients: 'Main ingredients',
    viewDetails: (name: string) => `View details for ${name}`,
    noImage: 'Image unavailable',
    noMatches: 'No matching entries',
    emptyHint: 'Clear the search or change the province, season, or category.',
    shown: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    collapseEntries: 'Show fewer',
    loadMore: 'Load more',
    optionLabel: (label: string) => `${label} options`,
  },
} as const;

const provinceNames: Record<string, string> = {
  北京: 'Beijing', 天津: 'Tianjin', 河北: 'Hebei', 山西: 'Shanxi', 内蒙古: 'Inner Mongolia', 辽宁: 'Liaoning',
  吉林: 'Jilin', 黑龙江: 'Heilongjiang', 上海: 'Shanghai', 江苏: 'Jiangsu', 浙江: 'Zhejiang', 安徽: 'Anhui',
  福建: 'Fujian', 江西: 'Jiangxi', 山东: 'Shandong', 河南: 'Henan', 湖北: 'Hubei', 湖南: 'Hunan', 广东: 'Guangdong',
  广西: 'Guangxi', 海南: 'Hainan', 重庆: 'Chongqing', 四川: 'Sichuan', 贵州: 'Guizhou', 云南: 'Yunnan', 西藏: 'Tibet',
  陕西: 'Shaanxi', 甘肃: 'Gansu', 青海: 'Qinghai', 宁夏: 'Ningxia', 新疆: 'Xinjiang', 台湾: 'Taiwan', 香港: 'Hong Kong',
  澳门: 'Macao', 待核实: 'Location pending verification',
};

const provinceIntros: Record<string, string> = {
  北京: 'Imperial traditions and neighborhood cooking meet in the capital.',
  天津: 'River and sea influences shape distinctive breakfasts and street snacks.',
  河北: 'Mountains, coast, and plains bring together rural and market-town cooking.',
  山西: 'Wheat foods, aged vinegar, and plateau agriculture shape the table.',
  内蒙古: 'Pastoral and farming traditions bring dairy, meat, and grains together.',
  辽宁: 'Coastal produce and hearty northeastern cooking meet across the province.',
  吉林: 'Forests, black-soil farms, and cold-climate crops shape a substantial table.',
  黑龙江: 'Black-soil agriculture, rivers, and long winters favor grain, fish, and slow cooking.',
  上海: "Jiangnan ingredients meet a modern city's pastries, seafood, and everyday cooking.",
  江苏: 'Lakes and waterways support subtle flavors, refined techniques, and seasonal cooking.',
  浙江: 'Mountains, coast, and lake country bring seasonal produce and fresh, restrained flavors.',
  安徽: 'Huizhou mountain foods meet Jianghuai fermentation, curing, and local produce.',
  福建: 'Mountain and coastal ingredients meet soups, tea, seafood, and diaspora influences.',
  江西: 'Rice-growing landscapes, lakes, and mountains support fresh, lively flavors.',
  山东: "Peninsula seafood and agricultural traditions underpin one of China's major cuisines.",
  河南: 'Central Plain grains appear in noodles, soups, and market-town snacks.',
  湖北: 'Lakes and the Jianghan Plain bring fish, rice, lotus root, and breakfast culture.',
  湖南: 'Rice-growing landscapes support sour, spicy, smoked, and preserved flavors.',
  广东: 'Coastal and inland ingredients meet tea-house cooking and precise, fresh flavors.',
  广西: 'River valleys and varied local traditions meet in sour flavors and rice noodles.',
  海南: 'Island produce brings seafood, coconut, and tropical crops to the table.',
  重庆: 'A steep river city shaped by hot pots, bold aromatics, and late-night meals.',
  四川: 'Abundant produce and intricate seasoning create far more than heat alone.',
  贵州: 'Mountain foodways use fermentation, sour broths, chilies, and rice in distinctive ways.',
  云南: 'Highlands and tropical forests support mushrooms, rice noodles, herbs, and varied local traditions.',
  西藏: 'High-altitude life centers daily food around barley, dairy, meat, and tea.',
  陕西: 'The Guanzhong Plain, Qinling Mountains, and Loess Plateau meet in wheat foods and snacks.',
  甘肃: 'The Hexi Corridor carries farming, pastoral, and trading traditions through noodles and lamb.',
  青海: 'Highland lakes and pastoral life shape a clear, substantial table.',
  宁夏: 'Yellow River agriculture meets northwestern lamb, grains, and goji berries.',
  新疆: 'Oases, pastoral lands, and Silk Road cities bring wheat, meat, fruit, and spices together.',
  台湾: 'Island, mountain, and city traditions meet in seafood, rice, tea, and night-market cooking.',
  香港: "A port city's pace meets dim sum, roast meats, cafés, and home cooking.",
  澳门: 'Chinese and Portuguese foodways meet across bakeries, cafés, and neighborhood kitchens.',
};

const cityNames: Record<string, string> = {
  北京: 'Beijing', 天津: 'Tianjin', 石家庄: 'Shijiazhuang', 保定: 'Baoding', 唐山: 'Tangshan', 太原: 'Taiyuan',
  大同: 'Datong', 运城: 'Yuncheng', 呼和浩特: 'Hohhot', 包头: 'Baotou', 赤峰: 'Chifeng', 沈阳: 'Shenyang', 大连: 'Dalian',
  丹东: 'Dandong', 长春: 'Changchun', 吉林: 'Jilin', 延吉: 'Yanji', 哈尔滨: 'Harbin', 齐齐哈尔: 'Qiqihar', 牡丹江: 'Mudanjiang',
  上海: 'Shanghai', 南京: 'Nanjing', 苏州: 'Suzhou', 扬州: 'Yangzhou', 杭州: 'Hangzhou', 宁波: 'Ningbo', 温州: 'Wenzhou',
  合肥: 'Hefei', 黄山: 'Huangshan', 芜湖: 'Wuhu', 福州: 'Fuzhou', 厦门: 'Xiamen', 泉州: 'Quanzhou', 南昌: 'Nanchang',
  景德镇: 'Jingdezhen', 赣州: 'Ganzhou', 济南: 'Jinan', 青岛: 'Qingdao', 烟台: 'Yantai', 郑州: 'Zhengzhou', 洛阳: 'Luoyang',
  开封: 'Kaifeng', 武汉: 'Wuhan', 宜昌: 'Yichang', 襄阳: 'Xiangyang', 长沙: 'Changsha', 湘潭: 'Xiangtan', 衡阳: 'Hengyang',
  广州: 'Guangzhou', 深圳: 'Shenzhen', 潮州: 'Chaozhou', 南宁: 'Nanning', 柳州: 'Liuzhou', 桂林: 'Guilin', 海口: 'Haikou',
  三亚: 'Sanya', 文昌: 'Wenchang', 重庆: 'Chongqing', 成都: 'Chengdu', 乐山: 'Leshan', 自贡: 'Zigong', 贵阳: 'Guiyang',
  遵义: 'Zunyi', 凯里: 'Kaili', 昆明: 'Kunming', 大理: 'Dali', 蒙自: 'Mengzi', 拉萨: 'Lhasa', 日喀则: 'Shigatse',
  林芝: 'Nyingchi', 西安: "Xi'an", 宝鸡: 'Baoji', 延安: "Yan'an", 兰州: 'Lanzhou', 敦煌: 'Dunhuang', 天水: 'Tianshui',
  西宁: 'Xining', 海东: 'Haidong', 格尔木: 'Golmud', 银川: 'Yinchuan', 吴忠: 'Wuzhong', 中卫: 'Zhongwei',
  乌鲁木齐: 'Urumqi', 喀什: 'Kashgar', 伊宁: 'Yining', 台北: 'Taipei', 台中: 'Taichung', 台南: 'Tainan',
  香港: 'Hong Kong', 澳门: 'Macao', 待核实: 'Pending verification',
};

const regionNames: Record<string, string> = {
  华北: 'North China', 东北: 'Northeast China', 华东: 'East China', 华中: 'Central China', 华南: 'South China',
  西南: 'Southwest China', 西北: 'Northwest China', 港澳台: 'Hong Kong, Macao and Taiwan', 待核实: 'Pending verification',
};

const categoryNames: Record<string, string> = {
  水产海鲜: 'Seafood', 肉禽: 'Meat and poultry', 主食点心: 'Staples and dim sum', 发酵腌制: 'Fermented and preserved foods',
  锅物: 'Hot pots', 宴饮: 'Banquets and feasts', 蔬果山珍: 'Produce and mountain foods', 饮品: 'Drinks', 调味品: 'Condiments',
  甜品: 'Desserts', 小吃: 'Snacks', 待核实: 'Pending verification',
  小吃与食材: 'Snacks and ingredients',
};

const ingredientNames: Record<string, string> = {
  鱼肉: 'fish', 鱼: 'fish', 虾: 'shrimp', 蟹: 'crab', 海蜇: 'jellyfish', 羊肉: 'lamb', 牛肉: 'beef', 猪肉: 'pork',
  鸡肉: 'chicken', 鸭肉: 'duck', 鹅肉: 'goose', 小麦面粉: 'wheat flour', 大米或糯米: 'rice or glutinous rice', 黄豆: 'soybeans',
  竹笋: 'bamboo shoots', 莲藕: 'lotus root', 食用菌: 'edible mushrooms', 芋头: 'taro', 柿子: 'persimmon', 时令蔬菜: 'seasonal vegetables',
  大米: 'rice', 糯米: 'glutinous rice', 鸡蛋: 'egg', 辣椒: 'chili', 食盐: 'salt', 酱油: 'soy sauce', 高汤: 'stock',
  淀粉: 'starch', 芝麻: 'sesame', 芝麻酱: 'sesame paste', 花椒: 'Sichuan peppercorn', 香辛料: 'spices', 待核实: 'Pending verification',
};

const ingredientTerms: Record<string, string> = {
  鲅鱼肉: 'Spanish mackerel', 白菜: 'napa cabbage', 白萝卜: 'daikon', 薄脆: 'crisp fried cracker', 贝类: 'shellfish',
  荸荠: 'water chestnuts', 水生蔬食: 'aquatic vegetables', 蚕豆: 'broad beans', 草鱼: 'grass carp', 茶叶: 'tea leaves', 茶: 'tea',
  陈皮: 'dried tangerine peel', 葱姜蒜: 'scallion, ginger and garlic', 葱姜: 'scallion and ginger', 大葱: 'scallion',
  葱: 'scallion', 姜汁: 'ginger juice', 姜蒜: 'ginger and garlic', 姜葱: 'ginger and scallion', 姜: 'ginger', 蒜: 'garlic',
  甜面酱: 'sweet bean sauce', 香醋: 'aromatic vinegar', 醋: 'vinegar', 香油: 'sesame oil', 大豆: 'soybeans',
  大米米粉: 'rice flour', 大米: 'rice', 稻米: 'rice', 淡水鱼: 'freshwater fish', 帝王蟹: 'king crab', 冬笋: 'winter bamboo shoots',
  豆瓣酱: 'chili bean paste', 豆粉: 'bean flour', 豆腐干: 'dried tofu', 豆腐皮: 'tofu skin', 豆腐渣: 'soy pulp',
  豆腐: 'tofu', 豆制品: 'soy products', 广式点心: 'Cantonese dim sum', 食用菌: 'edible mushrooms', 菌菇: 'mushrooms',
  时令蔬菜: 'seasonal vegetables', 蔬菜: 'vegetables', 时蔬: 'seasonal vegetables', 发酵卤水: 'fermented brine',
  发酵酸汤: 'fermented sour broth', 腌酸食物: 'pickled sour foods', 番茄: 'tomato', 酸味果蔬: 'tart fruit or vegetables',
  粉葛: 'kudzu root', 粉丝: 'glass noodles', 蜂蜜: 'honey', 复合酱料: 'mixed sauce', 甘蔗渣: 'sugarcane fiber',
  柑橘果皮: 'citrus peel', 高汤: 'stock', 酱汁: 'sauce', 枸杞: 'goji berries', 瓜类: 'gourds', 鲑鱼: 'salmon',
  鳜鱼: 'mandarin fish', 海参: 'sea cucumber', 海鲜: 'seafood', 海味: 'dried seafood', 内脏配料: 'offal', 海鱼: 'sea fish',
  海蜇: 'jellyfish', 禾花鱼: 'rice-paddy fish', 河虾: 'river shrimp', 河蟹: 'river crab', 荷叶: 'lotus leaves',
  藕带: 'lotus stems', 红豆: 'red beans', 红曲霉: 'red yeast mold', 红曲: 'red yeast rice', 红糖: 'brown sugar', 红枣: 'red dates',
  胡椒: 'pepper', 胡萝卜: 'carrot', 洋葱: 'onion', 花椒: 'Sichuan peppercorn', 花生酱: 'peanut paste',
  芝麻酱: 'sesame paste', 花生: 'peanuts', 黄豆: 'soybeans', 黄喉: 'beef aorta', 黄酒: 'rice wine', 黄鳝: 'swamp eel',
  火锅汤底: 'hot-pot broth', 火腿: 'ham', 猪网油: 'caul fat', 虾仁: 'shrimp', 鸡蛋: 'egg', 鸭蛋: 'duck egg',
  鸡汤: 'chicken stock', 鸡胸肉: 'chicken breast', 鸡肉: 'chicken', 鸡鸭: 'chicken and duck', 茄子: 'eggplant',
  坚果: 'nuts', 碱水面: 'alkaline noodles', 江鱼: 'river fish', 茭白: 'water bamboo', 胶质汤冻: 'gelatin-rich aspic',
  酒曲: 'fermentation starter', 酒糟: 'fermented rice lees', 蕨根粉: 'fern-root flour', 蕨根淀粉: 'fern-root starch',
  腊味: 'cured meats', 腊鱼: 'cured fish', 辣椒油: 'chili oil', 辣椒: 'chili', 豆豉: 'fermented black beans', 梨: 'pear',
  莲藕: 'lotus root', 莲子: 'lotus seeds', 鲈鱼: 'perch', 卤汁: 'braising liquid', 绿豆面: 'mung-bean flour',
  杂粮面糊: 'multigrain batter', 萝卜: 'radish', 螺蛳汤: 'river-snail broth', 马铃薯: 'potato', 土豆: 'potato', 麦麸: 'wheat bran',
  麦曲: 'wheat fermentation starter', 酒药: 'fermentation starter', 麦芽糖: 'maltose', 白糖: 'sugar', 毛霉菌种: 'mucor culture',
  梅子: 'plum', 橘皮: 'tangerine peel', 糜子面: 'broomcorn millet flour', 米饭: 'cooked rice', 米粉: 'rice flour or noodles',
  米酒: 'rice wine', 谷物酒: 'grain wine', 米面薄皮: 'thin rice or wheat wrappers', 面粉: 'wheat flour', 面筋: 'wheat gluten',
  面片: 'noodle sheets', 面线: 'fine wheat noodles', 蘑菇: 'mushrooms', 牡蒿: 'mugwort', 牡蛎: 'oysters', 木耳: 'wood ear mushrooms',
  奶汤: 'milk broth', 凝固剂: 'coagulant', 牛骨汤: 'beef-bone broth', 清汤: 'clear broth', 牛奶: 'milk', 羊奶: 'goat milk',
  牛肉末: 'minced beef', 猪肉末: 'minced pork', 牛肉: 'beef', 牛杂: 'beef offal', 牛羊肉: 'beef and lamb',
  糯米粉: 'glutinous rice flour', 糯米: 'glutinous rice', 黍米: 'broomcorn millet', 藕粉: 'lotus-root starch', 泡菜: 'pickles',
  泡椒: 'pickled chilies', 皮冻: 'aspic', 蒲菜: 'cattail shoots', 青菜: 'leafy greens', 芥菜: 'mustard greens', 青稞: 'highland barley',
  肉浇头: 'meat topping', 肉汤: 'meat broth', 配菜: 'accompaniments', 肉馅: 'meat filling', 调味料: 'seasonings',
  素馅: 'vegetable filling', 甜馅: 'sweet filling', 咸馅: 'savory filling', 肉类: 'meat', 禽类: 'poultry',
  沙茶酱: 'Chinese barbecue sauce', 虱目鱼腹: 'milkfish belly', 石花菜: 'red algae', 食盐: 'salt', 盐水: 'brine', 食用油: 'cooking oil',
  鲥鱼: 'hilsa shad', 柿子: 'persimmon', 薯粉: 'sweet-potato starch', 松茸: 'matsutake mushrooms', 酥油: 'yak butter',
  酸辣蘸水: 'sour-and-spicy dipping sauce', 蘸水: 'dipping sauce', 酸笋: 'sour bamboo shoots', 糖醋酱汁: 'sweet-and-sour sauce',
  糖醋: 'sugar and vinegar', 糖浆: 'syrup', 糖水: 'sweet syrup', 糖: 'sugar', 藤椒: 'green Sichuan peppercorn',
  天然果蔬汁: 'natural fruit and vegetable juices', 豌豆粉: 'pea flour', 西瓜: 'watermelon', 虾蟹: 'shrimp and crab', 虾子: 'shrimp roe',
  小虾: 'small shrimp', 虾: 'shrimp', 鲜花椒: 'fresh Sichuan peppercorn', 鲜鱼: 'fresh fish', 香草: 'herbs', 香菇: 'shiitake mushrooms',
  香辛料: 'spices', 香橼: 'citron', 小黄鱼: 'small yellow croaker', 小麦面粉: 'wheat flour', 小麦面饼: 'wheat flatbread',
  小麦面皮: 'wheat wrappers', 小麦面条: 'wheat noodles', 小麦面: 'wheat noodles', 荞麦面: 'buckwheat noodles', 小麦: 'wheat',
  蟹黄: 'crab roe', 蟹粉: 'crab meat and roe', 蟹肉: 'crab meat', 新米: 'newly harvested rice', 鸭肠: 'duck intestines', 鸭肉: 'duck',
  羊骨汤: 'lamb-bone broth', 羊胎盘: 'lamb placenta', 羊肉: 'lamb', 马肉: 'horse meat', 药食材料: 'culinary medicinal ingredients',
  油酥: 'shortening', 油脂: 'fat', 鱼肉: 'fish', 鱼: 'fish', 芋头面: 'taro noodles', 芋头: 'taro', 芝麻: 'sesame',
  植物染色原料: 'plant-based colorings', 猪大肠: 'pork intestine', 猪后腿: 'pork leg', 猪排骨: 'pork ribs', 猪肉臊子: 'minced pork sauce',
  猪肉馅: 'pork filling', 猪五花肉: 'pork belly', 猪腰: 'pork kidney', 猪肉: 'pork', 砖茶: 'brick tea', 鲻鱼卵: 'mullet roe',
  紫菜: 'nori seaweed', 粽叶: 'wrapping leaves', 佐酒小菜: 'small dishes served with alcohol',
  藕: 'lotus root', 笋: 'bamboo shoots', 时令肉蔬: 'seasonal meat and vegetables', 杂粮面粉: 'multigrain flour',
  酱油: 'soy sauce', 时令食材: 'seasonal ingredients', 禽肉: 'poultry', 糯米馅: 'glutinous rice filling',
};

const flavorByCategory: Record<string, string> = {
  水产海鲜: 'Fresh marine or river flavors, with textures ranging from tender to springy and a naturally sweet finish.',
  肉禽: "Savory meat flavors and a full texture shaped by the dish's cooking method and seasoning.",
  主食点心: 'Gentle grain aromas with chewy, soft, crisp, or glutinous textures, complemented by fillings or broth.',
  发酵腌制: 'Fermentation or curing concentrates the savory character and may add acidity, aged aromas, or a lingering depth.',
  锅物: "A warming broth brings together the ingredients' natural flavors and becomes deeper as they cook.",
  宴饮: 'A composed feast with multiple dishes, moving between fresh, rich, crisp, tender, and aromatic notes.',
  蔬果山珍: 'Fresh plant aromas and natural sweetness, with textures that may be crisp, tender, or softly starchy.',
};

const titleCase = (value: string) => value.replace(/\b\w/g, (letter) => letter.toUpperCase());

const foodNameOverrides: Record<string, string> = {
  'anhui-crab-roe-wang-tofu': 'Crab Roe Tofu Stew',
  'anhui-daobanxiang-ham': 'Cutting-Board-Aged Ham',
  'anhui-huizhou-yuting-cake': 'Sweet Glutinous Rice Cake',
  'beijing-sachima': 'Crispy Syrup Pastry',
  'chongqing-huanghou': 'Beef Aorta for Hot Pot',
  'chongqing-xiaomian': 'Chongqing Spicy Noodles',
  'fujian-quanzhou-mianxianhu': 'Fine Noodle Soup',
  'fujian-quanzhou-shihua-jelly': 'Seaweed Jelly',
  'fujian-shaxian-shaomai': 'Shumai',
  'fujian-xiamen-fengrou': 'Slow-Braised Pork Parcel',
  'fujian-xiamen-shacha-braised-beef': 'Braised Beef with Chinese Barbecue Sauce',
  'guangdong-fenge-steamed-pork': 'Steamed Pork with Kudzu Root',
  'guangdong-hakka-poon-choi': 'Hakka Basin Feast',
  'guangdong-jook-sing-noodles': 'Bamboo-Pole Noodles',
  'guangdong-morning-tea': 'Cantonese Dim Sum Breakfast',
  'guangdong-wonton-lo-mein': 'Tossed Wonton Noodles',
  'guangdong-xinhui-chenpi': 'Xinhui Dried Tangerine Peel',
  'guangxi-liuzhou-luosifen': 'Liuzhou River-Snail Rice Noodles',
  'guizhou-guiyang-siwawa': 'Guiyang Vegetable Wraps',
  'guizhou-qiandongnan-niudongchun': 'Qiandongnan Beef Aspic',
  'henan-hulatang': 'Peppery Breakfast Soup',
  'hunan-fern-root-ciba': 'Fern-Root Glutinous Rice Cakes',
  'hunan-jingzhou-larou': 'Jingzhou Cured Pork',
  'hunan-yan-hehua-fish': 'Pickled Rice-Paddy Fish',
  'jiangsu-huaian-pucai-dumplings': "Huai'an Cattail-Shoot Dumplings",
  'jiangsu-wuxi-crab-xiaolongbao': 'Wuxi Crab Soup Dumplings',
  'jiangsu-yangzhou-baozi': 'Yangzhou Steamed Buns',
  'jiangsu-yangzhou-dazhu-gansi': 'Yangzhou Braised Shredded Tofu',
  'jiangsu-yangzhou-fangbaotai': 'Imitation Leopard Fetus',
  'jiangsu-yangzhou-lion-head': 'Yangzhou Braised Pork Meatballs',
  'jiangsu-yangzhou-wensi-tofu': 'Yangzhou Shredded Tofu Soup',
  'jiangxi-jiucengpi': 'Nine-Layer Rice Cake',
  'jiangxi-lushan-zuanlin-huanxi-balls': 'Lushan Savory Celebration Balls',
  'jiangxi-taihe-zaojiu': 'Taihe Breakfast Rice Wine',
  'macau-chenpi-duck': 'Macao Duck with Dried Tangerine Peel',
  'macau-chenpi-red-bean-soup': 'Red Bean Soup with Dried Tangerine Peel',
  'shaanxi-hanzhong-mianpi': 'Hanzhong Steamed Rice Noodles',
  'shaanxi-huangmomo': 'Yellow Steamed Buns',
  'shaanxi-paomo': 'Lamb Soup with Torn Flatbread',
  'shaanxi-roujiamo': 'Meat-Filled Flatbread',
  'shaanxi-saozi-noodles': 'Noodles with Minced Meat Sauce',
  'shaanxi-xian-jinji-yukuai': 'Fine-Cut Fish with Golden Relish',
  'shaanxi-xian-linglong-peony-zha': 'Peony-Shaped Fermented Fish',
  'shandong-jinan-milk-soup-pucai': 'Jinan Milk Broth with Cattail Shoots',
  'shandong-jiuzhuan-intestine': 'Nine-Turn Braised Pork Intestine',
  'shandong-jiaozhou-thrown-noodles': 'Jiaozhou Hand-Slung Noodles',
  'shandong-pancake-scallion': 'Shandong Pancake with Scallion',
  'shanghai-kou-san-si': 'Shanghai Steamed Three Shreds',
  'shanxi-hele-noodles': 'Shanxi Pressed Noodles',
  'shanxi-zaohua-mo': 'Jujube-Flower Steamed Buns',
  'sichuan-doubanjiang': 'Sichuan Chili Bean Paste',
  'sichuan-leshan-douhua': 'Leshan Tofu Pudding',
  'sichuan-leshan-lianggao': 'Leshan Chilled Rice Cake',
  'sichuan-mapo-tofu': 'Sichuan Spicy Tofu with Minced Meat',
  'sichuan-paocai': 'Sichuan Pickles',
  'sichuan-tuotuorou': 'Yi-Style Pork Chunks',
  'sichuan-yibin-ranmian': 'Yibin Burning Noodles',
  'sichuan-yuxiang-shredded-pork': 'Fish-Fragrant Shredded Pork',
  'taiwan-lu-rou-rice': 'Taiwanese Braised Pork Rice',
  'tianjin-flaky-shaobing': 'Tianjin Flaky Sesame Flatbread',
  'tianjin-guifei-pastry': 'Imperial Consort Pastry',
  'tianjin-jianbing-guozi': 'Tianjin Breakfast Crepe with Crisp Fritter',
  'xinjiang-dapanji': 'Xinjiang Big-Plate Chicken',
  'xinjiang-hetian-maren-tang': 'Hotan Nut Brittle',
  'xinjiang-hetian-qiegao': 'Hotan Nut-and-Fruit Glutinous Rice Cake',
  'xinjiang-kuqa-nang': 'Kuqa Baked Flatbread',
  'xinjiang-latiaozi': 'Xinjiang Hand-Pulled Noodles',
  'xinjiang-naren': 'Xinjiang Lamb and Noodles',
  'yunnan-buckled-eggplant-flower': 'Yunnan Braised Eggplant Flower',
  'yunnan-nammi-sauce': 'Yunnan Dai-Style Dipping Sauce',
  'yunnan-qiguo-chicken': 'Yunnan Steam-Pot Chicken',
  'yunnan-songrong': 'Yunnan Matsutake Mushrooms',
  'zhejiang-jiaxing-zongzi': 'Jiaxing Leaf-Wrapped Glutinous Rice Dumplings',
  'zhejiang-ningbo-niangao': 'Ningbo Rice Cakes',
  'zhejiang-shaoxing-huangjiu': 'Shaoxing Rice Wine',
};

const provinceFilePrefixes = [
  'inner-mongolia-', 'heilongjiang-', 'hongkong-', 'chongqing-', 'guangdong-', 'guangxi-', 'guizhou-', 'liaoning-',
  'shaanxi-', 'shandong-', 'shanghai-', 'sichuan-', 'xinjiang-', 'zhejiang-', 'anhui-', 'beijing-', 'fujian-', 'gansu-',
  'hainan-', 'hebei-', 'henan-', 'hubei-', 'hunan-', 'jiangsu-', 'jiangxi-', 'jilin-', 'macau-', 'ningxia-', 'shanxi-',
  'taiwan-', 'tianjin-', 'tibet-', 'yunnan-',
];

const englishNameFromImage = (food: FoodItem) => {
  const filename = food.image?.url.split('/').pop()?.split('?')[0]?.replace(/\.[^.]+$/, '');
  if (!filename) return 'Name pending translation';
  const normalizedFilename = filename.replace(/-(v\d+|image)$/i, '');
  const translatedName = foodNameOverrides[normalizedFilename];
  if (translatedName) return translatedName;
  const dishSlug = provinceFilePrefixes.reduce(
    (current, prefix) => (current.startsWith(prefix) ? current.slice(prefix.length) : current),
    normalizedFilename,
  );
  return titleCase(dishSlug.replace(/-/g, ' '));
};

export const localizeProvince = (name: string, locale: Locale) => (locale === 'zh' ? name : provinceNames[name] ?? 'Province pending translation');
export const localizeCity = (name: string, locale: Locale) => (locale === 'zh' ? name : cityNames[name] ?? 'Place pending translation');
export const localizeRegion = (name: string, locale: Locale) => (locale === 'zh' ? name : regionNames[name] ?? 'Region pending translation');
export const localizeCategory = (name: string, locale: Locale) => (locale === 'zh' ? name : categoryNames[name] ?? 'Category pending translation');

export const localizeSeason = (season: string | undefined, locale: Locale) => {
  if (!season || locale === 'zh') return season;
  const values: Record<string, string> = { 第一季: 'Season 1', 第二季: 'Season 2', 第三季: 'Season 3', 第四季: 'Season 4' };
  return values[season] ?? 'Season pending verification';
};

export const localizeEpisode = (episode: string | undefined, locale: Locale) => {
  if (!episode || locale === 'zh') return episode;
  const number = episode.match(/第(\d+)集/)?.[1];
  return number ? `Episode ${number}` : 'Episode pending verification';
};

const localizeIngredient = (ingredient: string) => {
  if (ingredientNames[ingredient]) return ingredientNames[ingredient];
  let translated = ingredient;
  Object.entries(ingredientTerms)
    .sort(([left], [right]) => right.length - left.length)
    .forEach(([source, target]) => {
      translated = translated.split(source).join(target);
    });
  translated = translated
    .split('多种').join('assorted ')
    .split('等').join(' and other ')
    .split('与').join(' and ')
    .split('或').join(' or ')
    .split('、').join(', ')
    .replace(/\s+/g, ' ')
    .trim();
  return /[\u3400-\u9fff]/.test(translated) ? 'Ingredient details pending translation' : translated;
};

export const localizeFood = (food: FoodItem, locale: Locale): FoodItem => {
  if (locale === 'zh') return food;
  const name = englishNameFromImage(food);
  return {
    ...food,
    name,
    province: localizeProvince(food.province, locale),
    city: localizeCity(food.city, locale),
    region: localizeRegion(food.region, locale),
    category: localizeCategory(food.category, locale),
    ingredients: food.ingredients.map(localizeIngredient),
    flavorProfile: flavorByCategory[food.category] ?? 'A regional flavor shaped by its principal ingredients and local preparation.',
    story: `Public episode records list this entry under ${localizeSeason(food.season, locale)}, ${localizeEpisode(food.episode, locale)}. Detailed production notes remain under editorial review.`,
    culturalContext: `Filed under ${localizeProvince(food.province, locale)} for map browsing. More specific regional context remains subject to editorial verification.`,
    image: food.image ? { ...food.image, alt: `Generated food image of ${name}` } : undefined,
    season: localizeSeason(food.season, locale),
    episode: localizeEpisode(food.episode, locale),
  };
};

export const localizeProvinceIntro = (province: ProvinceEntry, locale: Locale) =>
  locale === 'zh'
    ? province.intro
    : provinceIntros[province.name] ?? `Explore the food traditions of ${localizeProvince(province.name, locale)}.`;
