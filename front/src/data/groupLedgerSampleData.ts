// グループ台帳のサンプルデータ

import { GroupMaster, AffiliatedStore } from '@/types/group-ledger';

// サンプルグループデータ
export const groupMasterSampleData: GroupMaster[] = [
  {
    id: '1',
    no: 1,
    groupName: 'プレミアムグループ',
    memberNumberIssuance: 'PG000001',
    initialLetter: 'PG',
    useCountDiscount: true,
    discountCount: 10,
    discountAmount: 2000,
    miscellaneousExpenseRatio: 15,
    affiliatedStores: [
      { spid: 'SP001', storeName: '本店' },
      { spid: 'SP002', storeName: '2F店舗' },
      { spid: 'SP003', storeName: 'VIPルーム' }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-09-16T10:00:00Z'
  },
  {
    id: '2',
    no: 2,
    groupName: 'スタンダードグループ',
    memberNumberIssuance: 'SG000001',
    initialLetter: 'SG',
    useCountDiscount: true,
    discountCount: 5,
    discountAmount: 1000,
    miscellaneousExpenseRatio: 10,
    affiliatedStores: [
      { spid: 'SP001', storeName: '本店' },
      { spid: 'SP004', storeName: '支店' }
    ],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-09-15T15:30:00Z'
  },
  {
    id: '3',
    no: 3,
    groupName: 'エリート会員グループ',
    memberNumberIssuance: 'EG000001',
    initialLetter: 'EG',
    useCountDiscount: false,
    discountCount: undefined,
    discountAmount: undefined,
    miscellaneousExpenseRatio: 20,
    affiliatedStores: [
      { spid: 'SP001', storeName: '本店' },
      { spid: 'SP002', storeName: '2F店舗' },
      { spid: 'SP003', storeName: 'VIPルーム' },
      { spid: 'SP005', storeName: '新宿店' }
    ],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-09-16T09:15:00Z'
  },
  {
    id: '4',
    no: 4,
    groupName: 'ビジネスグループ',
    memberNumberIssuance: 'BG000001',
    initialLetter: 'BG',
    useCountDiscount: true,
    discountCount: 20,
    discountAmount: 5000,
    miscellaneousExpenseRatio: 12,
    affiliatedStores: [
      { spid: 'SP006', storeName: '渋谷店' },
      { spid: 'SP007', storeName: '池袋店' }
    ],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-09-14T14:20:00Z'
  },
  {
    id: '5',
    no: 5,
    groupName: 'VIPグループ',
    memberNumberIssuance: 'VG000001',
    initialLetter: 'VG',
    useCountDiscount: true,
    discountCount: 3,
    discountAmount: 3000,
    miscellaneousExpenseRatio: 25,
    affiliatedStores: [
      { spid: 'SP003', storeName: 'VIPルーム' }
    ],
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-09-16T11:45:00Z'
  }
];

// 全所属店舗リスト（重複なし）
export const allAffiliatedStores: AffiliatedStore[] = [
  { spid: 'SP001', storeName: '本店' },
  { spid: 'SP002', storeName: '2F店舗' },
  { spid: 'SP003', storeName: 'VIPルーム' },
  { spid: 'SP004', storeName: '支店' },
  { spid: 'SP005', storeName: '新宿店' },
  { spid: 'SP006', storeName: '渋谷店' },
  { spid: 'SP007', storeName: '池袋店' },
  { spid: 'SP008', storeName: '横浜店' },
  { spid: 'SP009', storeName: '大阪店' },
  { spid: 'SP010', storeName: '名古屋店' }
];
