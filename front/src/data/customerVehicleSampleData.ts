// 顧客車両情報のサンプルデータ

import { CustomerVehicle } from '@/types/customer-vehicle';

// ナンバープレート作成用ヘルパー関数
const createPlateNumber = (
  region: string,
  classificationNumber: string,
  hiraganaSymbol: string,
  vehicleNumber: string
): string => {
  return `${region} ${classificationNumber} ${hiraganaSymbol} ${vehicleNumber}`;
};

export const customerVehicleSampleData: CustomerVehicle[] = [
  {
    id: 'cv001',
    ctNo: 'CT001',
    customerName: 'タナカ',
    vehicleType: 'プリウス',
    vehicleColor: '白',
    region: '品川',
    classificationNumber: '300',
    hiraganaSymbol: 'あ',
    vehicleNumber: '1234',
    serialNumber: 1,
    plateNumber: createPlateNumber('品川', '300', 'あ', '1234'),
    registrationDate: '2024-01-15',
    status: 'active',
    notes: '法人車両'
  },
  {
    id: 'cv002',
    ctNo: 'CT002',
    customerName: 'サトウ',
    vehicleType: 'クラウン',
    vehicleColor: '黒',
    region: '練馬',
    classificationNumber: '301',
    hiraganaSymbol: 'か',
    vehicleNumber: '5678',
    serialNumber: 2,
    plateNumber: createPlateNumber('練馬', '301', 'か', '5678'),
    registrationDate: '2024-02-20',
    status: 'active'
  },
  {
    id: 'cv003',
    ctNo: 'CT003',
    customerName: 'スズキ',
    vehicleType: 'アクア',
    vehicleColor: '青',
    region: '世田谷',
    classificationNumber: '300',
    hiraganaSymbol: 'さ',
    vehicleNumber: '9012',
    serialNumber: 3,
    plateNumber: createPlateNumber('世田谷', '300', 'さ', '9012'),
    registrationDate: '2024-03-10',
    status: 'active',
    notes: 'ハイブリッド車'
  },
  {
    id: 'cv004',
    ctNo: 'CT004',
    customerName: 'ワタナベ',
    vehicleType: 'ヴェルファイア',
    vehicleColor: '白パール',
    region: '多摩',
    classificationNumber: '301',
    hiraganaSymbol: 'た',
    vehicleNumber: '3456',
    serialNumber: 4,
    plateNumber: createPlateNumber('多摩', '301', 'た', '3456'),
    registrationDate: '2024-04-05',
    status: 'active',
    notes: '大型ミニバン'
  },
  {
    id: 'cv005',
    ctNo: 'CT005',
    customerName: 'イトウ',
    vehicleType: 'カムリ',
    vehicleColor: 'シルバー',
    region: '品川',
    classificationNumber: '300',
    hiraganaSymbol: 'な',
    vehicleNumber: '7890',
    serialNumber: 5,
    plateNumber: createPlateNumber('品川', '300', 'な', '7890'),
    registrationDate: '2024-05-12',
    status: 'active'
  },
  {
    id: 'cv006',
    ctNo: 'CT006',
    customerName: 'ヤマダ',
    vehicleType: 'レクサス LS',
    vehicleColor: '黒',
    region: '港',
    classificationNumber: '301',
    hiraganaSymbol: 'は',
    vehicleNumber: '1111',
    serialNumber: 6,
    plateNumber: createPlateNumber('港', '301', 'は', '1111'),
    registrationDate: '2024-06-18',
    status: 'active',
    notes: '高級車'
  },
  {
    id: 'cv007',
    ctNo: 'CT007',
    customerName: 'コバヤシ',
    vehicleType: 'アルファード',
    vehicleColor: '白',
    region: '杉並',
    classificationNumber: '301',
    hiraganaSymbol: 'ま',
    vehicleNumber: '2222',
    serialNumber: 7,
    plateNumber: createPlateNumber('杉並', '301', 'ま', '2222'),
    registrationDate: '2024-07-03',
    status: 'active'
  },
  {
    id: 'cv008',
    ctNo: 'CT008',
    customerName: 'ナカムラ',
    vehicleType: 'フィット',
    vehicleColor: '赤',
    region: '足立',
    classificationNumber: '300',
    hiraganaSymbol: 'や',
    vehicleNumber: '3333',
    serialNumber: 8,
    plateNumber: createPlateNumber('足立', '300', 'や', '3333'),
    registrationDate: '2024-08-14',
    status: 'inactive',
    notes: 'メンテナンス中'
  },
  {
    id: 'cv009',
    ctNo: 'CT009',
    customerName: 'キムラ',
    vehicleType: 'セレナ',
    vehicleColor: 'グレー',
    region: '板橋',
    classificationNumber: '301',
    hiraganaSymbol: 'ら',
    vehicleNumber: '4444',
    serialNumber: 9,
    plateNumber: createPlateNumber('板橋', '301', 'ら', '4444'),
    registrationDate: '2024-09-01',
    status: 'active',
    notes: 'ファミリーカー'
  },
  {
    id: 'cv010',
    ctNo: 'CT010',
    customerName: 'ハヤシ',
    vehicleType: 'ノート',
    vehicleColor: '青',
    region: '江戸川',
    classificationNumber: '300',
    hiraganaSymbol: 'わ',
    vehicleNumber: '5555',
    serialNumber: 10,
    plateNumber: createPlateNumber('江戸川', '300', 'わ', '5555'),
    registrationDate: '2024-09-15',
    status: 'active',
    notes: 'コンパクトカー'
  },
  {
    id: 'cv011',
    ctNo: 'CT011',
    customerName: 'マツモト',
    vehicleType: 'エスティマ',
    vehicleColor: '白',
    region: '葛飾',
    classificationNumber: '301',
    hiraganaSymbol: 'あ',
    vehicleNumber: '6666',
    serialNumber: 11,
    plateNumber: createPlateNumber('葛飾', '301', 'あ', '6666'),
    registrationDate: '2024-10-05',
    status: 'suspended',
    notes: '整備点検期間'
  },
  {
    id: 'cv012',
    ctNo: 'CT012',
    customerName: 'オオツカ',
    vehicleType: 'ハリアー',
    vehicleColor: '黒',
    region: '新宿',
    classificationNumber: '301',
    hiraganaSymbol: 'か',
    vehicleNumber: '7777',
    serialNumber: 12,
    plateNumber: createPlateNumber('新宿', '301', 'か', '7777'),
    registrationDate: '2024-11-02',
    status: 'active',
    notes: 'SUV'
  }
];

// 地域の選択肢
export const regionOptions = [
  '品川', '練馬', '世田谷', '多摩', '港', '杉並', '足立', '板橋', '江戸川', '葛飾', '新宿', '渋谷'
];

// 車種の選択肢
export const vehicleTypeOptions = [
  'プリウス', 'クラウン', 'アクア', 'ヴェルファイア', 'カムリ', 'レクサス LS', 'アルファード', 
  'フィット', 'セレナ', 'ノート', 'エスティマ', 'ハリアー', 'ヴォクシー', 'ノア', 'シエンタ'
];

// 車色の選択肢
export const vehicleColorOptions = [
  '白', '黒', '青', 'シルバー', 'グレー', '赤', '白パール', 'ブルー', 'ガンメタリック', 'ワインレッド'
];

// ひらがな記号の選択肢
export const hiraganaSymbolOptions = [
  'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'
];
