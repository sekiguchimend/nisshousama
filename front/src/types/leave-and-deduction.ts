export interface LeaveAndDeductionData {
  id: string;
  name: string; // 名前
  type: 'paid_leave' | 'salary_deduction'; // 有給使用者または給料引き者
  amount?: string; // 金額や日数（オプション）
  reason?: string; // 理由（オプション）
}

export type LeaveDeductionType = 'paid_leave' | 'salary_deduction';

export const LEAVE_DEDUCTION_TYPE_LABELS: Record<LeaveDeductionType, string> = {
  paid_leave: '有給',
  salary_deduction: '給料引き'
};

export const LEAVE_DEDUCTION_TYPE_VARIANTS: Record<LeaveDeductionType, 'default' | 'destructive'> = {
  paid_leave: 'default',
  salary_deduction: 'destructive'
};
