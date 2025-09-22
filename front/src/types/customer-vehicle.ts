// 顧客車両詳細情報の型定義

export interface CustomerVehicle {
  id: string;
  ctNo: string; // 顧客番号
  customerName: string; // 顧客名（名字カタカナ）
  vehicleType: string; // 車種
  vehicleColor: string; // 車色
  region: string; // 地域（品川、練馬など）
  classificationNumber: string; // 車種番号（3桁）
  hiraganaSymbol: string; // 記号（ひらがな一文字）
  vehicleNumber: string; // 車番号（4桁）
  serialNumber: number; // 番号（通し番号）
  plateNumber: string; // フルナンバープレート表示用
  registrationDate: string; // 登録日
  status: 'active' | 'inactive' | 'suspended'; // ステータス
  notes?: string; // 備考
}

// 顧客車両の編集用フォームデータ
export interface CustomerVehicleFormData {
  ctNo: string;
  customerName: string;
  vehicleType: string;
  vehicleColor: string;
  region: string;
  classificationNumber: string;
  hiraganaSymbol: string;
  vehicleNumber: string;
  notes?: string;
}

// 顧客車両の検索フィルター
export interface CustomerVehicleFilter {
  ctNo?: string;
  customerName?: string;
  vehicleType?: string;
  vehicleColor?: string;
  region?: string;
  status?: 'active' | 'inactive' | 'suspended' | 'all';
}
