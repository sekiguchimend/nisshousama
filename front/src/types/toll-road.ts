// 有料道路関連の型定義

// 料金種別
export type TollType = 'regular' | 'etc';

// 料金情報
export interface TollFee {
  regular: number; // 通常料金
  etc: number;     // ETC料金
}

// インターチェンジ
export interface Interchange {
  id: string;
  name: string;
  order: number; // 順番
  expresswayId: string; // 所属高速道路ID
}

// 高速道路
export interface Expressway {
  id: string;
  name: string; // 名神高速、東名高速など
  operatorId: string; // 運営会社ID
}

// 運営会社
export interface TollOperator {
  id: string;
  name: string; // NEXCO東日本、NEXCO中日本、NEXCO西日本など
}

// 有料道路料金
export interface TollRoad {
  no: number;
  name: string; // 名称（区間名など）
  ic1Order: number; // IC1順
  ic1: string; // IC1（インターチェンジ1）
  ic2Order: number; // IC2順
  ic2: string; // IC2（インターチェンジ2）
  regularToll: TollFee; // 普通車料金（通常/ETC）
  lightToll: TollFee; // 軽自動車料金（通常/ETC）
  operatorId: string; // 運営会社ID
  expresswayId: string; // 高速道路ID
  createdAt: string;
  updatedAt: string;
}

// 料金種別の表示ラベル
export const tollTypeLabels: Record<TollType, string> = {
  regular: '通常',
  etc: 'ETC'
};

// 車種の表示ラベル
export const vehicleTypeLabels = {
  regular: '普通車',
  light: '軽自動車'
} as const;

export type VehicleType = keyof typeof vehicleTypeLabels;
