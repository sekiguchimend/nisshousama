// 売上レポートデータの型定義
export interface SalesReportData {
  storeName: string;
  cashSales: number;
  cardSales: number;
  cardSalesCount: number;
  totalStoreSales: number;
  cardBilling: number;
  cardSurcharge: number;
  otherSales: string | number;
  cashRevenue: number;
  receiptsIssued: number;
  discountTickets: number;
  uncollectedReceivables: string | number;
  deposits: string | number;
  withdrawals: number;
  reportedAmount: number;
  payrollDaily: number;
  dispatchDaily: number;
  nominationDaily: number;
  hfNominationDaily: number;
  oldCashRevenue: number;
  oldReportedAmount: number;
}

// SalesReportコンポーネントのProps型定義
export interface SalesReportProps {
  data: SalesReportData;
}
