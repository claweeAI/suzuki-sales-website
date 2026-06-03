// 業務基本資料
export const dealer = {
  name: "張鈺漣",
  phone: "0987-629-773",
  line: "ke030",
  email: "",
  location: "凱騰鈴木 Suzuki 北投所｜台北市北投區承德路六段337號",
  brandColor: "#e60012",
} as const;

export interface ColorOption {
  name: string;
  hex: string;
}

export interface CarDetail {
  specs: string[];
  whoFor: string;
  monthlyPromo?: string;
  tagline: string;
  images?: string[];
  colors?: ColorOption[];
}

export interface Car {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  highlights: string[];
  detail: CarDetail;
}

export const cars: Car[] = [
  {
    id: "e-vitara",
    name: "e VITARA",
    subtitle: "純電休旅",
    description: "純電世代，零油耗的智慧移動",
    price: "115 萬起",
    highlights: ["純電行駛", "續航 516km", "ALLGRIP-e 四驅"],
    detail: {
      tagline: "純電新生活，即刻展開",
      specs: [
        "動力系統：純電馬達 (61kWh 電池)",
        "驅動方式：2WD 前驅 / ALLGRIP-e 四驅",
        "續航里程：2WD 約 516km / ALLGRIP-e 約 444km (NEDC)",
        "DC 快充：約 45 分鐘 (10%→80%)",
        "售價：2WD 115 萬 / ALLGRIP-e 123 萬",
      ],
      whoFor: "重視環保、想降低日常通勤成本的科技先驅",
      monthlyPromo: "試乘加碼抽豪華郵輪雙人套票，歡迎預約試乘",
      images: ["e-vitara", "e-vitara-side", "e-vitara-int"],
      colors: [
        // 2WD 前驅車型 — 單色塗裝
        { name: "珍珠白", hex: "#f0f0f0" },
        { name: "冰鑽藍", hex: "#3b7dd8" },
        { name: "銀灰", hex: "#b0b0b0" },
        { name: "星塵灰", hex: "#7a7a7a" },
        // ALLGRIP-e 四驅車型 — 專屬雙色（搭配黑化車頂）
        { name: "雙色 珍珠白", hex: "#f0f0f0" },
        { name: "雙色 復古綠", hex: "#556b2f" },
        { name: "雙色 星塵灰", hex: "#7a7a7a" },
      ],
    },
  },
  {
    id: "swift",
    name: "SWIFT",
    subtitle: "靈活小車",
    description: "城市經典新風範，日本進口輕油電",
    price: "73 萬起",
    highlights: ["24.5km/L 油耗", "日本進口", "機械車位 OK"],
    detail: {
      tagline: "都會精靈，靈巧省油",
      specs: [
        "引擎：1.2L 直列三缸 + 12V HYBRID輕油電",
        "馬力：81 PS / 5,700 rpm",
        "油耗：24.5 km/L (能源局)",
        "尺寸：3,860 x 1,695 x 1,500 mm",
        "行李箱：265L (後座傾倒 579L)",
        "安全：ACC全速域 + 6 SRS氣囊 + DSBS碰撞緩解",
      ],
      whoFor: "首購族、市區通勤族、機械車位也沒問題",
      monthlyPromo: "本月購車享 60 萬 0 利率分期，歡迎來店賞車試乘，贈送行車紀錄器",
      images: ["swift", "swift-side", "swift-int"],
      colors: [
        // 單色
        { name: "珍珠白", hex: "#f5f5f5" },
        { name: "橘色", hex: "#ff8c00" },
        { name: "冰藍", hex: "#8ecae6" },
        { name: "銀灰", hex: "#b0b0b0" },
        // 雙色（搭配黑化車頂）
        { name: "雙色 黃綠", hex: "#9acd32" },
        { name: "雙色 紅", hex: "#e63946" },
      ],
    },
  },
  {
    id: "jimny",
    name: "Jimny",
    subtitle: "硬派越野",
    description: "經典方正造型，越野玩家的夢想車",
    price: "84.9 萬起",
    highlights: ["梯形大樑", "4WD加力箱", "經典方正外型"],
    detail: {
      tagline: "為征服荒野而生",
      specs: [
        "引擎：1.5L 直列四缸",
        "馬力：102 PS / 6,000 rpm",
        "驅動：Part-time 4WD 加力箱 (2H/4H/4L)",
        "尺寸：3,645 x 1,645 x 1,730 mm",
        "油耗：15.6 km/L",
        "底盤：階梯式大樑 (Ladder Frame)",
        "安全：車道偏離警示 + 6 SRS 氣囊",
      ],
      whoFor: "戶外玩家、露營愛好者、想要個性化車款的你",
      monthlyPromo: "本月送丙式車體險 + 50 萬 36 期低利率，歡迎來店賞車",
      images: ["jimny", "jimny-side", "jimny-int"],
      colors: [
        { name: "珍珠白", hex: "#f0f0f0" },
        { name: "復古綠", hex: "#556b2f" },
        { name: "軍艦灰", hex: "#4a4a4a" },
        { name: "活力藍", hex: "#1d72b8" },
        { name: "芥末黃", hex: "#d4a017" },
        { name: "米色", hex: "#d4c5a0" },
      ],
    },
  },
  {
    id: "vitara",
    name: "VITARA",
    subtitle: "都會休旅",
    description: "ALLGRIP 四驅加持，1.4L BOOSTJET 渦輪",
    price: "104 萬起",
    highlights: ["ALLGRIP 四輪傳動", "1.4L BOOSTJET", "48V 輕油電"],
    detail: {
      tagline: "型動新生，智慧升級",
      specs: [
        "引擎：1.4L BOOSTJET 缸內直噴渦輪 + 48V輕油電",
        "馬力：129.2 PS / 5,500 rpm",
        "扭力：23.9 kgm / 2,000 rpm",
        "驅動：ALLGRIP 適時四輪傳動 (Auto/Sport/Snow/Lock)",
        "油耗：17.6 km/L",
        "行李箱：375L (最大 710L)",
        "安全：ACC + 車道維持 + 7 SRS 氣囊",
      ],
      whoFor: "熱愛戶外活動的小家庭，想要 SUV 機能與駕駛樂趣",
      monthlyPromo: "本月購車享 70 萬 0 利率，歡迎來店賞車",
      images: ["vitara", "vitara-side", "vitara-int"],
      colors: [
        // 單色
        { name: "珍珠白", hex: "#f0f0f0" },
        { name: "銀灰", hex: "#b0b0b0" },
        { name: "星塵灰", hex: "#7a7a7a" },
        // 雙色（搭配黑化車頂）
        { name: "雙色 藍黑", hex: "#1a3a5c" },
        { name: "雙色 紅黑", hex: "#c1121f" },
      ],
    },
  },
  {
    id: "s-cross",
    name: "S-CROSS",
    subtitle: "跨界休旅",
    description: "寬敞行李廂，48V 輕油電，Level 2 安全",
    price: "98 萬起",
    highlights: ["440L 行李廂", "48V 輕油電", "6 SRS 氣囊"],
    detail: {
      tagline: "跨界全能，唯我電能",
      specs: [
        "引擎：1.4L BOOSTJET + 48V 輕油電",
        "馬力：129.2 PS / 5,500 rpm",
        "扭力：23.9 kgm / 3,000 rpm",
        "油耗：19 km/L (能源局)",
        "行李箱：440L (後座傾倒 1,230L)",
        "驅動：2WD 前驅",
        "安全：ACC + LKA + 360°環景 + 6 SRS 氣囊",
      ],
      whoFor: "經常長途出遊、需要大空間的大家庭或露營愛好者",
      monthlyPromo: "本月專案：享 60 萬 0 利率，歡迎來店賞車試乘",
      images: ["s-cross", "s-cross-side", "s-cross-int"],
      colors: [
        { name: "珍珠白", hex: "#f0f0f0" },
        { name: "冰鑽藍", hex: "#3b7dd8" },
        { name: "星塵灰", hex: "#7a7a7a" },
      ],
    },
  },
  {
    id: "carry",
    name: "CARRY",
    subtitle: "商用貨車",
    description: "頭家首選，同級最強載重 915kg",
    price: "49.9 萬起",
    highlights: ["載重 915kg", "同級最強", "低月付方案"],
    detail: {
      tagline: "拼大生意，就選 CARRY",
      specs: [
        "引擎：1.5L 直列四缸",
        "馬力：96 PS",
        "扭力：13.8 kgm",
        "載重：915 kg (同級最強)",
        "貨台：2,565 x 1,660 x 290 mm (三邊可開)",
        "油耗：12.9 km/L",
        "保固：三年或十萬公里原廠保固",
      ],
      whoFor: "創業頭家、自營商、物流運輸業者",
      monthlyPromo: "商用車專案：萬元購車金，低月付方案實施中，歡迎來店洽詢",
      images: ["carry", "carry-side", "carry-int"],
      colors: [
        { name: "珍珠白", hex: "#f0f0f0" },
        { name: "銀灰", hex: "#b0b0b0" },
      ],
    },
  },
];

export const services = [
  { title: "新車介紹", desc: "掌握 Suzuki 全車系最新資訊與價格" },
  { title: "車款比較", desc: "依你的需求幫你分析最適合的車款" },
  { title: "預約試乘", desc: "安排你想試的車款，到店直接上路" },
  { title: "購車諮詢", desc: "從選車到成交，陪你走完整個流程" },
  { title: "貸款／保險試算", desc: "試算月付金額，找到最輕鬆的方案" },
  { title: "交車服務", desc: "完整交車說明，讓你安心上路" },
] as const;

export const usageOptions = [
  "市區通勤代步",
  "家庭出遊",
  "戶外露營／越野",
  "商用載貨",
  "第一台車",
  "換車升級",
  "其他",
] as const;

export const budgetRanges = [
  "50 萬以下",
  "50-70 萬",
  "70-90 萬",
  "90-120 萬",
  "120 萬以上",
  "還不確定",
] as const;
