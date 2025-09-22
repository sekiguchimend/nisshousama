// クレジットカードデータの型定義
export interface CreditCardData {
  id: string;
  store: string; // 店舗
  course: string; // コース
  hostessName: string; // ホステス名
  extensionFee: number; // 延長料金
  billAmount: number; // 請求金額
  storeShare: number; // 店舗取分
  hostessShare: number; // ホステス取分
  hostessDeposit: number; // ホステス預り金
  outDriverName: string; // OUTドライバ名
}

// Props型定義
export interface CreditCardProps {
  data: CreditCardData;
}
