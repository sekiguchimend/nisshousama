// 入出金データの型定義
export interface MoneyInoutData {
    title: string;
    amount: number;
}

// Props型定義
export interface MoneyInoutProps {
    data: MoneyInoutData;
}