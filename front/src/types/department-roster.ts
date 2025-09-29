export interface DepartmentData {
  id: string;
  name: string;
  capacity: number; // 定員数
}

export interface RosterPeriod {
  id: string;
  title: string;
  departments: DepartmentData[];
}

// 前半の部署データ
export const firstHalfDepartments: DepartmentData[] = [
  { id: 'dispatch1', name: '配車', capacity: 3 },
  { id: 'kyoto_front1', name: '京都フロント', capacity: 3 },
  { id: 'married_front1', name: '人妻フロント', capacity: 3 },
  { id: 'first_front1', name: 'FIRSTフロント', capacity: 3 },
  { id: 'minamiic_front1', name: '南ICフロント', capacity: 4 }
];

// 後半の部署データ
export const secondHalfDepartments: DepartmentData[] = [
  { id: 'accounting2', name: '会計', capacity: 1 },
  { id: 'dispatch2', name: '配車', capacity: 3 },
  { id: 'kyoto_front2', name: '京都フロント', capacity: 3 },
  { id: 'married_front2', name: '人妻フロント', capacity: 3 },
  { id: 'first_front2', name: 'FIRSTフロント', capacity: 3 },
  { id: 'minamiic_front2', name: '南ICフロント', capacity: 4 },
  { id: 'minamiic_accounting2', name: '南IC会計', capacity: 1 }
];

export const rosterPeriods: RosterPeriod[] = [
  {
    id: 'first_half',
    title: '前半',
    departments: firstHalfDepartments
  },
  {
    id: 'second_half',
    title: '後半',
    departments: secondHalfDepartments
  }
];
