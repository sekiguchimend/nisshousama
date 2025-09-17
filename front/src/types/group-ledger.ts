// グループ台帳関連の型定義

// 所属店舗情報
export interface AffiliatedStore {
  spid: string; // SPID
  storeName: string; // 店名
}

// グループ台帳
export interface GroupMaster {
  id: string;
  no: number; // No
  groupName: string; // グループ名
  memberNumberIssuance: string; // 会員番号発番
  initialLetter: string; // 頭文字
  useCountDiscount: boolean; // 回数割引使用
  discountCount?: number; // 割引回数（〜回毎に）
  discountAmount?: number; // 割引金額
  miscellaneousExpenseRatio: number; // 雑費割合（%）
  affiliatedStores: AffiliatedStore[]; // 所属店舗リスト
  createdAt: string;
  updatedAt: string;
}

// グループ台帳タブ定義（将来の拡張用）
export type GroupMasterTab = 
  | 'basic'
  | 'stores'
  | 'settings';

// タブ情報
export interface GroupTabInfo {
  id: GroupMasterTab;
  label: string;
  icon?: string;
}

// タブ表示ラベル
export const groupMasterTabLabels: Record<GroupMasterTab, string> = {
  'basic': '基本情報',
  'stores': '所属店舗',
  'settings': '設定'
};

// 全タブ情報
export const groupMasterTabs: GroupTabInfo[] = [
  { id: 'basic', label: '基本情報' },
  { id: 'stores', label: '所属店舗' },
  { id: 'settings', label: '設定' }
];
