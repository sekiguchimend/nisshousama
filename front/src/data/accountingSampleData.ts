// 会計関連のサンプルデータ

import { AccountingSummary, IncomeSlip, ExpenseSlip, SalesSlip } from '@/types/accounting';

// 会計集計サンプルデータ
export const sampleAccountingSummary: AccountingSummary[] = [
  {
    id: "acc001",
    date: "2025-01-27",
    totalRevenue: 1250000,
    totalExpense: 850000,
    profit: 400000,
    taxAmount: 125000,
    cashFlow: 275000,
    paymentMethods: {
      cash: 500000,
      card: 600000,
      transfer: 150000,
      other: 0
    },
    categories: {
      hostessPayment: 400000,
      driverPayment: 250000,
      fuelCost: 80000,
      maintenance: 60000,
      insurance: 40000,
      other: 20000
    }
  },
  {
    id: "acc002",
    date: "2025-01-26",
    totalRevenue: 980000,
    totalExpense: 720000,
    profit: 260000,
    taxAmount: 98000,
    cashFlow: 162000,
    paymentMethods: {
      cash: 350000,
      card: 480000,
      transfer: 150000,
      other: 0
    },
    categories: {
      hostessPayment: 320000,
      driverPayment: 200000,
      fuelCost: 75000,
      maintenance: 45000,
      insurance: 40000,
      other: 40000
    }
  }
];

// 収支伝票サンプルデータ
export const sampleIncomeSlips: IncomeSlip[] = [
  {
    id: "inc001",
    date: "2025-01-27",
    type: "income",
    category: "サービス料金",
    description: "ホステス送迎サービス",
    amount: 15000,
    paymentMethod: "cash",
    receiptNumber: "R-20250127-001",
    customerName: "田中様",
    approved: true,
    approver: "佐藤マネージャー",
    notes: "深夜料金込み"
  },
  {
    id: "inc002",
    date: "2025-01-27",
    type: "income",
    category: "サービス料金",
    description: "空港送迎サービス",
    amount: 25000,
    paymentMethod: "card",
    receiptNumber: "R-20250127-002",
    customerName: "鈴木様",
    driverName: "山田",
    approved: true,
    approver: "佐藤マネージャー"
  }
];

// 支出伝票サンプルデータ
export const sampleExpenseSlips: ExpenseSlip[] = [
  {
    id: "exp001",
    date: "2025-01-27",
    category: "fuel",
    description: "ガソリン代",
    amount: 8000,
    paymentMethod: "cash",
    receiptNumber: "E-20250127-001",
    vendorName: "エネオス銀座店",
    driverName: "山田",
    vehicleNumber: "品川500あ1234",
    approved: true,
    approver: "佐藤マネージャー"
  },
  {
    id: "exp002",
    date: "2025-01-27",
    category: "maintenance",
    description: "車両点検・オイル交換",
    amount: 12000,
    paymentMethod: "card",
    receiptNumber: "E-20250127-002",
    vendorName: "オートバックス",
    vehicleNumber: "品川500あ1234",
    approved: false,
    notes: "定期点検"
  }
];

// 売上伝票サンプルデータ
export const sampleSalesSlips: SalesSlip[] = [
  {
    id: "sal001",
    date: "2025-01-27",
    customerName: "田中様",
    hostessName: "美咲",
    driverName: "山田",
    serviceType: "escort",
    duration: 180,
    distance: 15.5,
    baseAmount: 8000,
    timeCharge: 4500,
    distanceCharge: 1550,
    tollFee: 800,
    otherFees: 150,
    totalAmount: 15000,
    paymentMethod: "cash",
    receiptIssued: true,
    notes: "深夜料金適用"
  },
  {
    id: "sal002",
    date: "2025-01-27",
    customerName: "鈴木様",
    driverName: "佐藤",
    serviceType: "pickup",
    duration: 120,
    distance: 35.2,
    baseAmount: 12000,
    timeCharge: 6000,
    distanceCharge: 3520,
    tollFee: 2480,
    otherFees: 1000,
    totalAmount: 25000,
    paymentMethod: "card",
    receiptIssued: true,
    notes: "空港送迎"
  }
];

