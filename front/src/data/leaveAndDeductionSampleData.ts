import { LeaveAndDeductionData } from '@/types/leave-and-deduction';

export const leaveAndDeductionSampleData: LeaveAndDeductionData[] = [
  {
    id: '1',
    name: '山田太郎',
    type: 'paid_leave',
    amount: '1日',
    reason: '体調不良'
  },
  {
    id: '2',
    name: '佐藤花子',
    type: 'salary_deduction',
    amount: '5,000円',
    reason: '遅刻'
  },
  {
    id: '3',
    name: '田中一郎',
    type: 'paid_leave',
    amount: '0.5日',
    reason: '私用'
  },
  {
    id: '4',
    name: '鈴木美咲',
    type: 'salary_deduction',
    amount: '3,000円',
    reason: '早退'
  }
];

// 最大表示行数
export const LEAVE_DEDUCTION_MAX_ROWS = 4;
