// インターチェンジサンプルデータ

import { Interchange, Expressway, TollOperator } from '@/types/toll-road';

// 運営会社データ
export const tollOperators: TollOperator[] = [
  { id: 'nexco-east', name: 'NEXCO東日本' },
  { id: 'nexco-central', name: 'NEXCO中日本' },
  { id: 'nexco-west', name: 'NEXCO西日本' },
  { id: 'jh-metropolitan', name: '首都高速道路' },
  { id: 'jh-hanshin', name: '阪神高速道路' },
];

// 高速道路データ
export const expressways: Expressway[] = [
  { id: 'meishin', name: '名神高速道路', operatorId: 'nexco-west' },
  { id: 'tomei', name: '東名高速道路', operatorId: 'nexco-central' },
  { id: 'chuo', name: '中央自動車道', operatorId: 'nexco-central' },
  { id: 'kanetsu', name: '関越自動車道', operatorId: 'nexco-east' },
  { id: 'tohoku', name: '東北自動車道', operatorId: 'nexco-east' },
  { id: 'sanyo', name: '山陽自動車道', operatorId: 'nexco-west' },
];

// 名神高速道路のインターチェンジ
export const meishinInterchanges: Interchange[] = [
  { id: 'meishin-komaki', name: '小牧IC', order: 1, expresswayId: 'meishin' },
  { id: 'meishin-kasugai', name: '春日井IC', order: 2, expresswayId: 'meishin' },
  { id: 'meishin-ichinomiya', name: '一宮IC', order: 3, expresswayId: 'meishin' },
  { id: 'meishin-gifu-hashima', name: '岐阜羽島IC', order: 4, expresswayId: 'meishin' },
  { id: 'meishin-ogaki', name: '大垣IC', order: 5, expresswayId: 'meishin' },
  { id: 'meishin-sekigahara', name: '関ヶ原IC', order: 6, expresswayId: 'meishin' },
  { id: 'meishin-yonehara', name: '米原IC', order: 7, expresswayId: 'meishin' },
  { id: 'meishin-hikone', name: '彦根IC', order: 8, expresswayId: 'meishin' },
  { id: 'meishin-hachiman', name: '八日市IC', order: 9, expresswayId: 'meishin' },
  { id: 'meishin-ritto', name: '栗東IC', order: 10, expresswayId: 'meishin' },
  { id: 'meishin-kyoto-higashi', name: '京都東IC', order: 11, expresswayId: 'meishin' },
  { id: 'meishin-kyoto-minami', name: '京都南IC', order: 12, expresswayId: 'meishin' },
  { id: 'meishin-osaka', name: '大阪IC', order: 13, expresswayId: 'meishin' },
];

// 東名高速道路のインターチェンジ
export const tomeiInterchanges: Interchange[] = [
  { id: 'tomei-tokyo', name: '東京IC', order: 1, expresswayId: 'tomei' },
  { id: 'tomei-yoga', name: '用賀IC', order: 2, expresswayId: 'tomei' },
  { id: 'tomei-setagaya', name: '世田谷IC', order: 3, expresswayId: 'tomei' },
  { id: 'tomei-kawasaki', name: '川崎IC', order: 4, expresswayId: 'tomei' },
  { id: 'tomei-yokohama-machida', name: '横浜町田IC', order: 5, expresswayId: 'tomei' },
  { id: 'tomei-atsugi', name: '厚木IC', order: 6, expresswayId: 'tomei' },
  { id: 'tomei-odawara', name: '小田原IC', order: 7, expresswayId: 'tomei' },
  { id: 'tomei-gotemba', name: '御殿場IC', order: 8, expresswayId: 'tomei' },
  { id: 'tomei-susono', name: '裾野IC', order: 9, expresswayId: 'tomei' },
  { id: 'tomei-numazu', name: '沼津IC', order: 10, expresswayId: 'tomei' },
  { id: 'tomei-fuji', name: '富士IC', order: 11, expresswayId: 'tomei' },
  { id: 'tomei-shimizu', name: '清水IC', order: 12, expresswayId: 'tomei' },
  { id: 'tomei-shizuoka', name: '静岡IC', order: 13, expresswayId: 'tomei' },
  { id: 'tomei-yaizu', name: '焼津IC', order: 14, expresswayId: 'tomei' },
  { id: 'tomei-yoshida', name: '吉田IC', order: 15, expresswayId: 'tomei' },
  { id: 'tomei-kakegawa', name: '掛川IC', order: 16, expresswayId: 'tomei' },
  { id: 'tomei-hamamatsu', name: '浜松IC', order: 17, expresswayId: 'tomei' },
  { id: 'tomei-hamamatsu-nishi', name: '浜松西IC', order: 18, expresswayId: 'tomei' },
  { id: 'tomei-mikkabi', name: '三ヶ日IC', order: 19, expresswayId: 'tomei' },
  { id: 'tomei-toyokawa', name: '豊川IC', order: 20, expresswayId: 'tomei' },
  { id: 'tomei-okazaki', name: '岡崎IC', order: 21, expresswayId: 'tomei' },
  { id: 'tomei-toyota', name: '豊田IC', order: 22, expresswayId: 'tomei' },
  { id: 'tomei-nagoya', name: '名古屋IC', order: 23, expresswayId: 'tomei' },
];

// 中央自動車道のインターチェンジ
export const chuoInterchanges: Interchange[] = [
  { id: 'chuo-takaitanuki', name: '高井戸IC', order: 1, expresswayId: 'chuo' },
  { id: 'chuo-chofu', name: '調布IC', order: 2, expresswayId: 'chuo' },
  { id: 'chuo-kunitachi-fuchu', name: '国立府中IC', order: 3, expresswayId: 'chuo' },
  { id: 'chuo-hino', name: '日野IC', order: 4, expresswayId: 'chuo' },
  { id: 'chuo-hachioji', name: '八王子IC', order: 5, expresswayId: 'chuo' },
  { id: 'chuo-sagamiko-higashi', name: '相模湖東IC', order: 6, expresswayId: 'chuo' },
  { id: 'chuo-otsuki', name: '大月IC', order: 7, expresswayId: 'chuo' },
  { id: 'chuo-kawaguchiko', name: '河口湖IC', order: 8, expresswayId: 'chuo' },
  { id: 'chuo-kofu-minami', name: '甲府南IC', order: 9, expresswayId: 'chuo' },
  { id: 'chuo-kofu', name: '甲府IC', order: 10, expresswayId: 'chuo' },
  { id: 'chuo-nirasaki', name: '韮崎IC', order: 11, expresswayId: 'chuo' },
  { id: 'chuo-suwa', name: '諏訪IC', order: 12, expresswayId: 'chuo' },
  { id: 'chuo-okaya', name: '岡谷IC', order: 13, expresswayId: 'chuo' },
  { id: 'chuo-shiojiri', name: '塩尻IC', order: 14, expresswayId: 'chuo' },
  { id: 'chuo-nakatsugawa', name: '中津川IC', order: 15, expresswayId: 'chuo' },
  { id: 'chuo-mizunami', name: '瑞浪IC', order: 16, expresswayId: 'chuo' },
  { id: 'chuo-toki', name: '土岐IC', order: 17, expresswayId: 'chuo' },
  { id: 'chuo-tajimi', name: '多治見IC', order: 18, expresswayId: 'chuo' },
  { id: 'chuo-komaki-higashi', name: '小牧東IC', order: 19, expresswayId: 'chuo' },
];

// 全インターチェンジを統合
export const allInterchanges: Interchange[] = [
  ...meishinInterchanges,
  ...tomeiInterchanges,
  ...chuoInterchanges,
];

// 高速道路別インターチェンジ取得関数
export const getInterchangesByExpressway = (expresswayId: string): Interchange[] => {
  return allInterchanges.filter(ic => ic.expresswayId === expresswayId);
};

// インターチェンジ名から取得
export const getInterchangeByName = (name: string): Interchange | undefined => {
  return allInterchanges.find(ic => ic.name === name);
};

// 運営会社名取得
export const getOperatorName = (operatorId: string): string => {
  const operator = tollOperators.find(op => op.id === operatorId);
  return operator?.name || '';
};
