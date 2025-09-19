// 有料道路サンプルデータ

import { TollRoad, TollFee } from '@/types/toll-road';

// 料金ヘルパー関数
const createTollFee = (regularPrice: number, etcPrice: number): TollFee => ({
  regular: regularPrice,
  etc: etcPrice,
});

// 有料道路料金サンプルデータ
export const tollRoadSampleData: TollRoad[] = [
  // 名神高速道路の料金設定
  {
    no: 1,
    name: '小牧-一宮間',
    ic1Order: 1,
    ic1: '小牧IC',
    ic2Order: 3,
    ic2: '一宮IC',
    regularToll: createTollFee(320, 250),
    lightToll: createTollFee(260, 200),
    operatorId: 'nexco-west',
    expresswayId: 'meishin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 2,
    name: '一宮-大垣間',
    ic1Order: 3,
    ic1: '一宮IC',
    ic2Order: 5,
    ic2: '大垣IC',
    regularToll: createTollFee(480, 380),
    lightToll: createTollFee(390, 310),
    operatorId: 'nexco-west',
    expresswayId: 'meishin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 3,
    name: '大垣-米原間',
    ic1Order: 5,
    ic1: '大垣IC',
    ic2Order: 7,
    ic2: '米原IC',
    regularToll: createTollFee(560, 440),
    lightToll: createTollFee(450, 360),
    operatorId: 'nexco-west',
    expresswayId: 'meishin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 4,
    name: '米原-京都東間',
    ic1Order: 7,
    ic1: '米原IC',
    ic2Order: 11,
    ic2: '京都東IC',
    regularToll: createTollFee(920, 720),
    lightToll: createTollFee(740, 580),
    operatorId: 'nexco-west',
    expresswayId: 'meishin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 5,
    name: '京都東-大阪間',
    ic1Order: 11,
    ic1: '京都東IC',
    ic2Order: 13,
    ic2: '大阪IC',
    regularToll: createTollFee(610, 480),
    lightToll: createTollFee(490, 390),
    operatorId: 'nexco-west',
    expresswayId: 'meishin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // 東名高速道路の料金設定
  {
    no: 6,
    name: '東京-横浜町田間',
    ic1Order: 1,
    ic1: '東京IC',
    ic2Order: 5,
    ic2: '横浜町田IC',
    regularToll: createTollFee(640, 500),
    lightToll: createTollFee(520, 410),
    operatorId: 'nexco-central',
    expresswayId: 'tomei',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 7,
    name: '横浜町田-厚木間',
    ic1Order: 5,
    ic1: '横浜町田IC',
    ic2Order: 6,
    ic2: '厚木IC',
    regularToll: createTollFee(320, 250),
    lightToll: createTollFee(260, 200),
    operatorId: 'nexco-central',
    expresswayId: 'tomei',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 8,
    name: '厚木-御殿場間',
    ic1Order: 6,
    ic1: '厚木IC',
    ic2Order: 8,
    ic2: '御殿場IC',
    regularToll: createTollFee(780, 610),
    lightToll: createTollFee(630, 490),
    operatorId: 'nexco-central',
    expresswayId: 'tomei',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 9,
    name: '御殿場-静岡間',
    ic1Order: 8,
    ic1: '御殿場IC',
    ic2Order: 13,
    ic2: '静岡IC',
    regularToll: createTollFee(1200, 940),
    lightToll: createTollFee(970, 760),
    operatorId: 'nexco-central',
    expresswayId: 'tomei',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 10,
    name: '静岡-浜松間',
    ic1Order: 13,
    ic1: '静岡IC',
    ic2Order: 17,
    ic2: '浜松IC',
    regularToll: createTollFee(930, 730),
    lightToll: createTollFee(750, 590),
    operatorId: 'nexco-central',
    expresswayId: 'tomei',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 11,
    name: '浜松-名古屋間',
    ic1Order: 17,
    ic1: '浜松IC',
    ic2Order: 23,
    ic2: '名古屋IC',
    regularToll: createTollFee(1540, 1210),
    lightToll: createTollFee(1240, 970),
    operatorId: 'nexco-central',
    expresswayId: 'tomei',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // 中央自動車道の料金設定
  {
    no: 12,
    name: '高井戸-八王子間',
    ic1Order: 1,
    ic1: '高井戸IC',
    ic2Order: 5,
    ic2: '八王子IC',
    regularToll: createTollFee(860, 670),
    lightToll: createTollFee(700, 550),
    operatorId: 'nexco-central',
    expresswayId: 'chuo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 13,
    name: '八王子-大月間',
    ic1Order: 5,
    ic1: '八王子IC',
    ic2Order: 7,
    ic2: '大月IC',
    regularToll: createTollFee(920, 720),
    lightToll: createTollFee(740, 580),
    operatorId: 'nexco-central',
    expresswayId: 'chuo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 14,
    name: '大月-甲府間',
    ic1Order: 7,
    ic1: '大月IC',
    ic2Order: 10,
    ic2: '甲府IC',
    regularToll: createTollFee(1100, 860),
    lightToll: createTollFee(890, 700),
    operatorId: 'nexco-central',
    expresswayId: 'chuo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 15,
    name: '甲府-諏訪間',
    ic1Order: 10,
    ic1: '甲府IC',
    ic2Order: 12,
    ic2: '諏訪IC',
    regularToll: createTollFee(1680, 1320),
    lightToll: createTollFee(1350, 1060),
    operatorId: 'nexco-central',
    expresswayId: 'chuo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 16,
    name: '諏訪-中津川間',
    ic1Order: 12,
    ic1: '諏訪IC',
    ic2Order: 15,
    ic2: '中津川IC',
    regularToll: createTollFee(1450, 1140),
    lightToll: createTollFee(1170, 920),
    operatorId: 'nexco-central',
    expresswayId: 'chuo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    no: 17,
    name: '中津川-小牧東間',
    ic1Order: 15,
    ic1: '中津川IC',
    ic2Order: 19,
    ic2: '小牧東IC',
    regularToll: createTollFee(1200, 940),
    lightToll: createTollFee(970, 760),
    operatorId: 'nexco-central',
    expresswayId: 'chuo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// 検索・フィルタリング関数
export const getTollRoadsByExpressway = (expresswayId: string): TollRoad[] => {
  return tollRoadSampleData.filter(road => road.expresswayId === expresswayId);
};

export const getTollRoadByIC = (ic1: string, ic2: string): TollRoad | undefined => {
  return tollRoadSampleData.find(road => 
    (road.ic1 === ic1 && road.ic2 === ic2) || 
    (road.ic1 === ic2 && road.ic2 === ic1)
  );
};

export const getTollRoadsByOperator = (operatorId: string): TollRoad[] => {
  return tollRoadSampleData.filter(road => road.operatorId === operatorId);
};

// 料金計算関数
export const calculateToll = (
  road: TollRoad, 
  vehicleType: 'regular' | 'light', 
  tollType: 'regular' | 'etc'
): number => {
  const fee = vehicleType === 'regular' ? road.regularToll : road.lightToll;
  return tollType === 'regular' ? fee.regular : fee.etc;
};
