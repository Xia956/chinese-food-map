import type { Confidence, FoodItem, MediaSource } from '../types';

const WIKI_URL = 'https://zh.wikipedia.org/wiki/%E8%88%8C%E5%B0%96%E4%B8%8A%E7%9A%84%E4%B8%AD%E5%9B%BD';
const CCTV_SEASON_4_URL = 'https://tv.cctv.com/2025/01/26/VIDA07Nw5uxdnXkPe4e8yfe7250126.shtml';
const CFLAC_SEASON_4_URL = 'https://m.cflac.org.cn/sylb/202502/t20250219_1339027.html';

type EpisodeSeed = {
  season: string;
  episode: string;
  source: MediaSource;
  items: string[];
  confidence?: Confidence;
};

type PlaceSeed = {
  province: string;
  city: string;
  region: string;
  longitude: number;
  latitude: number;
  source?: MediaSource;
  confidence?: Confidence;
};

const wikipediaSource: MediaSource = {
  title: '维基百科《舌尖上的中国》分集表',
  author: 'Wikipedia contributors',
  license: 'CC BY-SA',
  url: WIKI_URL,
};

const cctvSeason4Source: MediaSource = {
  title: '央视网《舌尖上的中国》（第四季）节目页',
  author: '中央广播电视总台',
  license: '央视网节目页',
  url: CCTV_SEASON_4_URL,
};

const cflacSeason4Source: MediaSource = {
  title: '中国文艺网《舌尖上的中国（第四季）》播出评论',
  author: '中国艺术报 / 中国文艺网',
  license: '页面版权归原发布方所有',
  url: CFLAC_SEASON_4_URL,
};

const cctvSeason2VideoIndexSource: MediaSource = {
  title: '央视网《舌尖上的中国》第二季视频专区',
  author: '央视网',
  license: '央视网节目页',
  url: 'https://shejian2.cntv.cn/shipin/index.shtml',
};

const cctvSeason2FootstepsSource: MediaSource = {
  title: '央视网《舌尖2》首播50多分钟汇集超20种美食',
  author: '中国新闻网 / 央视网转载',
  license: '央视网页面',
  url: 'https://big5.cctv.com/gate/big5/shejian2.cntv.cn/2014/04/24/ARTI1398312814850408.shtml',
};

const cctvClipSource = (title: string, url: string): MediaSource => ({
  title,
  author: '央视网',
  license: '央视网节目页',
  url,
});

const githubCuisineSource = (cuisineName: string, fileName: string): MediaSource => ({
  title: `GitHub Chinese-cuisine ${cuisineName}菜谱数据`,
  author: 'Yu-Xiao Zhu et al.',
  license: '论文配套清洗数据集，原始数据来自美食杰',
  url: `https://github.com/zhuyuxiao/Chinese-cuisine/blob/master/dataset/recipe_id/${fileName}_recipe_id.txt`,
});

const referenceSource = (title: string, author: string, url: string): MediaSource => ({
  title,
  author,
  license: '页面版权归原发布方所有',
  url,
});

const nameCueSource = (name: string, cue: string): MediaSource => ({
  title: `省份占位：${name}（${cue}）`,
  author: '项目人工整理',
  license: '仅作省份页占位，待外部来源复核',
  url: WIKI_URL,
});

const manualReviewSource = (name: string, note: string): MediaSource => ({
  title: `人工复核：${name}（${note}）`,
  author: '用户人工审核',
  license: '项目内人工复核记录',
  url: `manual-review://food-location-audit/${encodeURIComponent(name)}`,
});

const provinceOnly = (province: string, region: string, longitude: number, latitude: number, source: MediaSource): PlaceSeed => ({
  province,
  city: '待核实',
  region,
  longitude,
  latitude,
  source,
  confidence: '待核实',
});

const generatedFoodImages: Record<string, { url: string; alt: string }> = {
  腌禾花鱼: {
    url: '/food-images/hunan-yan-hehua-fish.png?v=2',
    alt: '靖州腌禾花鱼摄影级生成图',
  },
  腊肉: {
    url: '/food-images/hunan-jingzhou-larou.png?v=2',
    alt: '靖州腊肉摄影级生成图',
  },
  油炸臭豆腐: {
    url: '/food-images/hunan-fried-stinky-tofu.png?v=2',
    alt: '长沙油炸臭豆腐摄影级生成图',
  },
  咸鸭蛋: {
    url: '/food-images/hunan-salted-duck-egg.png?v=2',
    alt: '湘乡咸鸭蛋摄影级生成图',
  },
  红霉豆腐渣: {
    url: '/food-images/hunan-red-mold-tofu-residue.png?v=2',
    alt: '临湘红霉豆腐渣摄影级生成图',
  },
  '湖南|蕨根糍粑': {
    url: '/food-images/hunan-fern-root-ciba.png?v=1',
    alt: '湖南郴州蕨根糍粑摄影级生成图',
  },
  '湖南|酸肉': {
    url: '/food-images/hunan-sour-pork.png?v=1',
    alt: '湖南酸肉摄影级生成图',
  },
  '湖南|蒸腊鱼': {
    url: '/food-images/hunan-steamed-cured-fish.png?v=1',
    alt: '湖南蒸腊鱼摄影级生成图',
  },
  '湖南|平江十大碗': {
    url: '/food-images/hunan-pingjiang-ten-bowl-banquet.png?v=1',
    alt: '湖南平江十大碗摄影级生成图',
  },
  '湖南|左宗棠鸡': {
    url: '/food-images/hunan-general-tsos-chicken.png?v=1',
    alt: '湖南左宗棠鸡摄影级生成图',
  },
  '云南|松茸': {
    url: '/food-images/yunnan-songrong.png?v=1',
    alt: '云南香格里拉松茸摄影级生成图',
  },
  '云南|诺邓火腿': {
    url: '/food-images/yunnan-nuodeng-ham.png?v=1',
    alt: '云南大理诺邓火腿摄影级生成图',
  },
  '云南|烧豆腐': {
    url: '/food-images/yunnan-jianshui-roasted-tofu.png?v=1',
    alt: '云南建水烧豆腐摄影级生成图',
  },
  '云南|豆腐': {
    url: '/food-images/yunnan-shiping-tofu.png?v=1',
    alt: '云南石屏豆腐摄影级生成图',
  },
  '云南|尼西黑陶煮制食品': {
    url: '/food-images/yunnan-nixi-black-pottery-food.png?v=1',
    alt: '云南香格里拉尼西黑陶煮制食品摄影级生成图',
  },
  '云南|汽锅鸡': {
    url: '/food-images/yunnan-qiguo-chicken.png?v=1',
    alt: '云南昆明汽锅鸡摄影级生成图',
  },
  '云南|菌子火锅': {
    url: '/food-images/yunnan-mushroom-hotpot.png?v=1',
    alt: '云南菌子火锅摄影级生成图',
  },
  '云南|石锅松茸': {
    url: '/food-images/yunnan-stone-pot-matsutake.png?v=1',
    alt: '云南石锅松茸摄影级生成图',
  },
  '云南|稀豆粉': {
    url: '/food-images/yunnan-tengchong-pea-flour-porridge.png?v=1',
    alt: '云南腾冲稀豆粉摄影级生成图',
  },
  '云南|香橼蜜制梨': {
    url: '/food-images/yunnan-lijiang-citron-honey-pear.png?v=1',
    alt: '云南丽江香橼蜜制梨摄影级生成图',
  },
  '云南|扣茄花': {
    url: '/food-images/yunnan-buckled-eggplant-flower.png?v=1',
    alt: '云南扣茄花摄影级生成图',
  },
  '云南|江边辣': {
    url: '/food-images/yunnan-riverside-spicy-dish.png?v=1',
    alt: '云南江边辣摄影级生成图',
  },
  '云南|西双版纳绿叶宴': {
    url: '/food-images/yunnan-xishuangbanna-green-leaf-feast.png?v=1',
    alt: '云南西双版纳绿叶宴摄影级生成图',
  },
  '云南|喃咪酱': {
    url: '/food-images/yunnan-nammi-sauce.png?v=1',
    alt: '云南喃咪酱摄影级生成图',
  },
  '浙江|冬笋': {
    url: '/food-images/zhejiang-winter-bamboo-shoot.png?v=1',
    alt: '浙江遂昌冬笋摄影级生成图',
  },
  '浙江|粽子': {
    url: '/food-images/zhejiang-jiaxing-zongzi.png?v=1',
    alt: '浙江嘉兴粽子摄影级生成图',
  },
  '浙江|年糕': {
    url: '/food-images/zhejiang-ningbo-niangao.png?v=1',
    alt: '浙江宁波年糕摄影级生成图',
  },
  '浙江|黄酒': {
    url: '/food-images/zhejiang-shaoxing-huangjiu.png?v=1',
    alt: '浙江绍兴黄酒摄影级生成图',
  },
  '浙江|酱油': {
    url: '/food-images/zhejiang-shaoxing-soy-sauce.png?v=1',
    alt: '浙江绍兴酱油摄影级生成图',
  },
  '浙江|火腿': {
    url: '/food-images/zhejiang-jinhua-ham.png?v=1',
    alt: '浙江金华火腿摄影级生成图',
  },
  '浙江|西湖醋鱼': {
    url: '/food-images/zhejiang-west-lake-vinegar-fish.png?v=1',
    alt: '浙江杭州西湖醋鱼摄影级生成图',
  },
  '浙江|河蟹': {
    url: '/food-images/zhejiang-huzhou-river-crab.png?v=1',
    alt: '浙江湖州河蟹摄影级生成图',
  },
  '江西|九层皮': {
    url: '/food-images/jiangxi-jiucengpi.png?v=1',
    alt: '江西赣州九层皮摄影级生成图',
  },
  '江西|早酒': {
    url: '/food-images/jiangxi-taihe-zaojiu.png?v=1',
    alt: '江西泰和早酒摄影级生成图',
  },
  '江西|茶香饭': {
    url: '/food-images/jiangxi-lushan-tea-rice.png?v=1',
    alt: '江西庐山茶香饭摄影级生成图',
  },
  '江西|茶鱼饺': {
    url: '/food-images/jiangxi-lushan-tea-fish-dumplings.png?v=1',
    alt: '江西庐山茶鱼饺摄影级生成图',
  },
  '江西|钻林欢喜丸': {
    url: '/food-images/jiangxi-lushan-zuanlin-huanxi-balls.png?v=1',
    alt: '江西庐山钻林欢喜丸摄影级生成图',
  },
  '江西|茶聊鸡': {
    url: '/food-images/jiangxi-lushan-tea-chicken.png?v=1',
    alt: '江西庐山茶聊鸡摄影级生成图',
  },
  '河北|鲜花椒红烧肉': {
    url: '/food-images/hebei-shexian-peppercorn-braised-pork.png?v=1',
    alt: '河北涉县鲜花椒红烧肉摄影级生成图',
  },
  '广西|黄豆酸笋小黄鱼': {
    url: '/food-images/guangxi-sour-bamboo-yellow-croaker.png?v=1',
    alt: '广西黄豆酸笋小黄鱼摄影级生成图',
  },
  '广西|螺蛳粉': {
    url: '/food-images/guangxi-liuzhou-luosifen.png?v=1',
    alt: '广西柳州螺蛳粉摄影级生成图',
  },
  '湖北|莲藕': {
    url: '/food-images/hubei-jiayu-lotus-root.png?v=1',
    alt: '湖北嘉鱼莲藕摄影级生成图',
  },
  '湖北|热干面': {
    url: '/food-images/hubei-wuhan-hot-dry-noodles.png?v=1',
    alt: '武汉热干面摄影级生成图',
  },
  '湖北|蒸菜': {
    url: '/food-images/hubei-tianmen-steamed-dishes.png?v=1',
    alt: '湖北天门蒸菜摄影级生成图',
  },
  '湖北|全藕宴': {
    url: '/food-images/hubei-lotus-root-banquet.png?v=1',
    alt: '湖北全藕宴摄影级生成图',
  },
  '湖北|酱香饼': {
    url: '/food-images/hubei-sauce-pancake.png?v=1',
    alt: '湖北酱香饼摄影级生成图',
  },
  '湖北|潜江全荷宴': {
    url: '/food-images/hubei-qianjiang-lotus-banquet.png?v=1',
    alt: '湖北潜江全荷宴摄影级生成图',
  },
  '湖北|粉蒸芋头': {
    url: '/food-images/hubei-xiantao-steamed-taro.png?v=1',
    alt: '湖北仙桃粉蒸芋头摄影级生成图',
  },
  '吉林|冬季捕鱼': {
    url: '/food-images/jilin-chagan-lake-winter-fish.png?v=1',
    alt: '吉林查干湖冬季捕鱼摄影级生成图',
  },
  '吉林|炭烤帝王蟹': {
    url: '/food-images/jilin-hunchun-charcoal-king-crab.png?v=1',
    alt: '吉林珲春炭烤帝王蟹摄影级生成图',
  },
  '海南|远洋打渔': {
    url: '/food-images/hainan-south-sea-fishing.png?v=1',
    alt: '海南南海远洋打渔摄影级生成图',
  },
  '山西|面食': {
    url: '/food-images/shanxi-xiangfen-noodles.png?v=1',
    alt: '山西襄汾面食摄影级生成图',
  },
  '山西|饸饹': {
    url: '/food-images/shanxi-hele-noodles.png?v=1',
    alt: '山西饸饹摄影级生成图',
  },
  '山西|枣花馍': {
    url: '/food-images/shanxi-zaohua-mo.png?v=1',
    alt: '山西枣花馍摄影级生成图',
  },
  '山西|火锅': {
    url: '/food-images/shanxi-hotpot.png?v=1',
    alt: '山西火锅摄影级生成图',
  },
  '山西|刀削面': {
    url: '/food-images/shanxi-datong-knife-cut-noodles.png?v=1',
    alt: '山西大同刀削面摄影级生成图',
  },
  '陕西|黄馍馍': {
    url: '/food-images/shaanxi-huangmomo.png?v=1',
    alt: '陕西绥德黄馍馍摄影级生成图',
  },
  '陕西|肉夹馍': {
    url: '/food-images/shaanxi-roujiamo.png?v=1',
    alt: '陕西西安肉夹馍摄影级生成图',
  },
  '陕西|泡馍': {
    url: '/food-images/shaanxi-paomo.png?v=1',
    alt: '陕西西安泡馍摄影级生成图',
  },
  '陕西|臊子面': {
    url: '/food-images/shaanxi-saozi-noodles.png?v=1',
    alt: '陕西岐山臊子面摄影级生成图',
  },
  '陕西|裤带面': {
    url: '/food-images/shaanxi-belt-noodles.png?v=1',
    alt: '陕西蓝田裤带面摄影级生成图',
  },
  '陕西|面皮': {
    url: '/food-images/shaanxi-hanzhong-mianpi.png?v=1',
    alt: '陕西汉中面皮摄影级生成图',
  },
  '陕西|柿饼': {
    url: '/food-images/shaanxi-fuping-persimmon.png?v=1',
    alt: '陕西富平柿饼摄影级生成图',
  },
  '陕西|空心挂面': {
    url: '/food-images/shaanxi-hollow-dried-noodles.png?v=1',
    alt: '陕西空心挂面摄影级生成图',
  },
  '陕西|金边白菜': {
    url: '/food-images/shaanxi-golden-edge-cabbage.png?v=1',
    alt: '陕西金边白菜摄影级生成图',
  },
  '陕西|水盆羊肉': {
    url: '/food-images/shaanxi-xian-lamb-soup.png?v=1',
    alt: '陕西西安水盆羊肉摄影级生成图',
  },
  '陕西|玲珑牡丹鲊': {
    url: '/food-images/shaanxi-xian-linglong-peony-zha.png?v=1',
    alt: '陕西西安玲珑牡丹鲊摄影级生成图',
  },
  '陕西|金齑玉脍': {
    url: '/food-images/shaanxi-xian-jinji-yukuai.png?v=1',
    alt: '陕西西安金齑玉脍摄影级生成图',
  },
  '陕西|柿子糊塌': {
    url: '/food-images/shaanxi-fuping-persimmon-pancakes.png?v=1',
    alt: '陕西富平柿子糊塌摄影级生成图',
  },
  '新疆|新疆库车馕': {
    url: '/food-images/xinjiang-kuqa-nang.png?v=1',
    alt: '新疆库车馕摄影级生成图',
  },
  '新疆|纳仁': {
    url: '/food-images/xinjiang-naren.png?v=1',
    alt: '新疆纳仁摄影级生成图',
  },
  '新疆|玛仁糖': {
    url: '/food-images/xinjiang-hetian-maren-tang.png?v=1',
    alt: '新疆和田玛仁糖摄影级生成图',
  },
  '新疆|切糕': {
    url: '/food-images/xinjiang-hetian-qiegao.png?v=2',
    alt: '新疆和田切糕摄影级生成图',
  },
  '新疆|抓饭': {
    url: '/food-images/xinjiang-turpan-pilaf.png?v=1',
    alt: '新疆吐鲁番抓饭摄影级生成图',
  },
  '新疆|大盘鸡': {
    url: '/food-images/xinjiang-dapanji.png?v=1',
    alt: '新疆大盘鸡摄影级生成图',
  },
  '新疆|烤包子': {
    url: '/food-images/xinjiang-baked-buns.png?v=1',
    alt: '新疆烤包子摄影级生成图',
  },
  '新疆|拉条子': {
    url: '/food-images/xinjiang-latiaozi.png?v=1',
    alt: '新疆拉条子摄影级生成图',
  },
  '贵州|米粉': {
    url: '/food-images/guizhou-liping-rice-noodles.png?v=1',
    alt: '贵州黎平米粉摄影级生成图',
  },
  '贵州|新米节': {
    url: '/food-images/guizhou-congjiang-new-rice-festival.png?v=1',
    alt: '贵州从江新米节摄影级生成图',
  },
  '贵州|鱼酱': {
    url: '/food-images/guizhou-leishan-fish-sauce.png?v=1',
    alt: '贵州雷山鱼酱摄影级生成图',
  },
  '贵州|丝娃娃': {
    url: '/food-images/guizhou-guiyang-siwawa.png?v=1',
    alt: '贵州贵阳丝娃娃摄影级生成图',
  },
  '贵州|牛冻春': {
    url: '/food-images/guizhou-qiandongnan-niudongchun.png?v=1',
    alt: '贵州黔东南牛冻春摄影级生成图',
  },
  '贵州|鱼酱炖稻花鱼': {
    url: '/food-images/guizhou-leishan-fish-sauce-rice-fish.png?v=1',
    alt: '贵州雷山鱼酱炖稻花鱼摄影级生成图',
  },
  '贵州|腌鱼': {
    url: '/food-images/guizhou-pickled-fish.png?v=1',
    alt: '贵州腌鱼摄影级生成图',
  },
  '贵州|腌肉': {
    url: '/food-images/guizhou-pickled-pork.png?v=1',
    alt: '贵州腌肉摄影级生成图',
  },
  '贵州|腌菜': {
    url: '/food-images/guizhou-pickled-vegetables.png?v=1',
    alt: '贵州腌菜摄影级生成图',
  },
  '贵州|侗族大歌宴': {
    url: '/food-images/guizhou-dong-grand-song-feast.png?v=1',
    alt: '贵州侗族大歌宴摄影级生成图',
  },
  '贵州|酸汤鱼': {
    url: '/food-images/guizhou-sour-soup-fish.png?v=1',
    alt: '贵州黔东南酸汤鱼摄影级生成图',
  },
  '贵州|羊肉粉': {
    url: '/food-images/guizhou-lamb-rice-noodles.png?v=1',
    alt: '贵州羊肉粉摄影级生成图',
  },
  '甘肃|牛肉面': {
    url: '/food-images/gansu-lanzhou-beef-noodles.png?v=1',
    alt: '甘肃兰州牛肉面摄影级生成图',
  },
  '广东|沙河粉': {
    url: '/food-images/guangdong-shahe-rice-noodles.png?v=1',
    alt: '广东广州沙河粉摄影级生成图',
  },
  '广东|竹升面': {
    url: '/food-images/guangdong-jook-sing-noodles.png?v=1',
    alt: '广东广州竹升面摄影级生成图',
  },
  '广东|云吞捞面': {
    url: '/food-images/guangdong-wonton-lo-mein.png?v=1',
    alt: '广东广州云吞捞面摄影级生成图',
  },
  '广东|煲仔饭': {
    url: '/food-images/guangdong-claypot-rice.png?v=1',
    alt: '广东煲仔饭摄影级生成图',
  },
  '广东|均安露天村宴': {
    url: '/food-images/guangdong-junan-village-banquet.png?v=1',
    alt: '广东顺德均安露天村宴摄影级生成图',
  },
  '广东|粉葛蒸肉': {
    url: '/food-images/guangdong-fenge-steamed-pork.png?v=1',
    alt: '广东顺德粉葛蒸肉摄影级生成图',
  },
  '广东|糖葱薄饼': {
    url: '/food-images/guangdong-sugar-scallion-pancake.png?v=1',
    alt: '广东汕头糖葱薄饼摄影级生成图',
  },
  '广东|蔗渣熏鸭脯': {
    url: '/food-images/guangdong-smoked-duck-breast.png?v=1',
    alt: '广东汕头蔗渣熏鸭脯摄影级生成图',
  },
  '广东|陈皮': {
    url: '/food-images/guangdong-xinhui-chenpi.png?v=1',
    alt: '广东新会陈皮摄影级生成图',
  },
  '广东|盐焗鸡': {
    url: '/food-images/guangdong-salt-baked-chicken.png?v=1',
    alt: '广东东江盐焗鸡摄影级生成图',
  },
  '广东|鱼丸紫菜煲': {
    url: '/food-images/guangdong-fish-ball-seaweed-pot.png?v=1',
    alt: '广东汕头鱼丸紫菜煲摄影级生成图',
  },
  '广东|清蒸鱼': {
    url: '/food-images/guangdong-steamed-fish.png?v=1',
    alt: '广东广州清蒸鱼摄影级生成图',
  },
  '广东|白切鸡': {
    url: '/food-images/guangdong-white-cut-chicken.png?v=1',
    alt: '广东广州白切鸡摄影级生成图',
  },
  '广东|蚝烙': {
    url: '/food-images/guangdong-oyster-omelette.png?v=1',
    alt: '广东汕头澄海蚝烙摄影级生成图',
  },
  '广东|牛肉火锅': {
    url: '/food-images/guangdong-beef-hotpot.png?v=1',
    alt: '广东潮汕牛肉火锅摄影级生成图',
  },
  '广东|早茶': {
    url: '/food-images/guangdong-morning-tea.png?v=1',
    alt: '广东广州早茶摄影级生成图',
  },
  '广东|手打鱼丸': {
    url: '/food-images/guangdong-handmade-fish-balls.png?v=1',
    alt: '广东汕头手打鱼丸摄影级生成图',
  },
  '广东|盆菜': {
    url: '/food-images/guangdong-hakka-poon-choi.png?v=1',
    alt: '广东客家盆菜摄影级生成图',
  },
  '安徽|嫩豆腐': {
    url: '/food-images/anhui-shouxian-soft-tofu.png?v=1',
    alt: '安徽寿县嫩豆腐摄影级生成图',
  },
  '安徽|毛豆腐': {
    url: '/food-images/anhui-xiuning-hairy-tofu.png?v=1',
    alt: '安徽休宁毛豆腐摄影级生成图',
  },
  '安徽|米酒': {
    url: '/food-images/anhui-xiuning-rice-wine.png?v=1',
    alt: '安徽休宁米酒摄影级生成图',
  },
  '安徽|臭鳜鱼': {
    url: '/food-images/anhui-stinky-mandarin-fish.png?v=1',
    alt: '安徽徽州臭鳜鱼摄影级生成图',
  },
  '安徽|刀板香火腿': {
    url: '/food-images/anhui-daobanxiang-ham.png?v=1',
    alt: '安徽徽州刀板香火腿摄影级生成图',
  },
  '安徽|咸肉': {
    url: '/food-images/anhui-huangshan-salted-pork.png?v=1',
    alt: '安徽黄山咸肉摄影级生成图',
  },
  '安徽|蟹黄汪豆腐': {
    url: '/food-images/anhui-crab-roe-wang-tofu.png?v=1',
    alt: '安徽蟹黄汪豆腐摄影级生成图',
  },
  '安徽|虾子小刀面': {
    url: '/food-images/anhui-wuhu-shrimp-knife-noodles.png?v=1',
    alt: '安徽芜湖虾子小刀面摄影级生成图',
  },
  '安徽|徽州臭豆腐': {
    url: '/food-images/anhui-huizhou-stinky-tofu.png?v=1',
    alt: '安徽徽州臭豆腐摄影级生成图',
  },
  '安徽|油炸锅巴': {
    url: '/food-images/anhui-huangshan-fried-rice-crust.png?v=1',
    alt: '安徽黄山油炸锅巴摄影级生成图',
  },
  '安徽|水八仙': {
    url: '/food-images/anhui-wuhu-water-eight-immortals.png?v=1',
    alt: '安徽芜湖水八仙摄影级生成图',
  },
  '安徽|嵌字豆糖': {
    url: '/food-images/anhui-huizhou-character-bean-candy.png?v=1',
    alt: '安徽徽州嵌字豆糖摄影级生成图',
  },
  '安徽|渔亭糕': {
    url: '/food-images/anhui-huizhou-yuting-cake.png?v=1',
    alt: '安徽徽州渔亭糕摄影级生成图',
  },
  '内蒙古|奶豆腐': {
    url: '/food-images/inner-mongolia-milk-tofu.png?v=1',
    alt: '内蒙古锡林郭勒奶豆腐摄影级生成图',
  },
  '内蒙古|奶茶': {
    url: '/food-images/inner-mongolia-milk-tea.png?v=1',
    alt: '内蒙古锡林郭勒奶茶摄影级生成图',
  },
  '黑龙江|大酱': {
    url: '/food-images/heilongjiang-soybean-paste.png?v=1',
    alt: '黑龙江依兰大酱摄影级生成图',
  },
  '黑龙江|酸菜': {
    url: '/food-images/heilongjiang-sauerkraut.png?v=1',
    alt: '黑龙江酸菜摄影级生成图',
  },
  '黑龙江|铁锅炖鱼': {
    url: '/food-images/heilongjiang-iron-pot-fish-stew.png?v=1',
    alt: '东北铁锅炖鱼摄影级生成图',
  },
  '黑龙江|小鸡炖蘑菇': {
    url: '/food-images/heilongjiang-chicken-mushroom-stew.png?v=1',
    alt: '东北小鸡炖蘑菇摄影级生成图',
  },
  '黑龙江|鲑鱼': {
    url: '/food-images/heilongjiang-salmon.png?v=1',
    alt: '东北鲑鱼摄影级生成图',
  },
  '福建|腊鸭': {
    url: '/food-images/fujian-nanan-cured-duck.png?v=1',
    alt: '福建南安腊鸭摄影级生成图',
  },
  '福建|石花膏': {
    url: '/food-images/fujian-quanzhou-shihua-jelly.png?v=1',
    alt: '福建泉州石花膏摄影级生成图',
  },
  '福建|萝卜饭': {
    url: '/food-images/fujian-quanzhou-radish-rice.png?v=1',
    alt: '福建泉州萝卜饭摄影级生成图',
  },
  '福建|面线糊': {
    url: '/food-images/fujian-quanzhou-mianxianhu.png?v=1',
    alt: '福建泉州面线糊摄影级生成图',
  },
  '福建|沙茶焖牛肉': {
    url: '/food-images/fujian-xiamen-shacha-braised-beef.png?v=1',
    alt: '福建厦门沙茶焖牛肉摄影级生成图',
  },
  '福建|封肉': {
    url: '/food-images/fujian-xiamen-fengrou.png?v=1',
    alt: '福建厦门封肉摄影级生成图',
  },
  '福建|酒糟芋头面': {
    url: '/food-images/fujian-wine-lees-taro-noodles.png?v=1',
    alt: '福建酒糟芋头面摄影级生成图',
  },
  '福建|牡蒿蒸嫩鸭': {
    url: '/food-images/fujian-ningde-mugwort-steamed-duck.png?v=1',
    alt: '福建宁德牡蒿蒸嫩鸭摄影级生成图',
  },
  '福建|烧麦': {
    url: '/food-images/fujian-shaxian-shaomai.png?v=1',
    alt: '福建沙县烧麦摄影级生成图',
  },
  '福建|蒸饺': {
    url: '/food-images/fujian-shaxian-steamed-dumplings.png?v=1',
    alt: '福建沙县蒸饺摄影级生成图',
  },
  '福建|拌面': {
    url: '/food-images/fujian-shaxian-mixed-noodles.png?v=1',
    alt: '福建沙县拌面摄影级生成图',
  },
  '福建|炖罐': {
    url: '/food-images/fujian-shaxian-stew-pot.png?v=1',
    alt: '福建沙县炖罐摄影级生成图',
  },
  '上海|醉蟹': {
    url: '/food-images/shanghai-drunken-crab.png?v=1',
    alt: '上海醉蟹摄影级生成图',
  },
  '上海|西餐': {
    url: '/food-images/shanghai-western-food.png?v=1',
    alt: '上海西餐摄影级生成图',
  },
  '上海|素食': {
    url: '/food-images/shanghai-vegetarian-food.png?v=1',
    alt: '上海素食摄影级生成图',
  },
  '上海|扣三丝': {
    url: '/food-images/shanghai-kou-san-si.png?v=1',
    alt: '上海扣三丝摄影级生成图',
  },
  '上海|油爆河虾': {
    url: '/food-images/shanghai-stir-fried-river-shrimp.png?v=1',
    alt: '上海油爆河虾摄影级生成图',
  },
  '上海|红烧肉': {
    url: '/food-images/shanghai-red-braised-pork.png?v=1',
    alt: '上海红烧肉摄影级生成图',
  },
  '上海|冰皮月饼': {
    url: '/food-images/shanghai-snow-skin-mooncakes.png?v=1',
    alt: '上海冰皮月饼摄影级生成图',
  },
  '上海|蟹粉豆腐': {
    url: '/food-images/shanghai-crab-roe-tofu.png?v=1',
    alt: '上海蟹粉豆腐摄影级生成图',
  },
  '上海|刺猬包': {
    url: '/food-images/shanghai-hedgehog-buns.png?v=1',
    alt: '上海刺猬包摄影级生成图',
  },
  '上海|春卷': {
    url: '/food-images/shanghai-spring-rolls.png?v=1',
    alt: '上海春卷摄影级生成图',
  },
  '上海|凉拌海蜇': {
    url: '/food-images/shanghai-cold-jellyfish.png?v=1',
    alt: '上海凉拌海蜇摄影级生成图',
  },
  '台湾|乌鱼子': {
    url: '/food-images/taiwan-yunlin-bottarga.png?v=1',
    alt: '台湾云林乌鱼子摄影级生成图',
  },
  '台湾|柿饼': {
    url: '/food-images/taiwan-hsinchu-dried-persimmon.png?v=1',
    alt: '台湾新竹柿饼摄影级生成图',
  },
  '台湾|卤肉饭': {
    url: '/food-images/taiwan-lu-rou-rice.png?v=1',
    alt: '台湾卤肉饭摄影级生成图',
  },
  '台湾|虱目鱼腹粥': {
    url: '/food-images/taiwan-tainan-milkfish-belly-congee.png?v=1',
    alt: '台湾台南虱目鱼腹粥摄影级生成图',
  },
  '香港|虾膏': {
    url: '/food-images/hongkong-tai-o-shrimp-paste.png?v=1',
    alt: '香港大澳虾膏摄影级生成图',
  },
  '香港|虾酱': {
    url: '/food-images/hongkong-tai-o-shrimp-sauce.png?v=1',
    alt: '香港大澳虾酱摄影级生成图',
  },
  '澳门|陈皮鸭': {
    url: '/food-images/macau-chenpi-duck.png?v=1',
    alt: '澳门陈皮鸭摄影级生成图',
  },
  '澳门|陈皮红豆沙': {
    url: '/food-images/macau-chenpi-red-bean-soup.png?v=1',
    alt: '澳门陈皮红豆沙摄影级生成图',
  },
  '澳门|姜撞奶': {
    url: '/food-images/macau-ginger-milk-pudding.png?v=1',
    alt: '澳门姜撞奶摄影级生成图',
  },
  '辽宁|海产品': {
    url: '/food-images/liaoning-zhangzidao-seafood.png?v=1',
    alt: '辽宁獐子岛海产品摄影级生成图',
  },
  '辽宁|虾子焖茭白': {
    url: '/food-images/liaoning-shrimp-roe-water-bamboo.png?v=1',
    alt: '辽宁盘锦大洼虾子焖茭白摄影级生成图',
  },
  '西藏|青稞': {
    url: '/food-images/tibet-highland-barley.png?v=1',
    alt: '西藏青稞摄影级生成图',
  },
  '西藏|酥油蜂蜜': {
    url: '/food-images/tibet-bomi-butter-honey.png?v=1',
    alt: '西藏林芝波密酥油蜂蜜摄影级生成图',
  },
  '宁夏|手擀面': {
    url: '/food-images/ningxia-hand-rolled-noodles.png?v=1',
    alt: '宁夏手擀面摄影级生成图',
  },
  '宁夏|手抓羊肉': {
    url: '/food-images/ningxia-hand-grabbed-lamb.png?v=1',
    alt: '宁夏手抓羊肉摄影级生成图',
  },
  '宁夏|枸杞羊肉': {
    url: '/food-images/ningxia-goji-lamb.png?v=1',
    alt: '宁夏枸杞羊肉摄影级生成图',
  },
  '河南|抻面': {
    url: '/food-images/henan-stretched-noodles.png?v=1',
    alt: '河南抻面摄影级生成图',
  },
  '河南|灌汤包': {
    url: '/food-images/henan-kaifeng-soup-dumplings.png?v=1',
    alt: '河南开封灌汤包摄影级生成图',
  },
  '河南|烧牛肉': {
    url: '/food-images/henan-braised-beef.png?v=1',
    alt: '河南烧牛肉摄影级生成图',
  },
  '河南|陕州十碗席': {
    url: '/food-images/henan-shanzhou-ten-bowl-banquet.png?v=1',
    alt: '河南三门峡陕州十碗席摄影级生成图',
  },
  '河南|胡辣汤': {
    url: '/food-images/henan-hulatang.png?v=1',
    alt: '河南胡辣汤摄影级生成图',
  },
  '河南|柿子醋': {
    url: '/food-images/henan-shanzhou-persimmon-vinegar.png?v=1',
    alt: '河南三门峡陕州柿子醋摄影级生成图',
  },
  '北京|涮肉火锅': {
    url: '/food-images/beijing-lamb-hotpot.png?v=1',
    alt: '北京涮肉火锅摄影级生成图',
  },
  '北京|烤鸭卷饼': {
    url: '/food-images/beijing-roast-duck-wrap.png?v=1',
    alt: '北京烤鸭卷饼摄影级生成图',
  },
  '北京|萨其马': {
    url: '/food-images/beijing-sachima.png?v=1',
    alt: '北京萨其马摄影级生成图',
  },
  '北京|春饼': {
    url: '/food-images/beijing-spring-pancakes.png?v=1',
    alt: '北京春饼摄影级生成图',
  },
  '天津|煎饼果子': {
    url: '/food-images/tianjin-jianbing-guozi.png?v=1',
    alt: '天津煎饼果子摄影级生成图',
  },
  '天津|津味豆腐脑': {
    url: '/food-images/tianjin-savory-tofu-pudding.png?v=1',
    alt: '天津津味豆腐脑摄影级生成图',
  },
  '天津|贵妃饼': {
    url: '/food-images/tianjin-guifei-pastry.png?v=1',
    alt: '天津贵妃饼摄影级生成图',
  },
  '天津|油酥烧饼': {
    url: '/food-images/tianjin-flaky-shaobing.png?v=1',
    alt: '天津油酥烧饼摄影级生成图',
  },
  '江苏|包子': {
    url: '/food-images/jiangsu-yangzhou-baozi.png?v=1',
    alt: '江苏扬州包子摄影级生成图',
  },
  '江苏|大煮干丝': {
    url: '/food-images/jiangsu-yangzhou-dazhu-gansi.png?v=1',
    alt: '江苏扬州大煮干丝摄影级生成图',
  },
  '江苏|雪花鲥鱼': {
    url: '/food-images/jiangsu-yangzhou-shad-fish.png?v=1',
    alt: '江苏扬州雪花鲥鱼摄影级生成图',
  },
  '江苏|清炖狮子头': {
    url: '/food-images/jiangsu-yangzhou-lion-head.png?v=1',
    alt: '江苏扬州清炖狮子头摄影级生成图',
  },
  '江苏|仿豹胎': {
    url: '/food-images/jiangsu-yangzhou-fangbaotai.png?v=1',
    alt: '江苏扬州仿豹胎摄影级生成图',
  },
  '江苏|文思豆腐': {
    url: '/food-images/jiangsu-yangzhou-wensi-tofu.png?v=1',
    alt: '江苏扬州文思豆腐摄影级生成图',
  },
  '江苏|鉴真素鸭': {
    url: '/food-images/jiangsu-yangzhou-jianzhen-vegetarian-duck.png?v=1',
    alt: '江苏扬州鉴真素鸭摄影级生成图',
  },
  '江苏|梁溪脆鳝': {
    url: '/food-images/jiangsu-wuxi-crispy-eel.png?v=1',
    alt: '江苏无锡梁溪脆鳝摄影级生成图',
  },
  '江苏|加蟹小笼馒头': {
    url: '/food-images/jiangsu-wuxi-crab-xiaolongbao.png?v=1',
    alt: '江苏无锡加蟹小笼馒头摄影级生成图',
  },
  '江苏|手推馄饨': {
    url: '/food-images/jiangsu-wuxi-wontons.png?v=1',
    alt: '江苏无锡手推馄饨摄影级生成图',
  },
  '江苏|酱排骨': {
    url: '/food-images/jiangsu-wuxi-sauced-ribs.png?v=1',
    alt: '江苏无锡酱排骨摄影级生成图',
  },
  '江苏|香醋': {
    url: '/food-images/jiangsu-zhenjiang-vinegar.png?v=1',
    alt: '江苏镇江香醋摄影级生成图',
  },
  '江苏|醋排': {
    url: '/food-images/jiangsu-zhenjiang-vinegar-ribs.png?v=1',
    alt: '江苏镇江醋排摄影级生成图',
  },
  '江苏|蟹黄汤包': {
    url: '/food-images/jiangsu-jingjiang-crab-roe-soup-dumpling.png?v=1',
    alt: '江苏靖江蟹黄汤包摄影级生成图',
  },
  '江苏|芋头': {
    url: '/food-images/jiangsu-xinghua-taro.png?v=1',
    alt: '江苏兴化芋头摄影级生成图',
  },
  '江苏|头汤面': {
    url: '/food-images/jiangsu-suzhou-first-broth-noodles.png?v=1',
    alt: '江苏苏州头汤面摄影级生成图',
  },
  '江苏|蒲菜水饺': {
    url: '/food-images/jiangsu-huaian-pucai-dumplings.png?v=1',
    alt: '江苏淮安蒲菜水饺摄影级生成图',
  },
  '江苏|蒸点': {
    url: '/food-images/jiangsu-yangzhou-steamed-dim-sum.png?v=1',
    alt: '江苏扬州蒸点摄影级生成图',
  },
  '江苏|瓜雕': {
    url: '/food-images/jiangsu-yangzhou-melon-carving.png?v=1',
    alt: '江苏扬州瓜雕摄影级生成图',
  },
  '山东|葱烧海参': {
    url: '/food-images/shandong-braised-sea-cucumber.png?v=1',
    alt: '山东葱烧海参摄影级生成图',
  },
  '山东|煎饼卷大葱': {
    url: '/food-images/shandong-pancake-scallion.png?v=1',
    alt: '山东沂蒙山煎饼卷大葱摄影级生成图',
  },
  '山东|西瓜酱': {
    url: '/food-images/shandong-yuncheng-watermelon-sauce.png?v=1',
    alt: '山东郓城西瓜酱摄影级生成图',
  },
  '山东|奶汤蒲菜': {
    url: '/food-images/shandong-jinan-milk-soup-pucai.png?v=1',
    alt: '山东济南奶汤蒲菜摄影级生成图',
  },
  '山东|清水炒蛋': {
    url: '/food-images/shandong-clear-water-eggs.png?v=2',
    alt: '山东济南章丘清水炒蛋摄影级生成图',
  },
  '山东|九转大肠': {
    url: '/food-images/shandong-jiuzhuan-intestine.png?v=1',
    alt: '山东济南章丘九转大肠摄影级生成图',
  },
  '山东|摔面': {
    url: '/food-images/shandong-jiaozhou-thrown-noodles.png?v=1',
    alt: '山东胶州摔面摄影级生成图',
  },
  '山东|爆炒腰花': {
    url: '/food-images/shandong-stir-fried-kidney.png?v=1',
    alt: '山东爆炒腰花摄影级生成图',
  },
  '山东|七彩饺子': {
    url: '/food-images/shandong-colorful-dumplings.png?v=1',
    alt: '山东胶东七彩饺子摄影级生成图',
  },
  '山东|甜晒鱼': {
    url: '/food-images/shandong-sweet-sun-dried-fish.png?v=1',
    alt: '山东甜晒鱼摄影级生成图',
  },
  '山东|鲅鱼饺子': {
    url: '/food-images/shandong-mackerel-dumplings.png?v=1',
    alt: '山东胶东鲅鱼饺子摄影级生成图',
  },
  '四川|泡椒': {
    url: '/food-images/sichuan-pickled-peppers.png?v=1',
    alt: '四川泡椒摄影级生成图',
  },
  '四川|鱼香肉丝': {
    url: '/food-images/sichuan-yuxiang-shredded-pork.png?v=1',
    alt: '四川鱼香肉丝摄影级生成图',
  },
  '四川|豆瓣酱': {
    url: '/food-images/sichuan-doubanjiang.png?v=1',
    alt: '四川豆瓣酱摄影级生成图',
  },
  '四川|麻婆豆腐': {
    url: '/food-images/sichuan-mapo-tofu.png?v=1',
    alt: '四川麻婆豆腐摄影级生成图',
  },
  '四川|藤椒鱼': {
    url: '/food-images/sichuan-green-peppercorn-fish.png?v=1',
    alt: '四川藤椒鱼摄影级生成图',
  },
  '四川|嫩豆花': {
    url: '/food-images/sichuan-leshan-douhua.png?v=1',
    alt: '四川乐山嫩豆花摄影级生成图',
  },
  '四川|甜水面': {
    url: '/food-images/sichuan-sweet-water-noodles.png?v=1',
    alt: '四川甜水面摄影级生成图',
  },
  '四川|燃面': {
    url: '/food-images/sichuan-yibin-ranmian.png?v=1',
    alt: '四川宜宾燃面摄影级生成图',
  },
  '四川|宜宾腌菜': {
    url: '/food-images/sichuan-yibin-pickles.png?v=1',
    alt: '四川宜宾腌菜摄影级生成图',
  },
  '四川|泡菜鱼': {
    url: '/food-images/sichuan-pickled-fish.png?v=1',
    alt: '四川泡菜鱼摄影级生成图',
  },
  '四川|泡菜': {
    url: '/food-images/sichuan-paocai.png?v=1',
    alt: '四川泡菜摄影级生成图',
  },
  '四川|洋芋': {
    url: '/food-images/sichuan-liangshan-potatoes.png?v=1',
    alt: '四川凉山洋芋摄影级生成图',
  },
  '四川|彝族坨坨肉': {
    url: '/food-images/sichuan-tuotuorou.png?v=1',
    alt: '四川凉山彝族坨坨肉摄影级生成图',
  },
  '四川|凉糕': {
    url: '/food-images/sichuan-leshan-lianggao.png?v=1',
    alt: '四川乐山凉糕摄影级生成图',
  },
  '重庆|火锅': {
    url: '/food-images/chongqing-hotpot.png?v=1',
    alt: '重庆火锅摄影级生成图',
  },
  '重庆|小面': {
    url: '/food-images/chongqing-xiaomian.png?v=1',
    alt: '重庆小面摄影级生成图',
  },
  '重庆|涮黄喉': {
    url: '/food-images/chongqing-huanghou.png?v=1',
    alt: '重庆涮黄喉摄影级生成图',
  },
  '重庆|鸭肠': {
    url: '/food-images/chongqing-duck-intestines.png?v=1',
    alt: '重庆鸭肠摄影级生成图',
  },
};

const generatedImageSource = (url: string): MediaSource => ({
  title: '项目生成摄影图',
  author: 'OpenAI 图像生成',
  license: '项目内生成素材',
  url,
});

const episodeSeeds: EpisodeSeed[] = [
  {
    season: '第一季',
    episode: '第1集 自然的馈赠',
    source: wikipediaSource,
    items: ['云南香格里拉松茸', '浙江遂昌冬笋', '广西黄豆酸笋小黄鱼', '云南大理诺邓火腿', '湖北嘉鱼莲藕', '吉林查干湖冬季捕鱼', '南海远洋打渔'],
  },
  {
    season: '第一季',
    episode: '第2集 主食的故事',
    source: wikipediaSource,
    items: ['山西襄汾面食', '陕西绥德黄馍馍', '新疆库车馕', '贵州黎平米粉', '广东广州沙河粉', '陕西西安肉夹馍', '陕西西安泡馍', '甘肃兰州牛肉面', '广东广州竹升面', '广东广州云吞捞面', '陕西岐山臊子面', '浙江嘉兴粽子', '浙江宁波年糕', '年夜饭饺子'],
  },
  {
    season: '第一季',
    episode: '第3集 转化的灵感',
    source: wikipediaSource,
    items: ['云南建水烧豆腐', '云南石屏豆腐', '安徽寿县嫩豆腐', '内蒙古锡林郭勒奶豆腐', '内蒙古锡林郭勒奶茶', '安徽休宁毛豆腐', '安徽休宁米酒', '浙江绍兴黄酒', '浙江绍兴酱油', '黑龙江依兰大酱', '黑龙江依兰酸菜'],
  },
  {
    season: '第一季',
    episode: '第4集 时间的味道',
    source: wikipediaSource,
    items: ['朝鲜泡菜', '广东煲仔饭', '南安腊鸭', '湖南靖州腌禾花鱼', '湖南靖州腊肉', '安徽徽州臭鳜鱼', '安徽徽州刀板香火腿', '浙江金华火腿', '上海醉蟹', '台湾云林乌鱼子', '香港大澳虾膏', '香港大澳虾酱'],
  },
  {
    season: '第一季',
    episode: '第5集 厨房的秘密',
    source: wikipediaSource,
    items: ['云南香格里拉尼西黑陶煮制食品', '云南昆明汽锅鸡', '广东顺德均安露天村宴', '广东顺德粉葛蒸肉', '江苏扬州包子', '江苏扬州大煮干丝', '江苏扬州雪花鲥鱼', '江苏扬州清炖狮子头', '江苏扬州仿豹胎', '江苏扬州文思豆腐', '江苏扬州鉴真素鸭', '湖南长沙油炸臭豆腐', '山东葱烧海参', '浙江杭州西湖醋鱼', '香港家常妈妈菜'],
  },
  {
    season: '第一季',
    episode: '第6集 五味的调和',
    source: wikipediaSource,
    items: ['广东汕头糖葱薄饼', '广东汕头蔗渣熏鸭脯', '江苏无锡梁溪脆鳝', '江苏无锡加蟹小笼馒头', '江苏无锡手推馄饨', '江苏无锡酱排骨', '广东新会陈皮', '澳门陈皮鸭', '广东东江盐焗鸡', '江苏镇江香醋', '江苏镇江醋排', '四川泡椒', '四川鱼香肉丝', '四川豆瓣酱', '四川麻婆豆腐', '四川藤椒鱼', '重庆火锅', '广东汕头鱼丸紫菜煲', '广东广州清蒸鱼', '广东广州白切鸡'],
  },
  {
    season: '第一季',
    episode: '第7集 我们的田野',
    source: wikipediaSource,
    items: ['贵州从江新米节', '辽宁獐子岛海产品', '浙江湖州河蟹', '江苏靖江蟹黄汤包', '大闸蟹', '江苏兴化芋头', '蟹黄汪豆腐', '西藏青稞', '都市屋顶种菜'],
  },
  {
    season: '第二季',
    episode: '第1集 时节',
    source: wikipediaSource,
    items: ['雷笋炒肉丝', '铁锅炖鱼', '咸肉蒸黄泥拱竹笋', '榆钱饭', '九层皮', '紫苏炒青蛳', '玛仁糖', '切糕', '抓饭', '虾子小刀面', '桂花糯米藕', '板栗烧鸡', '老鸭雁来蕈'],
  },
  {
    season: '第二季',
    episode: '第2集 脚步',
    source: wikipediaSource,
    items: ['酥油蜂蜜', '蜂蜜鳗鱼', '蜜制酒心冰激凌', '麻辣香肠', '烟熏腊肉', '乐山嫩豆花', '蓝田裤带面', '红烧望潮', '清炖跳跳鱼', '煎饼卷大葱', '丝娃娃', '烤鸭卷饼', '食饼筒', '牛冻春', '雷山鱼酱', '鱼酱炖稻花鱼', '萝卜饭'],
  },
  {
    season: '第二季',
    episode: '第3集 心传',
    source: wikipediaSource,
    items: ['牛肉锅贴', '回锅肉', '徽州臭豆腐', '油炸锅巴', '蒜泥白肉', '凉拌猪耳', '空心挂面', '汉中面皮', '宁夏手擀面', '四川甜水面', '山西饸饹', '武汉热干面', '重庆小面', '苏州头汤面', '糯米卷', '苏式小方糕', '蕨根糍粑', '三角团', '蟹黄烧卖', '元松', '钳花小包', '四喜蒸饺', '金鱼酥', '船点', '汕头澄海蚝烙', '烫干丝', '葵花大斩肉', '脱骨鱼', '三套鸭', '扣三丝', '油爆河虾', '黄鳝啫啫煲'],
  },
  {
    season: '第二季',
    episode: '第4集 秘境',
    source: wikipediaSource,
    items: ['芋头饭', '手抓羊肉', '黄馍馍', '鲑鱼', '鱼子酱', '烤鱼', '螺蛳粉', '油茶', '酸肉', '糯米饭', '腌鱼', '腌肉', '腌菜', '侗族大歌宴'],
  },
  {
    season: '第二季',
    episode: '第5集 家常',
    source: wikipediaSource,
    items: ['燃面', '四川宜宾腌菜', '郓城西瓜酱', '盘锦大洼虾子焖茭白', '济南奶汤蒲菜', '淮安蒲菜水饺', '澳门陈皮红豆沙', '澳门姜撞奶', '小凹馍', '山西饸饹', '山西枣花馍', '天门蒸菜', '红烧肉', '河南抻面', '四川泡菜鱼', '四川泡菜', '泡椒凤爪'],
  },
  {
    season: '第二季',
    episode: '第6集 相逢',
    source: wikipediaSource,
    items: ['小鸡炖蘑菇', '北京涮肉火锅', '云南菌子火锅', '潮汕牛肉火锅', '涮黄喉', '鸭肠', '西湖醋鱼', '灌汤包', '片儿川', '新疆纳仁', '大盘鸡', '烤包子', '拉条子', '烧牛肉'],
  },
  {
    season: '第二季',
    episode: '第7集 三餐',
    source: wikipediaSource,
    items: ['天津煎饼果子', '武汉热干面', '广州早茶', '蒸腊鱼', '湘乡咸鸭蛋', '凉山洋芋', '彝族坨坨肉', '上海素食', '冰皮月饼', '枫镇大肉面'],
  },
  {
    season: '第三季',
    episode: '第1集 器',
    source: wikipediaSource,
    items: ['荞麦粑粑', '石锅松茸', '陕州十碗席', '扬州蒸点', '扬州瓜雕', '清水炒蛋', '九转大肠', '爆炒腰花', '翠珠鱼花', '金边白菜', '四川泡菜', '西蜀老坛泡菜鱼'],
  },
  {
    season: '第三季',
    episode: '第2集 香',
    source: wikipediaSource,
    items: ['稀豆粉', '汕头手打鱼丸', '麻辣烫', '凉糕', '胡辣汤', '煎饼果子', '泉州石花膏', '面线糊', '水盆羊肉'],
  },
  {
    season: '第三季',
    episode: '第3集 宴',
    source: wikipediaSource,
    items: ['全藕宴', '藕粉圆子', '水八仙', '八宝葫芦鸭', '沙茶焖牛肉', '封肉', '茄鲞', '玲珑牡丹鲊', '金齑玉脍', '雪霞羹', '平江十大碗'],
  },
  {
    season: '第三季',
    episode: '第4集 养',
    source: wikipediaSource,
    items: ['五汁膏', '枣泥山药糕', '蓑衣黄瓜', '枸杞羊肉', '猪肚鸡', '百合莲子', '艾叶豆腐', '老酒炖鸡子', '响螺片椰肉猪骨汤', '花胶炖鸡汤', '三草炖鹅', '酒糟芋头面', '山苍子根炖猪蹄', '牡蒿蒸嫩鸭', '败酱草小肠汤', '当归生姜羊肉汤'],
  },
  {
    season: '第三季',
    episode: '第5集 食',
    source: wikipediaSource,
    items: ['蟹粉豆腐', '松鼠鳜鱼', '白什盘', '胶州摔面', '香橼蜜制梨', '扣茄花', '江边辣', '薄饼鸡块', '津味豆腐脑', '红烧牛肉面', '南瓜煎饺', '卤肉饭', '黑椒藕饼', '胡萝卜丝鸡蛋饼', '麻酱荞麦油麦菜', '酱香饼'],
  },
  {
    season: '第三季',
    episode: '第6集 酥',
    source: wikipediaSource,
    items: ['寿包', '大福喜', '福寿饼', '九桃一手', '贵妃饼', '萨其马', '面果儿', '苏式重阳糕', '蘑菇包', '金鱼饺', '花卷', '琵琶结', '刺猬包', '嵌字豆糖', '渔亭糕', '荷花酥', '龙井茶酥', '叉烧包', '虾饺', '烧卖', '蛋挞'],
  },
  {
    season: '第三季',
    episode: '第7集 生',
    source: wikipediaSource,
    items: ['春饼', '清明粿', '野菜宴', '茶香饭', '茶鱼饺', '钻林欢喜丸', '茶聊鸡', '早春菠菜', '春卷', '夏至面', '西双版纳绿叶宴', '喃咪酱', '潜江全荷宴', '酸汤鱼', '富平柿饼', '柿子糊塌', '新竹柿饼', '五彩饭', '黄山咸肉', '海鲜饺子', '三鲜虾仁水饺', '七彩饺子', '甜晒鱼', '芋饺', '汤圆', '年糕饺', '鲅鱼饺子', '素静饺子'],
  },
  {
    season: '第三季',
    episode: '第8集 合',
    source: wikipediaSource,
    items: ['甜烧白', '羊肉粉', '糖醋排骨', '青笋碎滑肉', '生爆盐煎肉', '白菜炒白菜', '白菜饺子', '山西火锅', '客家盆菜'],
  },
  {
    season: '第四季',
    episode: '第1集 绝活',
    source: cflacSeason4Source,
    confidence: '待核实',
    items: ['红钳蟹', '大炉烧饼', '虱目鱼腹粥', '火爆腰花', '凉拌海蜇'],
  },
  {
    season: '第四季',
    episode: '第2集 烟火',
    source: cflacSeason4Source,
    confidence: '待核实',
    items: ['温州敲馄饨', '泰和早酒', '沙县烧麦', '沙县蒸饺', '沙县拌面', '沙县炖罐'],
  },
  {
    season: '第四季',
    episode: '第3集 焕发',
    source: cflacSeason4Source,
    confidence: '待核实',
    items: ['河南陕州柿子醋', '临湘红霉豆腐渣'],
  },
  {
    season: '第四季',
    episode: '第4集 天作',
    source: cctvSeason4Source,
    confidence: '待核实',
    items: ['鲜花椒红烧肉', '扇贝狮子头', '油酥烧饼'],
  },
  {
    season: '第四季',
    episode: '第5集 风物',
    source: cctvSeason4Source,
    confidence: '待核实',
    items: ['溪口卤鹅', '粉蒸芋头', '炭烤帝王蟹'],
  },
  {
    season: '第四季',
    episode: '第6集 洞天',
    source: cctvSeason4Source,
    confidence: '待核实',
    items: ['鱼圆汤', '烧猪', '慈姑烧肉'],
  },
  {
    season: '第四季',
    episode: '第7集 华流',
    source: cflacSeason4Source,
    confidence: '待核实',
    items: ['旧金山干拌馄饨', '鱼香茄子', '大同刀削面', '娘惹香辣鱼', '左宗棠鸡'],
  },
];

const placeCatalog: Record<string, PlaceSeed> = {
  云南香格里拉: { province: '云南', city: '香格里拉', region: '西南', longitude: 99.7068, latitude: 27.8269 },
  浙江遂昌: { province: '浙江', city: '遂昌', region: '华东', longitude: 119.276, latitude: 28.592 },
  广西: { province: '广西', city: '待核实', region: '华南', longitude: 108.3669, latitude: 22.817 },
  云南大理: { province: '云南', city: '大理', region: '西南', longitude: 100.2676, latitude: 25.6065 },
  湖北嘉鱼: { province: '湖北', city: '嘉鱼', region: '华中', longitude: 113.9392, latitude: 29.9706 },
  吉林查干湖: { province: '吉林', city: '松原', region: '东北', longitude: 124.8236, latitude: 45.1182 },
  南海: { province: '海南', city: '南海海域', region: '华南', longitude: 112.0, latitude: 16.0 },
  山西襄汾: { province: '山西', city: '襄汾', region: '华北', longitude: 111.4429, latitude: 35.8763 },
  陕西绥德: { province: '陕西', city: '绥德', region: '西北', longitude: 110.2632, latitude: 37.5029 },
  新疆库车: { province: '新疆', city: '库车', region: '西北', longitude: 82.963, latitude: 41.7174 },
  贵州黎平: { province: '贵州', city: '黎平', region: '西南', longitude: 109.1365, latitude: 26.2311 },
  广东广州: { province: '广东', city: '广州', region: '华南', longitude: 113.2644, latitude: 23.1291 },
  陕西西安: { province: '陕西', city: '西安', region: '西北', longitude: 108.9398, latitude: 34.3416 },
  甘肃兰州: { province: '甘肃', city: '兰州', region: '西北', longitude: 103.8343, latitude: 36.0611 },
  陕西岐山: { province: '陕西', city: '岐山', region: '西北', longitude: 107.621, latitude: 34.4437 },
  浙江嘉兴: { province: '浙江', city: '嘉兴', region: '华东', longitude: 120.7555, latitude: 30.7461 },
  浙江宁波: { province: '浙江', city: '宁波', region: '华东', longitude: 121.5504, latitude: 29.8746 },
  云南建水: { province: '云南', city: '建水', region: '西南', longitude: 102.8266, latitude: 23.6347 },
  云南石屏: { province: '云南', city: '石屏', region: '西南', longitude: 102.4962, latitude: 23.7056 },
  安徽寿县: { province: '安徽', city: '寿县', region: '华东', longitude: 116.7871, latitude: 32.5733 },
  内蒙古锡林郭勒: { province: '内蒙古', city: '锡林郭勒', region: '华北', longitude: 116.0477, latitude: 43.9332 },
  安徽休宁: { province: '安徽', city: '休宁', region: '华东', longitude: 118.1937, latitude: 29.7841 },
  浙江绍兴: { province: '浙江', city: '绍兴', region: '华东', longitude: 120.5822, latitude: 29.9971 },
  黑龙江依兰: { province: '黑龙江', city: '依兰', region: '东北', longitude: 129.5677, latitude: 46.3257 },
  广东: { province: '广东', city: '待核实', region: '华南', longitude: 113.2665, latitude: 23.1322 },
  南安: { province: '福建', city: '南安', region: '华东', longitude: 118.3863, latitude: 24.9604 },
  湖南靖州: { province: '湖南', city: '靖州', region: '华中', longitude: 109.6962, latitude: 26.5758 },
  安徽徽州: { province: '安徽', city: '黄山', region: '华东', longitude: 118.3375, latitude: 29.7147 },
  浙江金华: { province: '浙江', city: '金华', region: '华东', longitude: 119.6474, latitude: 29.0791 },
  上海: { province: '上海', city: '上海', region: '华东', longitude: 121.4737, latitude: 31.2304 },
  台湾云林: { province: '台湾', city: '云林', region: '港澳台', longitude: 120.3897, latitude: 23.7559 },
  香港大澳: { province: '香港', city: '大澳', region: '港澳台', longitude: 113.862, latitude: 22.255 },
  云南昆明: { province: '云南', city: '昆明', region: '西南', longitude: 102.8329, latitude: 24.8801 },
  广东顺德: { province: '广东', city: '佛山顺德', region: '华南', longitude: 113.2934, latitude: 22.8052 },
  江苏扬州: { province: '江苏', city: '扬州', region: '华东', longitude: 119.4129, latitude: 32.3942 },
  湖南长沙: { province: '湖南', city: '长沙', region: '华中', longitude: 112.9388, latitude: 28.2282 },
  山东: { province: '山东', city: '待核实', region: '华东', longitude: 117.1201, latitude: 36.6512 },
  浙江杭州: { province: '浙江', city: '杭州', region: '华东', longitude: 120.1551, latitude: 30.2741 },
  广东汕头: { province: '广东', city: '汕头', region: '华南', longitude: 116.6819, latitude: 23.3541 },
  江苏无锡: { province: '江苏', city: '无锡', region: '华东', longitude: 120.3124, latitude: 31.4912 },
  广东新会: { province: '广东', city: '江门新会', region: '华南', longitude: 113.0389, latitude: 22.4583 },
  澳门: { province: '澳门', city: '澳门', region: '港澳台', longitude: 113.5439, latitude: 22.1987 },
  广东东江: { province: '广东', city: '东江流域', region: '华南', longitude: 114.4168, latitude: 23.1123 },
  江苏镇江: { province: '江苏', city: '镇江', region: '华东', longitude: 119.425, latitude: 32.188 },
  四川: { province: '四川', city: '待核实', region: '西南', longitude: 104.0665, latitude: 30.5723 },
  重庆: { province: '重庆', city: '重庆', region: '西南', longitude: 106.5516, latitude: 29.563 },
  贵州从江: { province: '贵州', city: '从江', region: '西南', longitude: 108.9055, latitude: 25.7542 },
  辽宁獐子岛: { province: '辽宁', city: '大连獐子岛', region: '东北', longitude: 122.7391, latitude: 39.0425 },
  浙江湖州: { province: '浙江', city: '湖州', region: '华东', longitude: 120.0868, latitude: 30.8943 },
  江苏靖江: { province: '江苏', city: '靖江', region: '华东', longitude: 120.2771, latitude: 31.9828 },
  江苏兴化: { province: '江苏', city: '兴化', region: '华东', longitude: 119.8525, latitude: 32.9104 },
  西藏: { province: '西藏', city: '待核实', region: '西南', longitude: 91.1409, latitude: 29.6456 },
  乐山: { province: '四川', city: '乐山', region: '西南', longitude: 103.7656, latitude: 29.5521 },
  蓝田: { province: '陕西', city: '蓝田', region: '西北', longitude: 109.3235, latitude: 34.1513 },
  雷山: { province: '贵州', city: '雷山', region: '西南', longitude: 108.0775, latitude: 26.3817 },
  汉中: { province: '陕西', city: '汉中', region: '西北', longitude: 107.0238, latitude: 33.0675 },
  宁夏: { province: '宁夏', city: '待核实', region: '西北', longitude: 106.2309, latitude: 38.4872 },
  武汉: { province: '湖北', city: '武汉', region: '华中', longitude: 114.3054, latitude: 30.5931 },
  苏州: { province: '江苏', city: '苏州', region: '华东', longitude: 120.5853, latitude: 31.2989 },
  汕头澄海: { province: '广东', city: '汕头澄海', region: '华南', longitude: 116.7561, latitude: 23.4661 },
  郓城: { province: '山东', city: '郓城', region: '华东', longitude: 115.9444, latitude: 35.5963 },
  盘锦大洼: { province: '辽宁', city: '盘锦大洼', region: '东北', longitude: 122.0717, latitude: 40.9941 },
  济南: { province: '山东', city: '济南', region: '华东', longitude: 117.1201, latitude: 36.6512 },
  淮安: { province: '江苏', city: '淮安', region: '华东', longitude: 119.0153, latitude: 33.6104 },
  天门: { province: '湖北', city: '天门', region: '华中', longitude: 113.1661, latitude: 30.6634 },
  河南: { province: '河南', city: '待核实', region: '华中', longitude: 113.6254, latitude: 34.7466 },
  北京: { province: '北京', city: '北京', region: '华北', longitude: 116.4074, latitude: 39.9042 },
  云南: { province: '云南', city: '待核实', region: '西南', longitude: 102.8329, latitude: 24.8801 },
  潮汕: { province: '广东', city: '潮汕', region: '华南', longitude: 116.6226, latitude: 23.6567 },
  新疆: { province: '新疆', city: '待核实', region: '西北', longitude: 87.6168, latitude: 43.8256 },
  广州: { province: '广东', city: '广州', region: '华南', longitude: 113.2644, latitude: 23.1291 },
  湘乡: { province: '湖南', city: '湘乡', region: '华中', longitude: 112.5351, latitude: 27.7354 },
  凉山: { province: '四川', city: '凉山', region: '西南', longitude: 102.2677, latitude: 27.8816 },
  扬州: { province: '江苏', city: '扬州', region: '华东', longitude: 119.4129, latitude: 32.3942 },
  汕头: { province: '广东', city: '汕头', region: '华南', longitude: 116.6819, latitude: 23.3541 },
  泉州: { province: '福建', city: '泉州', region: '华东', longitude: 118.6757, latitude: 24.8741 },
  胶州: { province: '山东', city: '胶州', region: '华东', longitude: 120.0334, latitude: 36.2647 },
  天津: { province: '天津', city: '天津', region: '华北', longitude: 117.2009, latitude: 39.0842 },
  富平: { province: '陕西', city: '富平', region: '西北', longitude: 109.1802, latitude: 34.7511 },
  新竹: { province: '台湾', city: '新竹', region: '港澳台', longitude: 120.9647, latitude: 24.8138 },
  黄山: { province: '安徽', city: '黄山', region: '华东', longitude: 118.3375, latitude: 29.7147 },
  东北: { province: '黑龙江', city: '东北地区', region: '东北', longitude: 126.5349, latitude: 45.8038 },
  山西: { province: '山西', city: '待核实', region: '华北', longitude: 112.5489, latitude: 37.8706 },
  客家: { province: '广东', city: '客家地区', region: '华南', longitude: 116.1176, latitude: 24.2991 },
  温州: { province: '浙江', city: '温州', region: '华东', longitude: 120.6994, latitude: 27.9949 },
  泰和: { province: '江西', city: '泰和', region: '华东', longitude: 114.9089, latitude: 26.7902 },
  沙县: { province: '福建', city: '三明沙县', region: '华东', longitude: 117.7925, latitude: 26.3973 },
  河南陕州: { province: '河南', city: '三门峡陕州', region: '华中', longitude: 111.1033, latitude: 34.7201 },
  临湘: { province: '湖南', city: '临湘', region: '华中', longitude: 113.4502, latitude: 29.4768 },
  溪口: { province: '浙江', city: '宁波溪口', region: '华东', longitude: 121.2747, latitude: 29.6882 },
  大同: { province: '山西', city: '大同', region: '华北', longitude: 113.3001, latitude: 40.0768 },
  旧金山: { province: '海外', city: '美国旧金山', region: '海外', longitude: -122.4194, latitude: 37.7749 },
};

const exactPlaceCatalog: Record<string, PlaceSeed> = {
  酥油蜂蜜: { province: '西藏', city: '林芝波密', region: '西南', longitude: 95.7685, latitude: 29.8588, source: cctvSeason2FootstepsSource },
  红烧望潮: { province: '浙江', city: '三门湾', region: '华东', longitude: 121.5091, latitude: 29.1054, source: cctvSeason2FootstepsSource },
  清炖跳跳鱼: { province: '浙江', city: '三门湾', region: '华东', longitude: 121.5091, latitude: 29.1054, source: cctvSeason2FootstepsSource },
  煎饼卷大葱: {
    province: '山东',
    city: '临沂沂蒙山',
    region: '华东',
    longitude: 118.3477,
    latitude: 35.0514,
    source: cctvClipSource('央视网《舌尖上的中国 第二季》山东煎饼最原始的制作手法', 'https://tv.cctv.com/2014/04/18/VIDE1397835557566956.shtml'),
  },
  丝娃娃: { province: '贵州', city: '贵阳', region: '西南', longitude: 106.6302, latitude: 26.6477, source: cctvSeason2FootstepsSource },
  雷山鱼酱: {
    province: '贵州',
    city: '雷山',
    region: '西南',
    longitude: 108.0775,
    latitude: 26.3817,
    source: cctvClipSource('央视网《舌尖上的中国 第二季》糯米稻花鱼和雷山鱼酱', 'https://tv.cctv.com/v/v1/VIDE1397836280706642.html'),
  },
  鱼酱炖稻花鱼: {
    province: '贵州',
    city: '雷山',
    region: '西南',
    longitude: 108.0775,
    latitude: 26.3817,
    source: cctvClipSource('央视网《舌尖上的中国 第二季》糯米稻花鱼和雷山鱼酱', 'https://tv.cctv.com/v/v1/VIDE1397836280706642.html'),
  },
  萝卜饭: { province: '福建', city: '泉州', region: '华东', longitude: 118.6757, latitude: 24.8741, source: cctvSeason2FootstepsSource },
  燃面: { province: '四川', city: '宜宾', region: '西南', longitude: 104.6428, latitude: 28.7523, source: cctvSeason2VideoIndexSource },
  四川宜宾腌菜: { province: '四川', city: '宜宾', region: '西南', longitude: 104.6428, latitude: 28.7523, source: cctvSeason2VideoIndexSource },
  灌汤包: { province: '河南', city: '开封', region: '华中', longitude: 114.3143, latitude: 34.7973, source: cctvSeason2VideoIndexSource },
  片儿川: { province: '浙江', city: '杭州', region: '华东', longitude: 120.1551, latitude: 30.2741, source: cctvSeason2VideoIndexSource },
  大盘鸡: { province: '新疆', city: '待核实', region: '西北', longitude: 87.6168, latitude: 43.8256, source: cctvSeason2VideoIndexSource },
  手抓羊肉: { province: '宁夏', city: '待核实', region: '西北', longitude: 106.2309, latitude: 38.4872, source: cctvSeason2VideoIndexSource },
  凉山洋芋: { province: '四川', city: '凉山', region: '西南', longitude: 102.2677, latitude: 27.8816, source: cctvSeason2VideoIndexSource },
  彝族坨坨肉: { province: '四川', city: '凉山', region: '西南', longitude: 102.2677, latitude: 27.8816, source: cctvSeason2VideoIndexSource },
  枫镇大肉面: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: cctvClipSource('央视网《舌尖上的中国第二季》苏州枫镇大肉面', 'https://tv.cctv.com/2014/05/30/VIDE1401455353253353.shtml'),
  },
  徽州臭豆腐: {
    province: '安徽',
    city: '徽州',
    region: '华东',
    longitude: 118.3375,
    latitude: 29.7147,
    source: cctvClipSource('央视网《舌尖2》心传之谜', 'https://big5.cctv.com/gate/big5/shejian2.cntv.cn/2014/04/27/ARTI1398606701533908.shtml'),
  },
  空心挂面: {
    province: '陕西',
    city: '待核实',
    region: '西北',
    longitude: 108.9398,
    latitude: 34.3416,
    source: cctvClipSource('央视网《舌尖2》心传之谜', 'https://big5.cctv.com/gate/big5/shejian2.cntv.cn/2014/04/27/ARTI1398606701533908.shtml'),
  },
  扣三丝: {
    province: '上海',
    city: '上海',
    region: '华东',
    longitude: 121.4737,
    latitude: 31.2304,
    source: cctvClipSource('央视网《舌尖2》心传之谜', 'https://big5.cctv.com/gate/big5/shejian2.cntv.cn/2014/04/27/ARTI1398606701533908.shtml'),
  },
  烫干丝: {
    province: '江苏',
    city: '扬州',
    region: '华东',
    longitude: 119.4129,
    latitude: 32.3942,
    source: cctvClipSource('央视网《舌尖2》心传之谜', 'https://big5.cctv.com/gate/big5/shejian2.cntv.cn/2014/04/27/ARTI1398606701533908.shtml'),
  },
  三套鸭: {
    province: '江苏',
    city: '扬州',
    region: '华东',
    longitude: 119.4129,
    latitude: 32.3942,
    source: cctvClipSource('央视网《舌尖2》心传之谜', 'https://big5.cctv.com/gate/big5/shejian2.cntv.cn/2014/04/27/ARTI1398606701533908.shtml'),
  },
  板栗烧鸡: {
    province: '江苏',
    city: '溧阳',
    region: '华东',
    longitude: 119.4842,
    latitude: 31.4169,
    source: cctvClipSource('央视网《舌尖上的中国第二季》江苏溧阳板栗烧鸡', 'https://tv.cctv.com/2014/05/02/VIDE1399039222507402.shtml'),
  },
  桂花糯米藕: {
    province: '江苏',
    city: '苏州吴江',
    region: '华东',
    longitude: 120.6452,
    latitude: 31.1387,
    source: cctvClipSource('央视网《舌尖上的中国第二季》苏州吴江桂花糯米藕', 'https://tv.cctv.com/2014/05/02/VIDE1399038858604151.shtml'),
  },
  九层皮: {
    province: '江西',
    city: '赣州',
    region: '华东',
    longitude: 114.935,
    latitude: 25.8311,
    source: cctvClipSource('央视网《舌尖上的中国第二季》江西赣州米糕——九层皮', 'https://tv.cctv.com/2014/05/02/VIDE1399037064005528.shtml'),
  },
  老鸭雁来蕈: {
    province: '江苏',
    city: '溧阳',
    region: '华东',
    longitude: 119.4842,
    latitude: 31.4169,
    source: cctvClipSource('央视网《舌尖上的中国第二季》江苏溧阳老鸭雁来蕈', 'https://tv.cctv.com/2014/05/02/VIDE1399039747831161.shtml'),
  },
  雷笋炒肉丝: {
    province: '浙江',
    city: '临安',
    region: '华东',
    longitude: 119.7247,
    latitude: 30.2345,
    source: cctvClipSource('央视网《舌尖上的中国第二季》第一集 时节', 'https://tv.cctv.com/2018/02/12/VIDEfRwKwKQU1SLLkN3MxjKr180212.shtml'),
  },
  玛仁糖: {
    province: '新疆',
    city: '和田',
    region: '西北',
    longitude: 79.9225,
    latitude: 37.1143,
    source: cctvClipSource('央视网《舌尖上的中国第二季》新疆和田切糕——玛仁糖', 'https://tv.cctv.com/2014/05/02/VIDE1399037950491769.shtml'),
  },
  切糕: {
    province: '新疆',
    city: '和田',
    region: '西北',
    longitude: 79.9225,
    latitude: 37.1143,
    source: cctvClipSource('央视网《舌尖上的中国第二季》新疆和田切糕——玛仁糖', 'https://tv.cctv.com/2014/05/02/VIDE1399037950491769.shtml'),
  },
  抓饭: {
    province: '新疆',
    city: '吐鲁番',
    region: '西北',
    longitude: 89.1895,
    latitude: 42.9513,
    source: cctvClipSource('央视网《舌尖上的中国第二季》新疆吐鲁番手抓饭', 'https://tv.cctv.com/2014/05/02/VIDE1399038132402993.shtml'),
  },
  紫苏炒青蛳: {
    province: '浙江',
    city: '开化',
    region: '华东',
    longitude: 118.4155,
    latitude: 29.1373,
    source: cctvClipSource('央视网《舌尖上的中国第二季》浙江开化昼伏夜出的青蛳', 'https://tv.cctv.com/2014/05/02/VIDE1399037587485377.shtml'),
  },
  虾子小刀面: {
    province: '安徽',
    city: '芜湖',
    region: '华东',
    longitude: 118.4331,
    latitude: 31.3525,
    source: cctvClipSource('央视网《舌尖上的中国第二季》安徽芜湖虾子小刀面', 'https://tv.cctv.com/2014/05/02/VIDE1399038317428306.shtml'),
  },
  咸肉蒸黄泥拱竹笋: {
    province: '浙江',
    city: '临安',
    region: '华东',
    longitude: 119.7247,
    latitude: 30.2345,
    source: cctvClipSource('央视网《舌尖上的中国第二季》浙江临安咸肉蒸黄泥拱', 'https://tv.cctv.com/2014/05/02/VIDE1399036519100539.shtml'),
  },
  铁锅炖鱼: {
    province: '黑龙江',
    city: '东北地区',
    region: '东北',
    longitude: 126.5349,
    latitude: 45.8038,
    source: cctvClipSource('央视网《舌尖上的中国第二季》东北铁锅炖鱼贴饼子', 'https://tv.cctv.com/2014/05/02/VIDE1399036157494265.shtml'),
  },
  红烧肉: {
    province: '上海',
    city: '上海',
    region: '华东',
    longitude: 121.4737,
    latitude: 31.2304,
    source: cctvClipSource('央视网《舌尖上的中国第二季》上海红烧肉', 'https://tv.cctv.com/2014/05/09/VIDE1399643465504417.shtml'),
  },
  水盆羊肉: {
    province: '陕西',
    city: '西安',
    region: '西北',
    longitude: 108.9398,
    latitude: 34.3416,
    source: cctvClipSource('央视网《舌尖上的中国》第三季正月初四暖心开播', 'https://tv.cctv.com/2018/02/10/ARTIZ4Wsm02wlUqoaImL1aoR180210.shtml'),
  },
  白什盘: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: cctvClipSource('央视网《舌尖上的中国3》苏州菜：白什盘', 'https://tv.cctv.com/2018/02/23/VIDEvo5ikXHCzFuhwLEzmuP4180223.shtml'),
  },
  香橼蜜制梨: {
    province: '云南',
    city: '丽江',
    region: '西南',
    longitude: 100.2278,
    latitude: 26.855,
    source: cctvClipSource('央视网《舌尖上的中国3》味·云南', 'https://tv.cctv.com/2018/02/23/VIDE9w9hJsS2rcXGFlbn1xGn180223.shtml'),
  },
  荷花酥: {
    province: '浙江',
    city: '杭州',
    region: '华东',
    longitude: 120.1551,
    latitude: 30.2741,
    source: cctvClipSource('央视网《舌尖上的中国3》杭州荷花酥', 'https://tv.cctv.com/2018/02/24/VIDEgEH0XN3PtYoHQizpS7k3180224.shtml'),
  },
  嵌字豆糖: {
    province: '安徽',
    city: '徽州',
    region: '华东',
    longitude: 118.3375,
    latitude: 29.7147,
    source: cctvClipSource('央视网《舌尖上的中国3》嵌字豆糖', 'https://tv.cctv.com/2018/02/24/VIDEFOgf9halpAezv77m4AoX180224.shtml'),
  },
  柿子糊塌: {
    province: '陕西',
    city: '富平',
    region: '西北',
    longitude: 109.1802,
    latitude: 34.7511,
    source: cctvClipSource('央视网《舌尖上的中国3》霜降摘柿：柿子糊塌 台湾新竹柿饼', 'https://tv.cctv.com/2018/02/25/VIDELPfZzAaGv0di7pnf9jWe180225.shtml'),
  },
  酸汤鱼: {
    province: '贵州',
    city: '黔东南',
    region: '西南',
    longitude: 107.9775,
    latitude: 26.5834,
    source: cctvClipSource('央视网《舌尖上的中国3》苗族酸汤鱼', 'https://tv.cctv.com/2018/02/25/VIDEeoPX6TV8ml3Mepejv2PO180225.shtml'),
  },
  七彩饺子: {
    province: '山东',
    city: '胶东地区',
    region: '华东',
    longitude: 120.7402,
    latitude: 37.5366,
    source: cctvClipSource('央视网《舌尖上的中国3》七彩饺子', 'https://tv.cctv.com/2018/02/25/VIDEnNuDLHMlApD0YOMXx1fC180225.shtml'),
  },
  鲅鱼饺子: {
    province: '山东',
    city: '胶东地区',
    region: '华东',
    longitude: 120.7402,
    latitude: 37.5366,
    source: cctvClipSource('央视网《舌尖上的中国3》甜晒鲅鱼水饺', 'https://tv.cctv.com/v/v1/VIDEAXHMmfuRZd3DiWvWIdXd180225.html'),
  },
  甜烧白: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: cctvClipSource('央视网《舌尖上的中国3》四川甜烧白', 'https://tv.cctv.com/2018/02/26/VIDE8Pdy3dqUNHF9Ny7vvuCU180226.shtml'),
  },
  渔亭糕: {
    province: '安徽',
    city: '徽州',
    region: '华东',
    longitude: 118.3375,
    latitude: 29.7147,
    source: cctvClipSource('央视网《舌尖上的中国3》渔亭糕', 'https://tv.cctv.com/2018/02/24/VIDEHIUgL9FsDM37ZsE3L92o180224.shtml'),
  },
  回锅肉: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  油爆河虾: {
    province: '上海',
    city: '上海',
    region: '华东',
    longitude: 121.4737,
    latitude: 31.2304,
    source: cctvClipSource('央视网《舌尖上的中国第二季》考校火候的油爆河虾', 'https://tv.cctv.com/2014/04/25/VIDE1398435493261249.shtml'),
  },
  泡椒凤爪: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  西湖醋鱼: {
    province: '浙江',
    city: '杭州',
    region: '华东',
    longitude: 120.1551,
    latitude: 30.2741,
    source: cctvClipSource('央视网《舌尖上的中国第二季》杭州西湖醋鱼', 'https://tv.cctv.com/2014/05/16/VIDE1400246661249791.shtml'),
  },
  爆炒腰花: {
    province: '山东',
    city: '待核实',
    region: '华东',
    longitude: 117.1201,
    latitude: 36.6512,
    source: githubCuisineSource('鲁菜', 'lucai'),
    confidence: '待核实',
  },
  麻辣烫: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  藕粉圆子: {
    province: '浙江',
    city: '待核实',
    region: '华东',
    longitude: 120.1551,
    latitude: 30.2741,
    source: githubCuisineSource('浙菜', 'zhecai'),
    confidence: '待核实',
  },
  蟹粉豆腐: {
    province: '上海',
    city: '上海',
    region: '华东',
    longitude: 121.4737,
    latitude: 31.2304,
    source: githubCuisineSource('沪菜', 'hucai'),
    confidence: '待核实',
  },
  刺猬包: {
    province: '上海',
    city: '上海',
    region: '华东',
    longitude: 121.4737,
    latitude: 31.2304,
    source: githubCuisineSource('沪菜', 'hucai'),
    confidence: '待核实',
  },
  生爆盐煎肉: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  火爆腰花: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  凉拌海蜇: {
    province: '上海',
    city: '上海',
    region: '华东',
    longitude: 121.4737,
    latitude: 31.2304,
    source: githubCuisineSource('沪菜', 'hucai'),
    confidence: '待核实',
  },
  鱼香茄子: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  石锅松茸: {
    province: '云南',
    city: '待核实',
    region: '西南',
    longitude: 102.8329,
    latitude: 24.8801,
    source: cctvClipSource('央视网《舌尖上的中国3》云南石锅：石烹松茸', 'https://tv.cctv.com/2018/02/19/VIDEjYljEfF9dRGUpwnbBLvt180219.shtml'),
  },
  陕州十碗席: {
    province: '河南',
    city: '三门峡陕州',
    region: '华中',
    longitude: 111.1033,
    latitude: 34.7201,
    source: cctvClipSource('央视网《舌尖上的中国3》七孔穿山灶：幸福婚宴', 'https://tv.cctv.com/2018/02/19/VIDEhW48fZdY3VQ5myfMJAFj180219.shtml'),
  },
  清水炒蛋: {
    province: '山东',
    city: '济南章丘',
    region: '华东',
    longitude: 117.5262,
    latitude: 36.6813,
    source: cctvClipSource('央视网《舌尖上的中国3》章丘铁锅：煎转黄花鱼 清水炒鸡蛋 九转大肠', 'https://tv.cctv.com/2018/02/19/VIDEagL3Y6D9yDWpHU6dzfh1180219.shtml'),
  },
  九转大肠: {
    province: '山东',
    city: '济南章丘',
    region: '华东',
    longitude: 117.5262,
    latitude: 36.6813,
    source: cctvClipSource('央视网《舌尖上的中国3》章丘铁锅：煎转黄花鱼 清水炒鸡蛋 九转大肠', 'https://tv.cctv.com/2018/02/19/VIDEagL3Y6D9yDWpHU6dzfh1180219.shtml'),
  },
  翠珠鱼花: {
    province: '江苏',
    city: '扬州',
    region: '华东',
    longitude: 119.4129,
    latitude: 32.3942,
    source: cctvClipSource('央视网《舌尖上的中国3》中国菜刀：扬州瓜雕 翠珠鱼花', 'https://tv.cctv.com/2018/02/19/VIDEdU4jLMqyDGpLk4w44Jym180219.shtml'),
  },
  稀豆粉: {
    province: '云南',
    city: '腾冲',
    region: '西南',
    longitude: 98.4976,
    latitude: 25.0205,
    source: cctvClipSource('央视网《舌尖上的中国3》云南腾冲稀豆粉', 'https://tv.cctv.com/2018/02/20/VIDENfj6vyhXfJo0NSWk38ym180220.shtml'),
  },
  凉糕: {
    province: '四川',
    city: '乐山',
    region: '西南',
    longitude: 103.7656,
    latitude: 29.5521,
    source: cctvClipSource('央视网《舌尖上的中国3》四川乐山凉糕', 'https://tv.cctv.com/2018/02/20/VIDETmObZ8hvAAtET2wkP1eD180220.shtml'),
  },
  胡辣汤: {
    province: '河南',
    city: '待核实',
    region: '华中',
    longitude: 113.6254,
    latitude: 34.7466,
    source: cctvClipSource('央视网《舌尖上的中国3》胡辣汤', 'https://tv.cctv.com/2018/02/20/VIDE7boI03q5tohkFMkAW4gG180220.shtml'),
  },
  煎饼果子: {
    province: '天津',
    city: '天津',
    region: '华北',
    longitude: 117.2009,
    latitude: 39.0842,
    source: cctvClipSource('央视网《舌尖上的中国3》天津煎饼馃子', 'https://tv.cctv.com/2018/02/20/VIDEf83WDZvkmc2xHm36Q6O1180220.shtml'),
  },
  泉州石花膏: {
    province: '福建',
    city: '泉州',
    region: '华东',
    longitude: 118.6757,
    latitude: 24.8741,
    source: cctvClipSource('央视网《舌尖上的中国3》福建泉州石花膏', 'https://tv.cctv.com/2018/02/20/VIDEODqFL4X2PnFNP9ddKaOd180220.shtml'),
  },
  面线糊: {
    province: '福建',
    city: '泉州',
    region: '华东',
    longitude: 118.6757,
    latitude: 24.8741,
    source: cctvClipSource('央视网《舌尖上的中国3》福建泉州面线糊', 'https://tv.cctv.com/2018/02/20/VIDEO3qaUoDTJ29vFGtoyEcj180220.shtml'),
  },
  水八仙: {
    province: '安徽',
    city: '芜湖',
    region: '华东',
    longitude: 118.4331,
    latitude: 31.3525,
    source: cctvClipSource('央视网《舌尖上的中国3》芜湖水八仙', 'https://tv.cctv.com/2018/02/21/VIDEvMfDPEi8sJSNSOTPrWmP180221.shtml'),
  },
  沙茶焖牛肉: {
    province: '福建',
    city: '厦门',
    region: '华东',
    longitude: 118.0894,
    latitude: 24.4798,
    source: cctvClipSource('央视网《舌尖上的中国3》闽南特色的国际宴席', 'https://tv.cctv.com/2018/02/21/VIDEolrxwyhxCGC5XECqYCv9180221.shtml'),
  },
  面线: {
    province: '福建',
    city: '厦门',
    region: '华东',
    longitude: 118.0894,
    latitude: 24.4798,
    source: cctvClipSource('央视网《舌尖上的中国3》闽南特色的国际宴席', 'https://tv.cctv.com/2018/02/21/VIDEolrxwyhxCGC5XECqYCv9180221.shtml'),
  },
  平江十大碗: {
    province: '湖南',
    city: '平江',
    region: '华中',
    longitude: 113.5812,
    latitude: 28.702,
    source: cctvClipSource('央视网《舌尖上的中国3》宗族宴：十大碗', 'https://tv.cctv.com/2018/02/21/VIDErIj3H0V9BxeHbC0UU9Aj180221.shtml'),
  },
  松鼠鳜鱼: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: cctvClipSource('央视网《舌尖上的中国3》苏帮菜：松鼠鳜鱼', 'https://tv.cctv.com/2018/02/23/VIDECZNLXmRptB2AKfOU5Qdp180223.shtml'),
  },
  蒜泥白肉: {
    province: '四川',
    city: '宜宾李庄',
    region: '西南',
    longitude: 104.8129,
    latitude: 28.8026,
    source: cctvClipSource('央视网《绝色川菜》李庄刀口蒜泥白肉', 'https://tv.cctv.com/2020/12/27/VIDEmqfJoiCiCzA264XpfizD201227.shtml'),
  },
  苏式小方糕: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  蕨根糍粑: {
    province: '湖南',
    city: '郴州宜章莽山',
    region: '华中',
    longitude: 112.9446,
    latitude: 24.9545,
    source: cctvClipSource('央视网《舌尖上的中国第二季》瑶族蕨根糍粑', 'https://tv.cctv.com/2014/04/25/VIDE1398433151711148.shtml'),
  },
  三角团: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  蟹黄烧卖: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  元松: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  钳花小包: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  四喜蒸饺: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  金鱼酥: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  船点: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('我苏网 / 苏州发布《〈舌尖3〉今晚开播 这道入选的苏州美食你吃过吗？》', '苏州发布 / 我苏网', 'https://www.ourjiangsu.com/a/20180219/1519013059247.shtml'),
  },
  红钳蟹: {
    province: '浙江',
    city: '宁波鄞州咸祥',
    region: '华东',
    longitude: 121.7835,
    latitude: 29.7607,
    source: referenceSource('潮新闻《央视初六开播的“舌尖4” 开篇讲述咸祥“荡蟹”》', '潮新闻', 'https://tidenews.com.cn/tmh_news.html?id=679f0bd4a06add000111bbb3'),
    confidence: '已核实',
  },
  大炉烧饼: {
    province: '江苏',
    city: '泰州姜堰',
    region: '华东',
    longitude: 120.1281,
    latitude: 32.5088,
    source: referenceSource('中国江苏网《泰州姜堰大炉烧饼登上〈舌尖上的中国〉》', '泰州日报 / 中国江苏网', 'https://jsnews.jschina.com.cn/tz/a/202502/t20250226_s67d91a17e4b01708361af8b4.shtml'),
    confidence: '已核实',
  },
  虱目鱼腹粥: {
    province: '台湾',
    city: '台南',
    region: '港澳台',
    longitude: 120.227,
    latitude: 22.9997,
    source: referenceSource('爱传媒《〈舌尖上的中国（第四季）〉开启美食新视野 首集台南绝活入镜》', '爱传媒', 'https://www.i-media.tw/Article/Detail/38187'),
    confidence: '已核实',
  },
  油酥烧饼: {
    province: '天津',
    city: '天津',
    region: '华北',
    longitude: 117.2009,
    latitude: 39.0842,
    source: referenceSource('北京旅游网《天津这种美食登上“舌尖4”！》', '南开文化旅游 / 北京旅游网', 'https://www.visitbeijing.com.cn/article/4LRalvYO9I6'),
    confidence: '已核实',
  },
  溪口卤鹅: {
    province: '广东',
    city: '潮州饶平',
    region: '华南',
    longitude: 117.0039,
    latitude: 23.6641,
    source: referenceSource('中国潮州美食网《潮州美食登上央视〈舌尖上的中国〉》', '央视频 / 中国潮州美食网', 'https://www.czcityofgastronomy.com/detail/1903'),
    confidence: '已核实',
  },
  粉蒸芋头: {
    province: '湖北',
    city: '仙桃',
    region: '华中',
    longitude: 113.4539,
    latitude: 30.3649,
    source: referenceSource('潮州日报《潮州美食今晚将亮相央视〈舌尖上的中国（第四季）〉第五集》', '潮州日报', 'https://www.chaozhoudaily.com/content/202502/25/c26025336.html'),
    confidence: '已核实',
  },
  炭烤帝王蟹: {
    province: '吉林',
    city: '珲春',
    region: '东北',
    longitude: 130.3658,
    latitude: 42.8628,
    source: referenceSource('潮州日报《潮州美食今晚将亮相央视〈舌尖上的中国（第四季）〉第五集》', '潮州日报', 'https://www.chaozhoudaily.com/content/202502/25/c26025336.html'),
    confidence: '已核实',
  },
  娘惹香辣鱼: {
    province: '海外',
    city: '马来西亚',
    region: '海外',
    longitude: 101.6869,
    latitude: 3.139,
    source: referenceSource('香港电台《31看世界 - 舌尖上的中国（第四季）》第7集 华流', '香港电台', 'https://www.rthk.hk/tv/dtt31/programme/abiteofchinaiv'),
    confidence: '已核实',
  },
  鲜花椒红烧肉: {
    province: '河北',
    city: '邯郸涉县',
    region: '华北',
    longitude: 113.6737,
    latitude: 36.5631,
    source: referenceSource('北京旅游网《河北美食惊艳亮相〈舌尖上的中国〉》', '河北旅游 / 北京旅游网', 'https://www.visitbeijing.com.cn/article/4LRaU6ErmA7'),
    confidence: '已核实',
  },
  慈姑烧肉: {
    province: '江苏',
    city: '苏州',
    region: '华东',
    longitude: 120.5853,
    latitude: 31.2989,
    source: referenceSource('CCTV纪录官方频道《慈姑烧肉慈姑马蹄肉饼酿慈姑 苏州人将慈姑做出万千滋味》', 'CCTV纪录官方频道', 'https://www.youtube.com/watch?v=iQAmnS03QPw'),
    confidence: '已核实',
  },
  烟熏腊肉: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  西蜀老坛泡菜鱼: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  麻婆豆腐: {
    province: '四川',
    city: '待核实',
    region: '西南',
    longitude: 104.0665,
    latitude: 30.5723,
    source: githubCuisineSource('川菜', 'chuancai'),
    confidence: '待核实',
  },
  小鸡炖蘑菇: {
    province: '黑龙江',
    city: '东北地区',
    region: '东北',
    longitude: 126.5349,
    latitude: 45.8038,
    source: githubCuisineSource('东北菜', 'dongbeicai'),
    confidence: '待核实',
  },
  卤肉饭: {
    province: '台湾',
    city: '待核实',
    region: '港澳台',
    longitude: 120.9605,
    latitude: 23.6978,
    source: githubCuisineSource('港台菜', 'gangtai'),
    confidence: '待核实',
  },
  酸肉: {
    province: '湖南',
    city: '待核实',
    region: '华中',
    longitude: 112.9823,
    latitude: 28.1941,
    source: githubCuisineSource('湘菜', 'xiangcai'),
    confidence: '待核实',
  },
  煲仔饭: {
    province: '广东',
    city: '待核实',
    region: '华南',
    longitude: 113.2644,
    latitude: 23.1291,
    source: githubCuisineSource('粤菜', 'yuecai'),
    confidence: '待核实',
  },
  牛冻春: {
    province: '贵州', city: '黔东南州', region: '西南', longitude: 107.9775, latitude: 26.5834,
    source: manualReviewSource('牛冻春', '地点人工审核为贵州黔东南州雷山县'), confidence: '待核实',
  },
  牛肉锅贴: {
    province: '江苏', city: '南京', region: '华东', longitude: 118.7969, latitude: 32.0603,
    source: manualReviewSource('牛肉锅贴', '地点人工审核为江苏南京'), confidence: '待核实',
  },
  糯米卷: {
    province: '江苏', city: '苏州', region: '华东', longitude: 120.5853, latitude: 31.2989,
    source: manualReviewSource('糯米卷', '地点人工审核为江苏苏州'), confidence: '待核实',
  },
  油炸锅巴: {
    province: '安徽', city: '黄山', region: '华东', longitude: 118.3375, latitude: 29.7147,
    source: manualReviewSource('油炸锅巴', '地点人工审核为安徽黄山'), confidence: '待核实',
  },
  鲑鱼: {
    province: '黑龙江', city: '待核实', region: '东北', longitude: 126.5349, latitude: 45.8038,
    source: manualReviewSource('鲑鱼', '省份人工审核为黑龙江，城市未确认'), confidence: '待核实',
  },
  小凹馍: {
    province: '山西', city: '待核实', region: '华北', longitude: 112.5489, latitude: 37.8706,
    source: manualReviewSource('小凹馍', '省份人工审核为山西；外观和具体形态不明确，暂时隐藏'), confidence: '待核实',
  },
  冰皮月饼: {
    province: '上海', city: '上海', region: '华东', longitude: 121.4737, latitude: 31.2304,
    source: manualReviewSource('冰皮月饼', '地点人工审核为上海'), confidence: '待核实',
  },
  蒸腊鱼: {
    province: '湖南', city: '待核实', region: '华中', longitude: 112.9823, latitude: 28.1941,
    source: manualReviewSource('蒸腊鱼', '省份人工审核为湖南，城市未确认'), confidence: '待核实',
  },
  封肉: {
    province: '福建', city: '厦门', region: '华东', longitude: 118.0894, latitude: 24.4798,
    source: manualReviewSource('封肉', '地点人工审核为福建厦门同安区'), confidence: '待核实',
  },
  金齑玉脍: {
    province: '陕西', city: '西安', region: '西北', longitude: 108.9398, latitude: 34.3416,
    source: manualReviewSource('金齑玉脍', '地点人工审核为陕西西安'), confidence: '待核实',
  },
  玲珑牡丹鲊: {
    province: '陕西', city: '西安', region: '西北', longitude: 108.9398, latitude: 34.3416,
    source: manualReviewSource('玲珑牡丹鲊', '地点人工审核为陕西西安'), confidence: '待核实',
  },
  左宗棠鸡: {
    province: '湖南', city: '待核实', region: '华中', longitude: 112.9823, latitude: 28.1941,
    source: manualReviewSource('左宗棠鸡', '省份人工审核为湖南，城市未确认'), confidence: '待核实',
  },
  酒糟芋头面: {
    province: '福建', city: '待核实', region: '华东', longitude: 119.2965, latitude: 26.0745,
    source: manualReviewSource('酒糟芋头面', '省份人工审核为福建，城市未确认'), confidence: '待核实',
  },
  牡蒿蒸嫩鸭: {
    province: '福建', city: '宁德', region: '华东', longitude: 119.5477, latitude: 26.6662,
    source: manualReviewSource('牡蒿蒸嫩鸭', '地点人工审核为福建宁德'), confidence: '待核实',
  },
  江边辣: {
    province: '云南', city: '待核实', region: '西南', longitude: 102.8329, latitude: 24.8801,
    source: manualReviewSource('江边辣', '省份人工审核为云南，城市未确认'), confidence: '待核实',
  },
  扣茄花: {
    province: '云南', city: '待核实', region: '西南', longitude: 102.8329, latitude: 24.8801,
    source: manualReviewSource('扣茄花', '省份人工审核为云南，城市未确认'), confidence: '待核实',
  },
  贵妃饼: {
    province: '天津', city: '待核实', region: '华北', longitude: 117.2009, latitude: 39.0842,
    source: manualReviewSource('贵妃饼', '省份人工审核为天津，城市未确认'), confidence: '待核实',
  },
  萨其马: {
    province: '北京', city: '待核实', region: '华北', longitude: 116.4074, latitude: 39.9042,
    source: manualReviewSource('萨其马', '人工审核归入北京，说明保留在审核记录中'), confidence: '待核实',
  },
  苏式重阳糕: {
    province: '江苏', city: '待核实', region: '华东', longitude: 118.7969, latitude: 32.0603,
    source: manualReviewSource('苏式重阳糕', '省份人工审核为江苏，城市未确认'), confidence: '待核实',
  },
  茶聊鸡: {
    province: '江西', city: '庐山', region: '华东', longitude: 115.9896, latitude: 29.555,
    source: manualReviewSource('茶聊鸡', '地点人工审核为江西庐山'), confidence: '待核实',
  },
  茶香饭: {
    province: '江西', city: '庐山', region: '华东', longitude: 115.9896, latitude: 29.555,
    source: manualReviewSource('茶香饭', '地点人工审核为江西庐山'), confidence: '待核实',
  },
  茶鱼饺: {
    province: '江西', city: '庐山', region: '华东', longitude: 115.9896, latitude: 29.555,
    source: manualReviewSource('茶鱼饺', '地点人工审核为江西庐山'), confidence: '待核实',
  },
  钻林欢喜丸: {
    province: '江西', city: '庐山', region: '华东', longitude: 115.9896, latitude: 29.555,
    source: manualReviewSource('钻林欢喜丸', '地点人工审核为江西庐山'), confidence: '待核实',
  },
  早春菠菜: {
    province: '浙江', city: '湖州', region: '华东', longitude: 120.0868, latitude: 30.8943,
    source: manualReviewSource('早春菠菜', '地点人工审核为浙江湖州'), confidence: '待核实',
  },
};

const provincePlaceholderCatalog: Record<string, PlaceSeed> = {
  烤鸭卷饼: provinceOnly('北京', '华北', 116.4074, 39.9042, nameCueSource('烤鸭卷饼', '菜名指向北京烤鸭系卷饼，先进入北京省份页')),
  麻辣香肠: provinceOnly('四川', '西南', 104.0665, 30.5723, githubCuisineSource('川菜', 'chuancai')),
  食饼筒: provinceOnly('浙江', '华东', 121.4208, 28.6557, nameCueSource('食饼筒', '台州一带常见名称，先进入浙江省份页')),
  黄鳝啫啫煲: provinceOnly('广东', '华南', 113.2644, 23.1291, nameCueSource('黄鳝啫啫煲', '啫啫煲为广府烹调名称，先进入广东省份页')),
  葵花大斩肉: provinceOnly('江苏', '华东', 119.4129, 32.3942, cctvClipSource('央视网《舌尖上的中国》葵花大斩肉：一碗狮子头里的真功夫', 'https://tv.cctv.com/2016/08/16/VIDEdjUrOFORyuy5WibQt2Nf160816.shtml')),
  凉拌猪耳: provinceOnly('四川', '西南', 104.0665, 30.5723, githubCuisineSource('川菜', 'chuancai')),
  脱骨鱼: provinceOnly('江苏', '华东', 118.7969, 32.0603, githubCuisineSource('苏菜', 'sucai')),
  烤包子: provinceOnly('新疆', '西北', 87.6168, 43.8256, nameCueSource('烤包子', '新疆常见面点，先进入新疆省份页')),
  拉条子: provinceOnly('新疆', '西北', 87.6168, 43.8256, nameCueSource('拉条子', '新疆常见面食，先进入新疆省份页')),
  烧牛肉: provinceOnly('河南', '华中', 113.6254, 34.7466, githubCuisineSource('豫菜', 'yucai')),
  涮黄喉: provinceOnly('重庆', '西南', 106.5516, 29.563, nameCueSource('涮黄喉', '与火锅语境关联，先进入重庆省份页')),
  午餐肉: provinceOnly('重庆', '西南', 106.5516, 29.563, nameCueSource('午餐肉', '与火锅语境关联，先进入重庆省份页')),
  鸭肠: provinceOnly('重庆', '西南', 106.5516, 29.563, nameCueSource('鸭肠', '与火锅语境关联，先进入重庆省份页')),
  侗族大歌宴: provinceOnly('贵州', '西南', 109.1365, 26.2311, nameCueSource('侗族大歌宴', '侗族大歌与黔东南语境，先进入贵州省份页')),
  黄馍馍: provinceOnly('陕西', '西北', 110.2632, 37.5029, nameCueSource('黄馍馍', '项目已有陕西绥德黄馍馍素材，先进入陕西省份页')),
  螺蛳粉: provinceOnly('广西', '华南', 109.4281, 24.3264, nameCueSource('螺蛳粉', '柳州螺蛳粉方向占位，城市待复核')),
  酸鱼: provinceOnly('贵州', '西南', 107.9775, 26.5834, nameCueSource('酸鱼', '黔东南酸食语境，先进入贵州省份页')),
  腌菜: provinceOnly('贵州', '西南', 107.9775, 26.5834, nameCueSource('腌菜', '第二季秘境酸食语境，先进入贵州省份页')),
  腌肉: provinceOnly('贵州', '西南', 107.9775, 26.5834, nameCueSource('腌肉', '第二季秘境酸食语境，先进入贵州省份页')),
  腌鱼: provinceOnly('贵州', '西南', 107.9775, 26.5834, nameCueSource('腌鱼', '第二季秘境酸食语境，先进入贵州省份页')),
  金边白菜: provinceOnly('陕西', '西北', 108.9398, 34.3416, githubCuisineSource('西北菜', 'xibeicai')),
  八宝葫芦鸭: provinceOnly('江苏', '华东', 118.7969, 32.0603, nameCueSource('八宝葫芦鸭', '淮扬宴席菜方向占位，城市待复核')),
  全藕宴: provinceOnly('湖北', '华中', 112.8969, 30.4212, nameCueSource('全藕宴', '莲藕宴饮语境，先进入湖北省份页')),
  枸杞羊肉: provinceOnly('宁夏', '西北', 106.2309, 38.4872, nameCueSource('枸杞羊肉', '宁夏枸杞与羊肉语境，先进入宁夏省份页')),
  猪肚鸡: provinceOnly('广东', '华南', 113.2644, 23.1291, githubCuisineSource('粤菜', 'yuecai')),
  花胶炖鸡汤: provinceOnly('广东', '华南', 113.2644, 23.1291, nameCueSource('花胶炖鸡汤', '粤式汤品方向占位，城市待复核')),
  响螺片椰肉猪骨汤: provinceOnly('广东', '华南', 113.2644, 23.1291, nameCueSource('响螺片椰肉猪骨汤', '粤式汤品方向占位，城市待复核')),
  津味豆腐脑: provinceOnly('天津', '华北', 117.2009, 39.0842, nameCueSource('津味豆腐脑', '菜名含“津味”，先进入天津省份页')),
  酱香饼: provinceOnly('湖北', '华中', 109.4882, 30.2722, nameCueSource('酱香饼', '土家酱香饼方向占位，城市待复核')),
  龙井茶酥: provinceOnly('浙江', '华东', 120.1551, 30.2741, referenceSource('杭州网《〈舌尖3〉中出现的荷花酥和龙井茶酥》', '杭州网', 'https://hznews.hangzhou.com.cn/chengshi/content/2018-02/27/content_6807422_0.htm')),
  叉烧包: provinceOnly('广东', '华南', 113.2644, 23.1291, githubCuisineSource('粤菜', 'yuecai')),
  虾饺: provinceOnly('广东', '华南', 113.2644, 23.1291, githubCuisineSource('粤菜', 'yuecai')),
  烧卖: provinceOnly('广东', '华南', 113.2644, 23.1291, referenceSource('广州市政府《点点心意，跃动湾区 广州启动第二届“Young城点心季”》', '广州市人民政府', 'https://www.gz.gov.cn/zt/zzyyzq/bmdt/content/post_10472150.html')),
  蛋挞: provinceOnly('广东', '华南', 113.2644, 23.1291, referenceSource('广州市政府《点点心意，跃动湾区 广州启动第二届“Young城点心季”》', '广州市人民政府', 'https://www.gz.gov.cn/zt/zzyyzq/bmdt/content/post_10472150.html')),
  春饼: provinceOnly('北京', '华北', 116.4074, 39.9042, githubCuisineSource('京菜', 'jingcai')),
  春卷: provinceOnly('上海', '华东', 121.4737, 31.2304, githubCuisineSource('沪菜', 'hucai')),
  潜江全荷宴: provinceOnly('湖北', '华中', 112.8969, 30.4212, nameCueSource('潜江全荷宴', '菜名含“潜江”，先进入湖北省份页')),
  清明粿: provinceOnly('浙江', '华东', 119.276, 28.592, nameCueSource('清明粿', '江浙清明节令点心方向占位，城市待复核')),
  西双版纳绿叶宴: provinceOnly('云南', '西南', 100.797, 22.0094, nameCueSource('西双版纳绿叶宴', '菜名含“西双版纳”，先进入云南省份页')),
  喃咪酱: provinceOnly('云南', '西南', 100.797, 22.0094, nameCueSource('喃咪酱', '傣味蘸水语境，先进入云南省份页')),
  年糕饺: provinceOnly('浙江', '华东', 121.5504, 29.8746, nameCueSource('年糕饺', '宁波年糕方向占位，城市待复核')),
  甜晒鱼: provinceOnly('山东', '华东', 120.7402, 37.5366, nameCueSource('甜晒鱼', '胶东甜晒鱼方向占位，城市待复核')),
  羊肉粉: provinceOnly('贵州', '西南', 106.9373, 27.7066, nameCueSource('羊肉粉', '贵州羊肉粉方向占位，城市待复核')),
  青笋碎滑肉: provinceOnly('四川', '西南', 104.0665, 30.5723, githubCuisineSource('川菜', 'chuancai')),
  香港家常妈妈菜: provinceOnly('香港', '港澳台', 114.1694, 22.3193, nameCueSource('香港家常妈妈菜', '菜名含“香港”，先进入香港页')),
  大闸蟹: provinceOnly('江苏', '华东', 120.5853, 31.2989, nameCueSource('大闸蟹', '阳澄湖大闸蟹方向占位，城市待复核')),
  蟹黄汪豆腐: provinceOnly('安徽', '华东', 117.2272, 31.8206, nameCueSource('蟹黄汪豆腐', '徽菜汪豆腐方向占位，城市待复核')),
};

const itemReviewCatalog: Record<string, MediaSource> = {
  当归生姜羊肉汤: manualReviewSource('当归生姜羊肉汤', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  五汁膏: manualReviewSource('五汁膏', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  枣泥山药糕: manualReviewSource('枣泥山药糕', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  大福喜: manualReviewSource('大福喜', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  福寿饼: manualReviewSource('福寿饼', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  面果儿: manualReviewSource('面果儿', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  蘑菇包: manualReviewSource('蘑菇包', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  夏至面: manualReviewSource('夏至面', '人工审核确认节目未提及地点，保留条目但不绑定省份'),
  薄饼鸡块: manualReviewSource('薄饼鸡块', '人工审核决定移出正式地图：视频未提及该菜品'),
  黑椒藕饼: manualReviewSource('黑椒藕饼', '人工审核决定移出正式地图：无稳定地域归属'),
  红烧牛肉面: manualReviewSource('红烧牛肉面', '人工审核决定移出正式地图：无稳定地域归属'),
  胡萝卜丝鸡蛋饼: manualReviewSource('胡萝卜丝鸡蛋饼', '人工审核决定移出正式地图：无稳定地域归属'),
  麻酱荞麦油麦菜: manualReviewSource('麻酱荞麦油麦菜', '人工审核决定移出正式地图：无稳定地域归属'),
  南瓜煎饺: manualReviewSource('南瓜煎饺', '人工审核决定移出正式地图：视频未提及该菜品'),
  花卷: manualReviewSource('花卷', '人工审核决定移出正式地图：视频未出现该菜品'),
  金鱼饺: manualReviewSource('金鱼饺', '人工审核决定移出正式地图：视频未出现该菜品'),
  九桃一手: manualReviewSource('九桃一手', '人工审核决定移出正式地图：视频未出现该菜品'),
  琵琶结: manualReviewSource('琵琶结', '人工审核决定移出正式地图：视频未出现该菜品'),
  寿包: manualReviewSource('寿包', '人工审核决定移出正式地图：视频未出现该菜品'),
  香港家常妈妈菜: manualReviewSource('香港家常妈妈菜', '用户决定删除该美食条目并移出正式地图'),
};

const manuallyExcludedFoodNames = new Set([
  '薄饼鸡块', '黑椒藕饼', '红烧牛肉面', '胡萝卜丝鸡蛋饼', '麻酱荞麦油麦菜', '南瓜煎饺',
  '花卷', '金鱼饺', '九桃一手', '琵琶结', '寿包',
  '香港家常妈妈菜',
]);

const manuallyHiddenFoodNames = new Set(['小凹馍', '鱼酱炖稻花鱼', '腌鱼']);

const unknownPlace: PlaceSeed = {
  province: '待核实',
  city: '待核实',
  region: '待核实',
  longitude: 104.1954,
  latitude: 35.8617,
};

const sortedPlaceKeys = Object.keys(placeCatalog).sort((a, b) => b.length - a.length);

const findPlace = (name: string): PlaceSeed => {
  const exactPlace = exactPlaceCatalog[name];
  if (exactPlace) return exactPlace;

  const provincePlaceholder = provincePlaceholderCatalog[name];
  if (provincePlaceholder) return provincePlaceholder;

  const key = sortedPlaceKeys.find((placeKey) => name.includes(placeKey));
  return key ? placeCatalog[key] : unknownPlace;
};

const displayName = (name: string) => {
  const key = sortedPlaceKeys.find((placeKey) => name.startsWith(placeKey));
  if (!key) return name;
  const cleaned = name.slice(key.length);
  return cleaned.length >= 2 ? cleaned : name;
};

const categoryFor = (name: string) => {
  if (/火锅|锅/.test(name)) return '锅物';
  if (/面|粉|米线|馍|馕|粑|饺|馄饨|包|糕|酥|饼|粽|汤包|烧麦|烧卖/.test(name)) return '主食点心';
  if (/鱼|虾|蟹|鳗|海蜇|海参|贝|螺|紫菜|乌鱼子|鲥鱼|黄鳝|海产品/.test(name)) return '水产海鲜';
  if (/腊|酱|泡菜|酸菜|火腿|腌|糟|酒|醋|陈皮|豆瓣|虾膏|虾酱|咸/.test(name)) return '发酵腌制';
  if (/宴|早茶|早酒|村宴/.test(name)) return '宴饮';
  if (/鸡|鸭|羊|牛|猪|肉|腰|肠|排骨|蹄|白切|红烧|烧猪/.test(name)) return '肉禽';
  if (/豆腐|莲藕|芋|笋|菌|菇|菜|瓜|柿|花椒|百合|莲子|山药/.test(name)) return '蔬果山珍';
  return '小吃与食材';
};

const exactIngredients: Record<string, string[]> = {
  松茸: ['松茸'],
  冬笋: ['冬笋'],
  黄豆酸笋小黄鱼: ['小黄鱼', '酸笋', '黄豆'],
  诺邓火腿: ['猪后腿', '食盐'],
  莲藕: ['莲藕'],
  冬季捕鱼: ['淡水鱼'],
  远洋打渔: ['海鱼', '贝类', '虾蟹'],
  面食: ['小麦面粉'],
  黄馍馍: ['糜子面', '红枣'],
  新疆库车馕: ['小麦面粉', '芝麻或洋葱'],
  米粉: ['大米'],
  沙河粉: ['大米'],
  肉夹馍: ['小麦面粉', '猪肉'],
  泡馍: ['小麦面粉', '羊肉或牛肉'],
  牛肉面: ['小麦面粉', '牛肉', '白萝卜'],
  竹升面: ['小麦面粉', '鸡蛋或鸭蛋'],
  云吞捞面: ['小麦面粉', '鸡蛋', '虾或猪肉'],
  臊子面: ['小麦面粉', '猪肉臊子', '豆腐与时蔬'],
  粽子: ['糯米', '粽叶', '甜馅或肉馅'],
  年糕: ['稻米'],
  年夜饭饺子: ['小麦面粉', '肉馅或素馅'],
  烧豆腐: ['豆腐'],
  豆腐: ['黄豆', '凝固剂'],
  嫩豆腐: ['黄豆', '凝固剂'],
  奶豆腐: ['牛奶或羊奶'],
  奶茶: ['砖茶', '牛奶或羊奶'],
  毛豆腐: ['豆腐', '毛霉菌种'],
  米酒: ['糯米或大米', '酒曲'],
  黄酒: ['糯米或黍米', '麦曲或酒药'],
  酱油: ['大豆', '小麦', '食盐'],
  大酱: ['大豆', '食盐'],
  酸菜: ['白菜', '食盐'],
  朝鲜泡菜: ['白菜或萝卜', '辣椒', '蒜'],
  煲仔饭: ['大米', '腊味或肉类', '青菜'],
  腊鸭: ['鸭肉', '食盐'],
  腌禾花鱼: ['禾花鱼', '食盐', '米酒或糯米'],
  腊肉: ['猪肉', '食盐'],
  臭鳜鱼: ['鳜鱼', '食盐'],
  刀板香火腿: ['猪后腿', '食盐'],
  火腿: ['猪后腿', '食盐'],
  醉蟹: ['河蟹', '黄酒'],
  乌鱼子: ['鲻鱼卵', '食盐'],
  虾膏: ['虾', '食盐'],
  虾酱: ['小虾', '食盐'],
  尼西黑陶煮制食品: ['肉类或菌菇', '时令蔬菜'],
  汽锅鸡: ['鸡肉', '姜'],
  均安露天村宴: ['猪肉', '鸡鸭', '鱼', '时令蔬菜'],
  粉葛蒸肉: ['猪肉', '粉葛'],
  包子: ['小麦面粉', '肉馅或素馅'],
  大煮干丝: ['豆腐干', '鸡汤或高汤', '火腿与虾仁'],
  雪花鲥鱼: ['鲥鱼', '火腿或猪网油'],
  清炖狮子头: ['猪肉', '荸荠或藕', '青菜'],
  仿豹胎: ['羊胎盘'],
  文思豆腐: ['豆腐', '香菇与冬笋', '清汤'],
  鉴真素鸭: ['豆腐皮', '香菇与冬笋'],
  油炸臭豆腐: ['豆腐', '发酵卤水'],
  葱烧海参: ['海参', '大葱'],
  西湖醋鱼: ['草鱼', '醋', '糖'],
  糖葱薄饼: ['小麦面粉', '麦芽糖或白糖', '芝麻'],
  蔗渣熏鸭脯: ['鸭肉', '甘蔗渣'],
  梁溪脆鳝: ['黄鳝', '糖', '酱油'],
  加蟹小笼馒头: ['小麦面粉', '猪肉', '蟹粉'],
  手推馄饨: ['小麦面粉', '猪肉馅'],
  酱排骨: ['猪排骨', '酱油', '糖'],
  陈皮: ['柑橘果皮'],
  陈皮鸭: ['鸭肉', '陈皮'],
  盐焗鸡: ['鸡肉', '食盐'],
  香醋: ['糯米', '麦麸', '食盐'],
  醋排: ['猪排骨', '香醋', '糖'],
  泡椒: ['辣椒', '盐水'],
  鱼香肉丝: ['猪肉', '泡椒', '木耳与笋'],
  豆瓣酱: ['蚕豆', '辣椒', '食盐'],
  麻婆豆腐: ['豆腐', '牛肉末或猪肉末', '豆瓣酱', '花椒'],
  藤椒鱼: ['鱼', '藤椒', '辣椒'],
  火锅: ['高汤', '肉类', '蔬菜与豆制品'],
  鱼丸紫菜煲: ['鱼肉', '紫菜', '高汤'],
  清蒸鱼: ['鲜鱼', '葱姜'],
  白切鸡: ['鸡肉', '姜葱'],
  新米节: ['新米', '时令肉蔬'],
  海产品: ['海鱼', '贝类', '虾蟹'],
  河蟹: ['河蟹'],
  蟹黄汤包: ['小麦面粉', '猪肉', '蟹黄与蟹肉', '皮冻'],
  大闸蟹: ['中华绒螯蟹'],
  芋头: ['芋头'],
  蟹黄汪豆腐: ['豆腐', '蟹黄或蟹粉'],
  青稞: ['青稞'],
  都市屋顶种菜: ['时令蔬菜', '香草'],
  雷笋炒肉丝: ['雷笋', '猪肉'],
  铁锅炖鱼: ['淡水鱼', '高汤或酱汁'],
  咸肉蒸黄泥拱竹笋: ['黄泥拱笋', '咸猪肉'],
  榆钱饭: ['榆钱', '面粉或谷物'],
  九层皮: ['大米', '植物染色原料'],
  紫苏炒青蛳: ['青蛳', '紫苏'],
  玛仁糖: ['坚果', '麦芽糖或蜂蜜'],
  切糕: ['糯米', '红枣与坚果'],
  抓饭: ['大米', '羊肉', '胡萝卜与洋葱'],
  虾子小刀面: ['小麦面粉', '虾子'],
  桂花糯米藕: ['莲藕', '糯米', '桂花糖'],
  板栗烧鸡: ['鸡肉', '板栗'],
  老鸭雁来蕈: ['鸭肉', '雁来蕈'],
  酥油蜂蜜: ['酥油', '蜂蜜'],
  蜂蜜鳗鱼: ['鳗鱼', '蜂蜜'],
  蜜制酒心冰激凌: ['牛奶或奶油', '蜂蜜', '酒'],
  麻辣香肠: ['猪肉', '辣椒', '花椒'],
  烟熏腊肉: ['猪肉', '食盐', '烟熏香料'],
  嫩豆花: ['黄豆', '凝固剂', '蘸水'],
  裤带面: ['小麦面粉', '辣椒与香醋'],
  红烧望潮: ['短蛸', '酱油'],
  清炖跳跳鱼: ['弹涂鱼', '清汤'],
  煎饼卷大葱: ['小麦或杂粮面粉', '大葱', '甜面酱'],
  丝娃娃: ['米面薄皮', '多种蔬菜', '酸辣蘸水'],
  烤鸭卷饼: ['鸭肉', '小麦面饼', '葱与甜面酱'],
  食饼筒: ['小麦薄饼', '肉类与蔬菜'],
  牛冻春: ['牛肉或牛杂', '胶质汤冻'],
  鱼酱: ['鱼', '食盐'],
  萝卜饭: ['大米', '萝卜', '猪肉或海味'],
  牛肉锅贴: ['小麦面粉', '牛肉馅'],
  回锅肉: ['猪肉', '蒜苗', '豆瓣酱'],
  徽州臭豆腐: ['豆腐', '发酵卤水'],
  油炸锅巴: ['米饭', '食用油'],
  蒜泥白肉: ['猪肉', '蒜', '辣椒油'],
  凉拌猪耳: ['猪耳', '香辛料'],
  空心挂面: ['小麦面粉'],
  面皮: ['小麦面粉或大米'],
  手擀面: ['小麦面粉'],
  甜水面: ['小麦面粉', '芝麻酱或酱油', '红糖', '辣椒油'],
  饸饹: ['小麦面或荞麦面'],
  热干面: ['碱水面', '芝麻酱'],
  小面: ['小麦面条', '辣椒油', '花椒'],
  头汤面: ['小麦面条', '高汤', '肉浇头'],
  糯米卷: ['糯米', '面皮或豆腐皮'],
  苏式小方糕: ['糯米粉与粳米粉', '糖'],
  蕨根糍粑: ['蕨根粉或蕨根淀粉'],
  三角团: ['糯米粉或米粉', '甜馅或咸馅'],
  蟹黄烧卖: ['小麦面皮', '糯米或猪肉馅', '蟹黄'],
  元松: ['鸡蛋', '小麦面粉', '糖'],
  钳花小包: ['小麦面粉', '肉馅或素馅'],
  四喜蒸饺: ['小麦面粉', '肉馅', '四色配菜'],
  金鱼酥: ['小麦面粉', '油脂', '甜馅'],
  船点: ['糯米粉与粳米粉', '甜馅或咸馅'],
  蚝烙: ['牡蛎', '薯粉', '鸡蛋'],
  烫干丝: ['豆腐干', '姜丝'],
  葵花大斩肉: ['猪肉', '荸荠或藕', '青菜'],
  脱骨鱼: ['整鱼', '肉馅或配菜'],
  三套鸭: ['家鸭', '野鸭', '鸽子'],
  扣三丝: ['火腿', '鸡胸肉', '冬笋'],
  油爆河虾: ['河虾', '酱油', '糖'],
  黄鳝啫啫煲: ['黄鳝', '姜葱蒜'],
  芋头饭: ['大米', '芋头'],
  手抓羊肉: ['羊肉'],
  鲑鱼: ['鲑鱼'],
  鱼子酱: ['鱼卵', '食盐'],
  烤鱼: ['鱼', '香辛料'],
  螺蛳粉: ['大米米粉', '螺蛳汤', '酸笋'],
  油茶: ['茶叶', '姜', '炒米或花生'],
  酸肉: ['猪肉', '糯米或米粉', '食盐'],
  糯米饭: ['糯米'],
  腌肉: ['猪肉', '食盐'],
  腌菜: ['蔬菜', '食盐'],
  侗族大歌宴: ['糯米', '鱼肉', '腌酸食物'],
  燃面: ['小麦面条', '辣椒油', '花生与芝麻'],
  宜宾腌菜: ['青菜或芥菜', '食盐'],
  西瓜酱: ['黄豆', '西瓜', '小麦面粉'],
  虾子焖茭白: ['茭白', '虾子'],
  奶汤蒲菜: ['蒲菜', '奶汤'],
  蒲菜水饺: ['小麦面粉', '蒲菜', '肉馅'],
  陈皮红豆沙: ['红豆', '陈皮', '糖'],
  姜撞奶: ['牛奶', '姜汁', '糖'],
  枣花馍: ['小麦面粉', '红枣'],
  蒸菜: ['时令蔬菜或肉类', '米粉'],
  红烧肉: ['猪五花肉', '酱油', '糖'],
  抻面: ['小麦面粉'],
  泡菜鱼: ['鱼', '泡菜'],
  泡菜: ['蔬菜', '食盐或盐水'],
  泡椒凤爪: ['鸡爪', '泡椒'],
  小鸡炖蘑菇: ['鸡肉', '蘑菇'],
  涮肉火锅: ['羊肉', '清汤', '芝麻酱'],
  菌子火锅: ['多种食用菌', '高汤'],
  牛肉火锅: ['牛肉', '牛骨汤或清汤'],
  涮黄喉: ['黄喉', '火锅汤底'],
  鸭肠: ['鸭肠'],
  灌汤包: ['小麦面粉', '猪肉馅', '皮冻'],
  片儿川: ['小麦面条', '雪菜', '笋片', '猪肉片'],
  纳仁: ['面片', '羊肉或马肉', '洋葱'],
  大盘鸡: ['鸡肉', '土豆', '辣椒'],
  烤包子: ['小麦面粉', '羊肉', '洋葱'],
  拉条子: ['小麦面粉', '牛羊肉与蔬菜'],
  烧牛肉: ['牛肉', '香辛料'],
  煎饼果子: ['绿豆面或杂粮面糊', '鸡蛋', '薄脆'],
  早茶: ['茶', '多种广式点心'],
  蒸腊鱼: ['腊鱼', '辣椒或豆豉'],
  咸鸭蛋: ['鸭蛋', '食盐'],
  洋芋: ['马铃薯'],
  彝族坨坨肉: ['猪肉或羊肉'],
  素食: ['豆制品', '菌菇', '时令蔬菜'],
  冰皮月饼: ['糯米粉', '糖', '甜馅'],
  枫镇大肉面: ['小麦面条', '猪肉', '高汤'],
  荞麦粑粑: ['荞麦粉'],
  石锅松茸: ['松茸', '高汤'],
  陕州十碗席: ['猪肉', '鸡肉', '豆腐与时蔬'],
  蒸点: ['小麦面粉或米粉', '甜馅或咸馅'],
  瓜雕: ['瓜类'],
  清水炒蛋: ['鸡蛋'],
  九转大肠: ['猪大肠', '糖醋与香辛料'],
  爆炒腰花: ['猪腰', '葱姜蒜'],
  翠珠鱼花: ['鱼肉', '豌豆或青蔬'],
  金边白菜: ['白菜', '辣椒', '香醋'],
  西蜀老坛泡菜鱼: ['鱼', '老坛泡菜'],
  稀豆粉: ['豌豆粉'],
  手打鱼丸: ['鱼肉', '淀粉'],
  麻辣烫: ['高汤', '辣椒与花椒', '肉类与蔬菜'],
  凉糕: ['大米', '红糖'],
  胡辣汤: ['面筋', '胡椒', '肉汤与配菜'],
  石花膏: ['石花菜', '糖水'],
  面线糊: ['面线', '高汤', '海鲜或内脏配料'],
  水盆羊肉: ['羊肉', '羊骨汤', '粉丝'],
  全藕宴: ['莲藕', '藕粉', '莲子'],
  藕粉圆子: ['藕粉', '果仁或芝麻馅'],
  水八仙: ['茭白', '莲藕', '荸荠等水生蔬食'],
  八宝葫芦鸭: ['整鸭', '糯米', '八宝馅料'],
  沙茶焖牛肉: ['牛肉', '沙茶酱'],
  封肉: ['猪肉', '香菇与香辛料'],
  茄鲞: ['茄子', '鸡肉或鸡汤', '果仁'],
  玲珑牡丹鲊: ['鱼肉', '米饭或米粉', '香辛料'],
  金齑玉脍: ['鲈鱼', '姜蒜', '梅子与橘皮', '醋'],
  雪霞羹: ['豆腐', '木芙蓉花', '清汤'],
  平江十大碗: ['猪肉', '鸡鸭', '鱼与时蔬'],
  五汁膏: ['梨汁', '白萝卜汁', '姜汁', '牛奶', '蜂蜜'],
  枣泥山药糕: ['山药', '枣泥'],
  蓑衣黄瓜: ['黄瓜', '醋与辣椒'],
  枸杞羊肉: ['羊肉', '枸杞'],
  猪肚鸡: ['猪肚', '鸡肉', '胡椒'],
  百合莲子: ['百合', '莲子'],
  艾叶豆腐: ['豆腐', '艾叶'],
  老酒炖鸡子: ['鸡肉', '黄酒'],
  响螺片椰肉猪骨汤: ['响螺片', '椰肉', '猪骨'],
  花胶炖鸡汤: ['花胶', '鸡肉'],
  三草炖鹅: ['鹅肉', '三种草本植物'],
  酒糟芋头面: ['芋头面', '酒糟'],
  山苍子根炖猪蹄: ['猪蹄', '山苍子根'],
  牡蒿蒸嫩鸭: ['鸭肉', '牡蒿'],
  败酱草小肠汤: ['猪小肠', '败酱草'],
  当归生姜羊肉汤: ['羊肉', '当归', '生姜'],
  蟹粉豆腐: ['豆腐', '蟹粉'],
  松鼠鳜鱼: ['鳜鱼', '糖', '醋'],
  白什盘: ['多种肉类', '豆制品与蔬菜'],
  摔面: ['小麦面粉'],
  香橼蜜制梨: ['梨', '香橼', '蜂蜜'],
  扣茄花: ['茄子', '肉馅或调味料'],
  江边辣: ['辣椒', '江鱼或时令食材'],
  津味豆腐脑: ['黄豆', '凝固剂', '卤汁'],
  卤肉饭: ['大米', '猪肉', '酱油'],
  酱香饼: ['小麦面粉', '复合酱料', '芝麻与葱'],
  大福喜: ['小麦面粉或米粉', '甜馅'],
  福寿饼: ['小麦面粉', '糖与油脂'],
  贵妃饼: ['小麦面粉', '油脂', '甜馅'],
  萨其马: ['小麦面粉', '鸡蛋', '糖浆'],
  面果儿: ['小麦面粉', '糖与油脂'],
  苏式重阳糕: ['糯米粉与粳米粉', '糖', '果脯或坚果'],
  蘑菇包: ['小麦面粉', '甜馅或咸馅'],
  刺猬包: ['小麦面粉', '甜馅或咸馅'],
  嵌字豆糖: ['豆粉', '麦芽糖'],
  渔亭糕: ['糯米粉或米粉', '糖'],
  荷花酥: ['小麦面粉', '油脂', '甜馅'],
  龙井茶酥: ['小麦面粉', '油脂', '龙井茶粉'],
  叉烧包: ['小麦面粉', '叉烧猪肉'],
  虾饺: ['澄粉', '虾仁'],
  烧卖: ['小麦面皮', '猪肉或糯米馅'],
  蛋挞: ['小麦面粉', '鸡蛋', '牛奶或淡奶油'],
  春饼: ['小麦面粉', '时令蔬菜与肉类'],
  清明粿: ['米粉或糯米粉', '艾草或鼠曲草', '甜馅或咸馅'],
  野菜宴: ['多种时令野菜'],
  茶香饭: ['大米', '茶叶'],
  茶鱼饺: ['小麦面皮', '鱼肉', '茶叶'],
  钻林欢喜丸: ['肉类或豆制品', '淀粉'],
  茶聊鸡: ['鸡肉', '茶叶'],
  早春菠菜: ['菠菜'],
  春卷: ['小麦面皮', '蔬菜与肉馅'],
  夏至面: ['小麦面条', '时令菜码'],
  西双版纳绿叶宴: ['肉类与鱼', '时令蔬菜', '香草与香辛料'],
  喃咪酱: ['辣椒', '番茄或酸味果蔬', '香草与香辛料'],
  潜江全荷宴: ['莲藕', '莲子', '荷叶与藕带'],
  酸汤鱼: ['鱼', '发酵酸汤', '辣椒'],
  柿饼: ['柿子'],
  柿子糊塌: ['柿子', '面粉'],
  五彩饭: ['糯米', '天然植物染料'],
  咸肉: ['猪肉', '食盐'],
  海鲜饺子: ['小麦面粉', '海鲜馅'],
  三鲜虾仁水饺: ['小麦面粉', '虾仁', '鸡蛋与蔬菜'],
  七彩饺子: ['小麦面粉', '天然果蔬汁', '肉馅或素馅'],
  甜晒鱼: ['海鱼', '食盐'],
  芋饺: ['芋头', '淀粉', '肉馅'],
  汤圆: ['糯米粉', '甜馅或咸馅'],
  年糕饺: ['年糕片', '肉馅或素馅'],
  鲅鱼饺子: ['小麦面粉', '鲅鱼肉'],
  素静饺子: ['小麦面粉', '蔬菜与豆制品'],
  甜烧白: ['猪五花肉', '糯米', '豆沙或红糖'],
  羊肉粉: ['大米米粉', '羊肉', '羊骨汤'],
  糖醋排骨: ['猪排骨', '糖', '醋'],
  青笋碎滑肉: ['猪肉', '莴笋'],
  生爆盐煎肉: ['猪肉', '青蒜', '豆瓣酱'],
  白菜炒白菜: ['白菜'],
  白菜饺子: ['小麦面粉', '白菜', '肉馅或其他素馅'],
  盆菜: ['猪肉与禽肉', '海味', '豆腐与蔬菜'],
  红钳蟹: ['红钳蟹'],
  大炉烧饼: ['小麦面粉', '芝麻'],
  虱目鱼腹粥: ['大米', '虱目鱼腹'],
  火爆腰花: ['猪腰', '辣椒与葱姜蒜'],
  凉拌海蜇: ['海蜇', '醋与香油'],
  敲馄饨: ['小麦面粉', '肉馅'],
  早酒: ['米酒或谷物酒', '佐酒小菜'],
  烧麦: ['小麦面皮', '肉馅或糯米馅'],
  蒸饺: ['小麦面粉', '肉馅或素馅'],
  拌面: ['小麦面条', '花生酱或芝麻酱'],
  炖罐: ['肉类或禽类', '药食材料', '清汤'],
  柿子醋: ['柿子'],
  红霉豆腐渣: ['豆腐渣', '红曲霉或红曲'],
  鲜花椒红烧肉: ['猪五花肉', '鲜花椒', '酱油'],
  扇贝狮子头: ['猪肉', '扇贝'],
  油酥烧饼: ['小麦面粉', '油酥', '芝麻'],
  卤鹅: ['鹅肉', '卤水香料'],
  粉蒸芋头: ['芋头', '米粉'],
  炭烤帝王蟹: ['帝王蟹'],
  鱼圆汤: ['鱼肉', '淀粉', '高汤'],
  烧猪: ['猪肉', '香辛料'],
  慈姑烧肉: ['慈姑', '猪肉'],
  干拌馄饨: ['小麦面皮', '猪肉或虾馅', '拌酱'],
  鱼香茄子: ['茄子', '泡椒', '葱姜蒜'],
  刀削面: ['小麦面粉'],
  娘惹香辣鱼: ['鱼', '辣椒', '香茅等香料'],
  左宗棠鸡: ['鸡肉', '辣椒', '糖醋酱汁'],
  香港家常妈妈菜: ['肉类或海鲜', '时令蔬菜', '米饭或面食'],
  鱼酱炖稻花鱼: ['稻花鱼', '鱼酱'],
  腌鱼: ['鱼', '食盐或糯米腌料'],
  小凹馍: ['小麦面粉'],
  薄饼鸡块: ['鸡肉', '小麦薄饼'],
  红烧牛肉面: ['小麦面条', '牛肉', '牛骨汤'],
  南瓜煎饺: ['小麦面粉', '南瓜馅'],
  黑椒藕饼: ['莲藕', '黑胡椒', '肉馅或淀粉'],
  胡萝卜丝鸡蛋饼: ['胡萝卜', '鸡蛋', '小麦面粉'],
  麻酱荞麦油麦菜: ['油麦菜', '芝麻酱', '荞麦'],
  寿包: ['小麦面粉', '莲蓉或豆沙馅'],
  九桃一手: ['小麦面粉或米粉', '甜馅'],
  金鱼饺: ['小麦面粉', '肉馅或素馅'],
  花卷: ['小麦面粉', '酵母'],
  琵琶结: ['小麦面粉或米粉', '甜馅或咸馅'],
};

const ingredientsFor = (name: string) => {
  const foodName = displayName(name);
  const exact = exactIngredients[name] ?? exactIngredients[foodName];
  if (exact) return exact;

  const pairs: Array<[RegExp, string]> = [
    [/鱼|鳗|鳝/, '鱼肉'],
    [/虾/, '虾'],
    [/蟹/, '蟹'],
    [/海蜇/, '海蜇'],
    [/羊/, '羊肉'],
    [/牛/, '牛肉'],
    [/猪|排骨|猪蹄|猪耳|猪腰|猪肠|火腿|腊肉/, '猪肉'],
    [/鸡/, '鸡肉'],
    [/鸭/, '鸭肉'],
    [/鹅/, '鹅肉'],
    [/面|馍|馕|饼|包|馄饨|饺|烧麦|烧卖/, '小麦面粉'],
    [/米粉|米线|年糕|粑|粿|糕|粽|饭|粥|汤圆/, '大米或糯米'],
    [/豆腐/, '黄豆'],
    [/笋/, '竹笋'],
    [/莲藕|藕/, '莲藕'],
    [/菌|菇|松茸|雁来蕈/, '食用菌'],
    [/芋/, '芋头'],
    [/柿/, '柿子'],
    [/白菜|青菜|菠菜|黄瓜|茄子|萝卜/, '时令蔬菜'],
  ];
  const ingredients = pairs.filter(([pattern]) => pattern.test(foodName)).map(([, ingredient]) => ingredient);
  return ingredients.length ? Array.from(new Set(ingredients)) : ['待核实'];
};

const exactFlavorProfiles: Record<string, string> = {
  松茸: '香气清雅，带有松木、菌菇与湿润泥土气息，鲜味柔和而绵长。',
  冬笋: '味道清甜，笋香鲜嫩，入口爽脆并带轻微植物涩感。',
  奶豆腐: '奶香浓郁，微酸微咸，质地紧实，回味带自然乳脂香。',
  奶茶: '茶香与奶香交叠，常见风味咸醇温厚，入口顺滑。',
  陈皮: '柑橘香清晰，微苦回甘，陈香温和而持久。',
  青稞: '谷物香质朴，微甜耐嚼，熟制后带温和坚果气息。',
  酥油蜂蜜: '乳脂香浓厚，蜂蜜甜润，咸甜之间带有柔和花香。',
  鱼子酱: '咸鲜集中，颗粒轻弹，入口带海水般的矿物感与脂香。',
  乌鱼子: '咸鲜浓缩，质地紧实微黏，细嚼可见海味与油脂香。',
  河蟹: '蟹肉清甜细嫩，蟹黄丰腴醇厚，鲜味集中。',
  大闸蟹: '蟹肉细嫩清甜，蟹黄或蟹膏丰腴，鲜味浓而不重。',
  海产品: '以海水般的咸鲜和天然清甜为主，不同贝、虾、蟹、鱼带来各异口感。',
  南海远洋打渔: '这是多种海产的集合，整体以海味咸鲜、肉质弹嫩和自然清甜为主。',
  吉林查干湖冬季捕鱼: '这是冬捕渔获的集合，鱼肉通常鲜嫩细致，风味清鲜，适合炖煮后释放鲜甜。',
  都市屋顶种菜: '这是蔬菜食材主题，风味随品种而异，整体强调新鲜、清脆与植物清香。',
  新米节: '这是以新收稻米为核心的节庆饮食，米香清新，口感软糯并带自然回甜。',
  侗族大歌宴: '这是多道菜组成的宴席，风味并不单一，常由糯香、酸香、烟熏与咸鲜共同构成。',
  村宴: '这是多道乡宴菜的组合，蒸、煮、烧等做法并置，整体咸鲜丰足、层次丰富。',
  平江十大碗: '多道蒸、扣、烧菜组成复合风味，咸鲜醇厚，肉香与汤汁感突出。',
  陕州十碗席: '宴席菜风味层次多样，以蒸、扣、炖形成的咸鲜、肉香和汤汁感为主。',
  全藕宴: '莲藕贯穿多道菜，既有清脆与清甜，也有炖煮后的粉糯和温润鲜香。',
  潜江全荷宴: '荷叶、莲藕、莲子等带来清香、清甜、脆嫩与粉糯交错的复合风味。',
  水八仙: '多种水生蔬食共同呈现清甜、脆嫩、粉糯等口感，整体清鲜淡雅。',
  野菜宴: '多种野菜带来清鲜、微苦、回甘等植物风味，口感随品种与做法变化。',
  西双版纳绿叶宴: '这是多道菜组成的宴席，常见酸、辣、香草清香与烤制香气彼此交织。',
  香港家常妈妈菜: '这是家常菜集合，风味随菜式变化，整体侧重自然咸鲜与温和熟香。',
  尼西黑陶煮制食品: '黑陶慢煮令食材受热柔和，汤汁鲜醇，原料本味与炖煮香气较突出。',
  仿豹胎: '以细致刀工与清鲜调味见长，口感层次丰富，整体鲜香而不过分浓重。',
  元松: '以面米香为底，口感细致，具体甜咸与馅料风味随当地做法而变化。',
  白什盘: '多种食材拼合出咸鲜、清爽与脆嫩等层次，具体风味随配料而变化。',
  金齑玉脍: '以鱼鲜为主体，佐料带来清爽辛香与酸香，口感细嫩利落。',
  玲珑牡丹鲊: '发酵或腌渍形成柔和酸香与咸鲜，细致造型之下口感层次较丰富。',
  雪霞羹: '羹体细滑柔润，滋味清鲜淡雅，强调食材本味与温和汤香。',
  牛冻春: '凝冻口感清凉弹润，牛肉咸鲜醇厚，入口后肉香缓慢展开。',
  江边辣: '辣味鲜明，伴随香料辛香与咸鲜底味，整体热烈而开胃。',
  大福喜: '面点以温和麦香为底，口感松软或绵实，甜咸取向随具体制法而变化。',
  福寿饼: '饼皮麦香温和，口感酥松，常以柔和甜味收尾。',
  面果儿: '麦香朴素，口感或酥或韧，常带轻柔甜味与烘烤香。',
  九桃一手: '以面点的麦香和柔和甜味为主，造型之外重在松软或细腻口感。',
  琵琶结: '面香清晰，口感筋韧或松软，具体甜咸风味随制法变化。',
  茶聊鸡: '鸡肉鲜香，茶叶带来清雅焙火香与轻微回甘，整体温润不腻。',
  钻林欢喜丸: '丸子外层香浓、内里柔嫩，以咸鲜和食材熟香为主。',
  煲仔饭: '米饭吸收酱汁与配料香气，锅底焦脆，咸鲜中带油脂香和轻微回甜。',
  九层皮: '层层米皮柔韧软糯，米香清淡，蘸料为其补充咸鲜与辛香。',
  紫苏炒青蛳: '青蛳鲜味与紫苏的草本辛香交织，带锅气、咸鲜和轻微回甘。',
  丝娃娃: '薄皮柔韧，蔬菜爽脆，酸辣蘸水令整体清爽、鲜香而开胃。',
  萝卜饭: '米香温和，萝卜清甜软润，配料油脂与咸鲜渗入饭粒。',
  三角团: '米香清雅，外皮软糯，馅料带来甜润或咸鲜的层次。',
  船点: '米粉面团细腻软糯，造型精巧，内馅以温和甜香或咸鲜为主。',
  油茶: '炒米、茶与配料形成烘烤香和咸鲜味，汤感温厚，回味略带茶香。',
  涮黄喉: '口感爽脆弹韧，短时涮煮后吸附汤底的麻辣、咸鲜与香料气息。',
  蒸点: '蒸制面点柔软或软糯，麦米香温和，馅料带来甜咸不同层次。',
  石花膏: '质地清凉滑嫩，味道清淡，糖水带来轻柔甜味与清爽回甘。',
  五汁膏: '多种汁液熬制后甜润浓稠，果蔬清香集中，并带温和酸甜回味。',
  蛋挞: '挞皮酥松、烘烤香明显，蛋奶馅细滑甜润，带浓郁乳香。',
  茶香饭: '米饭柔润，茶香清雅并带轻微回甘，整体清淡而有谷物甜香。',
  客家盆菜: '多种肉、海味与蔬菜层层叠放，汤汁咸鲜浓醇，口感丰盛而多样。',
  左宗棠鸡: '炸鸡外酥内嫩，酱汁以甜酸、咸鲜和轻微辣味形成浓郁复合风味。',
  虾子焖茭白: '茭白清甜脆嫩，虾子增添集中鲜味，焖制后汤汁咸鲜柔润。',
};

const flavorFor = (name: string, category: string) => {
  const exactName = displayName(name);
  const exactProfile = exactFlavorProfiles[name] ?? exactFlavorProfiles[exactName];
  if (exactProfile) return exactProfile;

  if (/糖醋|松鼠鳜鱼|醋鱼|醋排/.test(name)) return '酸甜明快，糖与醋形成平衡，包裹食材本身的鲜味与熟香。';
  if (/鱼香/.test(name)) return '泡椒、葱姜蒜与糖醋构成咸、甜、酸、辣交织的复合鱼香味。';
  if (/麻辣|麻婆|麻辣烫|火锅|小面/.test(name)) return '麻与辣层层展开，伴随油脂、香辛料和咸鲜底味，香气浓而持久。';
  if (/藤椒|鲜花椒|花椒/.test(name)) return '花椒带来清亮麻香与柑橘般气息，咸鲜底味衬出食材本味。';
  if (/辣|泡椒|胡辣|燃面|娘惹香辣/.test(name)) return '辣味鲜明，辛香与咸鲜相互衬托，入口有层次而回味利落。';
  if (/酸汤/.test(name)) return '酸味清亮开胃，汤汁带发酵香与鲜味，衬出鱼肉或配菜的细嫩。';
  if (/臭豆腐|毛豆腐|臭鳜鱼|红霉豆腐渣/.test(name)) return '发酵气息鲜明，入口后咸鲜、豆香或鱼鲜逐渐展开，风味浓郁。';
  if (/泡菜|酸菜|腌菜|酸笋|酸肉|腌肉|腌鱼|腌禾花鱼/.test(name)) return '发酵酸香突出，咸鲜开胃，时间带来的醇厚气息留在回味中。';
  if (/虾酱|虾膏|鱼酱|豆瓣酱|大酱|西瓜酱|酱油/.test(name)) return '发酵带来浓缩咸鲜与酱香，鲜味饱满，回味较长。';
  if (/火腿|腊|咸肉|咸鸭蛋|乌鱼子|甜晒鱼/.test(name)) return '腌制令咸鲜与脂香更集中，并带有风干、熟成或烟熏形成的醇厚回味。';
  if (/米酒|黄酒|早酒|蜜制酒|酒糟/.test(name)) return '酒香柔和，带米粮发酵的甜润与微酸，入口醇和并有回甘。';
  if (/醋/.test(name)) return '酸香清亮而醇厚，入口柔和，回味带发酵形成的微甜与谷物香。';
  if (/烟熏|蔗渣熏|炭烤|烤鸭|烤鱼|烤包子|烧猪/.test(name)) return '烤制或烟熏香气突出，表层焦香，内里保留肉汁、鲜味与油脂香。';
  if (/红烧|烧肉|烧鸡|烧牛肉|卤鹅|卤肉|酱排骨|封肉|扣三丝|甜烧白/.test(name)) return '酱香与肉香醇厚，咸鲜中带柔和回甜，慢火使口感软润入味。';
  if (/炖|汤|炖罐|水盆|奶汤|羹/.test(name)) return '汤味温润鲜醇，慢火使食材的鲜甜、肉香或植物清香彼此融合。';
  if (/清蒸|白切|清炖|汽锅|粉蒸|蒸菜|蒸腊鱼|蒸嫩鸭/.test(name)) return '调味克制，以食材本身的鲜甜为主，蒸煮带来柔嫩、清润的口感。';
  if (/油炸|油爆|爆炒|火爆|生爆|盐煎|回锅|脆鳝|锅巴|蚝烙/.test(name)) return '锅气与焦香突出，外层爽脆或微焦，咸鲜油润，香气直接。';
  if (/凉拌|白肉|猪耳|海蜇|蓑衣黄瓜/.test(name)) return '口感爽脆或柔韧，蒜香、醋香与咸鲜调味清爽开胃。';
  if (/甜水面/.test(name)) return '酱汁甜咸浓厚，伴随芝麻与香辛料气息，粗面筋道有嚼劲。';
  if (/螺蛳粉/.test(name)) return '酸笋发酵香鲜明，酸、辣、咸、鲜交叠，米粉爽滑而汤味浓厚。';
  if (/沙茶/.test(name)) return '沙茶酱带来花生、蒜香与海味交织的复合咸鲜，浓郁中略带甜辣。';
  if (/喃咪酱/.test(name)) return '酸、辣、咸、鲜交织，香草与香辛料气息清亮，适合作为蘸味。';
  if (/清水炒蛋/.test(name)) return '蛋香柔和，口感嫩滑，调味清淡，突出鸡蛋自然鲜香。';
  if (/姜撞奶/.test(name)) return '奶香醇厚，姜汁辛香清晰，甜润凝滑，尾韵带温暖辛意。';
  if (/红豆沙/.test(name)) return '豆香细腻，甜度柔和，陈皮带来清新的柑橘香与微苦回甘。';
  if (/蜜|糖葱|切糕|玛仁糖|冰激凌|枣泥|柿饼|柿子糊塌/.test(name)) return '甜味饱满而不失原料香气，常伴果香、坚果香或谷物回味。';
  if (/糕|酥|饼|萨其马|月饼|汤圆|豆糖/.test(name)) return '甜香与谷物香为主，口感或酥松、或软糯，回味温和。';
  if (/包|饺|馄饨|烧麦|烧卖|卷|粿/.test(name)) return '面皮或米皮承托馅料鲜香，口感兼有柔韧、软糯与汁水感。';
  if (/面|粉|米线|面皮|拉条子|刀削|饸饹|片儿川|纳仁/.test(name)) return '谷物香清晰，面条或米粉提供筋道、柔韧或爽滑口感，汤汁与浇头补足咸鲜。';
  if (/馍|馕|粑粑|糍粑|抓饭|糯米饭|芋头饭|榆钱饭|五彩饭/.test(name)) return '米麦香朴实，口感软糯、筋实或松软，咀嚼后带自然回甜。';
  if (/豆花|豆腐|干丝|素鸭|上海素食/.test(name)) return '豆香清雅，质地细嫩、柔韧或绵密，调味以温和咸鲜衬托本味。';
  if (/笋|蒲菜|菠菜|白菜|野菜|藕|莲子|百合|芋头|洋芋|茄|慈姑/.test(name)) return '植物清香与自然清甜为主，口感在爽脆、粉糯或柔嫩之间展开。';
  if (/菌|菇|雁来蕈/.test(name)) return '菌菇鲜味饱满，带木质与泥土般香气，熟制后口感柔嫩。';
  if (category === '水产海鲜') return '水产鲜味清晰，肉质细嫩或弹润，并带自然清甜与轻微海味。';
  if (category === '肉禽') return '肉香与咸鲜为主，油脂带来丰润口感，具体香气随火候与调味展开。';
  if (category === '主食点心') return '谷物香温和，口感侧重筋道、软糯或酥松，并由馅料与汤汁补充滋味。';
  if (category === '发酵腌制') return '咸鲜经过发酵或熟成变得醇厚，伴随微酸、酱香或陈香。';
  if (category === '锅物') return '热汤汇聚食材鲜味与香料气息，入口温厚，风味随涮煮逐渐加深。';
  if (category === '宴饮') return '多道菜形成复合风味，清鲜、浓香与不同口感相互穿插。';
  if (category === '蔬果山珍') return '以植物清香和自然鲜甜为主，口感清脆、柔嫩或粉糯。';
  return '以食材本味为基础，呈现温和咸鲜与熟制香气，具体层次随地方做法而变化。';
};

const sourceNote = (season: string, episode: string) =>
  `公开分集资料将该条目列入《舌尖上的中国》${season}${episode}。`;

const uniqueSources = (sources: Array<MediaSource | undefined>) =>
  Array.from(new Map(sources.filter((source): source is MediaSource => Boolean(source)).map((source) => [source.url, source])).values());

const hasOfficialSource = (food: FoodItem) => food.sources.some((source) => /cctv\.com|cntv\.cn/.test(source.url));

const hasExternalEvidenceSource = (food: FoodItem) =>
  food.sources.some(
    (source) =>
      !source.url.includes('wikipedia.org') &&
      !source.url.includes('github.com/zhuyuxiao/Chinese-cuisine') &&
      !/cctv\.com|cntv\.cn/.test(source.url),
  );

const hasGithubCuisineSource = (food: FoodItem) => food.sources.some((source) => source.url.includes('zhuyuxiao/Chinese-cuisine'));

const shouldFlagWeakUnverifiedFood = (food: FoodItem) =>
  food.confidence !== '已核实' &&
  food.province === '待核实' &&
  !hasOfficialSource(food) &&
  !hasExternalEvidenceSource(food) &&
  !hasGithubCuisineSource(food);

const generatedFoods: FoodItem[] = episodeSeeds.flatMap((episodeSeed, episodeIndex) =>
  episodeSeed.items.map((rawName, itemIndex) => {
    const place = findPlace(rawName);
    const category = categoryFor(rawName);
    const name = displayName(rawName);
    const confidence = place.confidence ?? episodeSeed.confidence ?? (place.province === '待核实' ? '待核实' : '已核实');
    const generatedImage = generatedFoodImages[`${place.province}|${name}`] ?? generatedFoodImages[name];
    const sources = uniqueSources([episodeSeed.source, place.source, itemReviewCatalog[name] ?? itemReviewCatalog[rawName]]);

    return {
      id: `bite-${episodeIndex + 1}-${itemIndex + 1}`,
      name,
      province: place.province,
      city: place.city,
      region: place.region,
      longitude: place.longitude,
      latitude: place.latitude,
      category,
      ingredients: ingredientsFor(rawName),
      flavorProfile: flavorFor(rawName, category),
      story: `${sourceNote(episodeSeed.season, episodeSeed.episode)}${
        place.source ? '地点信息已补充对应的央视网节目页或片段页来源。' : ''
      }当前数据先保留名称、分集关系、地理归档和来源，后续可继续补入人物与制作过程。`,
      culturalContext:
        place.province === '待核实'
          ? '公开资料未稳定给出明确拍摄地点，暂不绑定到具体省份，避免把地域信息写成未经核实的事实。'
          : `按公开条目中的地名、菜名或官方节目页线索归入${place.province}${
              place.city === '待核实' ? '' : ` · ${place.city}`
            }，用于地图浏览；更细的地域背景仍待人工校订。`,
      image: generatedImage
        ? {
            ...generatedImage,
            source: generatedImageSource(generatedImage.url),
          }
        : undefined,
      season: episodeSeed.season,
      episode: episodeSeed.episode,
      sources,
      confidence,
    };
  }),
);

export const removalCandidateFoods = generatedFoods
  .filter(
    (food) => manuallyExcludedFoodNames.has(food.name) || manuallyHiddenFoodNames.has(food.name) || shouldFlagWeakUnverifiedFood(food),
  )
  .map((food) => ({
    ...food,
    reviewNote: manuallyHiddenFoodNames.has(food.name)
      ? '人工审核：隐藏，不在网页显示'
      : manuallyExcludedFoodNames.has(food.name)
        ? '人工审核：删除，不在网页显示'
        : '待核实',
  }));

export const allFoods: FoodItem[] = generatedFoods.filter(
  (food) => !manuallyExcludedFoodNames.has(food.name) && !manuallyHiddenFoodNames.has(food.name),
);

// 首发版本只展示已有图片的条目；完整数据继续保留在 allFoods 中，便于后续补图后恢复。
export const foods: FoodItem[] = allFoods.filter((food) => Boolean(food.image?.url));

export const foodById = new Map(foods.map((food) => [food.id, food]));
