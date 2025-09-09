// 会計関連の型定義

// 会計集計データ
export interface AccountingSummary {
  id: string;
  date: string;
  totalRevenue: number; // 総売上
  totalExpense: number; // 総支出
  profit: number; // 利益
  taxAmount: number; // 税額
  cashFlow: number; // キャッシュフロー
  paymentMethods: {
    cash: number; // 現金
    card: number; // カード
    transfer: number; // 振込
    other: number; // その他
  };
  categories: {
    hostessPayment: number; // ホステス支払い
    driverPayment: number; // ドライバー支払い
    fuelCost: number; // 燃料費
    maintenance: number; // 車両維持費
    insurance: number; // 保険料
    other: number; // その他
  };
}

// 収支伝票データ
export interface IncomeSlip {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'other';
  receiptNumber?: string;
  customerName?: string;
  driverName?: string;
  approved: boolean;
  approver?: string;
  notes?: string;
}

// 支出伝票データ
export interface ExpenseSlip {
  id: string;
  date: string;
  category: 'fuel' | 'maintenance' | 'insurance' | 'salary' | 'toll' | 'other';
  description: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'other';
  receiptNumber?: string;
  vendorName: string;
  driverName?: string;
  vehicleNumber?: string;
  approved: boolean;
  approver?: string;
  notes?: string;
}

// 売上伝票データ
export interface SalesSlip {
  id: string;
  date: string;
  customerName: string;
  hostessName?: string;
  driverName: string;
  serviceType: 'pickup' | 'delivery' | 'escort' | 'waiting' | 'other';
  duration: number; // 時間（分）
  distance?: number; // 距離（km）
  baseAmount: number; // 基本料金
  timeCharge: number; // 時間料金
  distanceCharge: number; // 距離料金
  tollFee: number; // 通行料
  otherFees: number; // その他料金
  totalAmount: number; // 総額
  paymentMethod: 'cash' | 'card' | 'transfer' | 'other';
  receiptIssued: boolean;
  notes?: string;
}

