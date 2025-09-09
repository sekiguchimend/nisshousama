// 従業員関連の型定義

// 従業員給与集計データ
export interface EmployeeSalary {
  id: string;
  employeeId: string;
  employeeNumber: string; // 従業員番号
  name: string; // 名前
  nameKana: string; // 名前（カナ）
  position: 'manager' | 'driver' | 'operator' | 'admin' | 'part_time'; // 職種
  department: string; // 部署
  salaryPeriod: {
    year: number;
    month: number;
  }; // 給与対象期間
  baseSalary: number; // 基本給
  overtime: {
    hours: number; // 残業時間
    amount: number; // 残業代
  }; // 残業
  allowances: {
    transportation: number; // 交通費
    meal: number; // 食事手当
    night: number; // 深夜手当
    holiday: number; // 休日手当
    other: number; // その他手当
  }; // 各種手当
  bonuses: number; // 賞与
  grossSalary: number; // 総支給額
  deductions: {
    healthInsurance: number; // 健康保険
    pensionInsurance: number; // 厚生年金
    employmentInsurance: number; // 雇用保険
    incomeTax: number; // 所得税
    residentTax: number; // 住民税
    other: number; // その他控除
  }; // 控除
  netSalary: number; // 手取り額
  workDays: number; // 勤務日数
  workHours: number; // 勤務時間
  notes?: string; // 備考
}

// パートタイム給与データ
export interface PartTimeSalary {
  id: string;
  employeeId: string;
  employeeNumber: string;
  name: string;
  nameKana: string;
  position: string; // 職種
  salaryPeriod: {
    year: number;
    month: number;
  };
  hourlyRate: number; // 時給
  regularHours: number; // 通常勤務時間
  overtimeHours: number; // 残業時間
  nightHours: number; // 深夜勤務時間
  holidayHours: number; // 休日勤務時間
  regularPay: number; // 通常勤務給
  overtimePay: number; // 残業代
  nightPay: number; // 深夜手当
  holidayPay: number; // 休日手当
  transportationAllowance: number; // 交通費
  grossSalary: number; // 総支給額
  deductions: {
    incomeTax: number;
    other: number;
  }; // 控除
  netSalary: number; // 手取り額
  workDays: number; // 勤務日数
  totalHours: number; // 総勤務時間
}

// 従業員スケジュールデータ
export interface EmployeeSchedule {
  id: string;
  employeeId: string;
  employeeNumber: string;
  name: string;
  position: string;
  department: string;
  scheduleDate: string; // スケジュール日
  workType: 'regular' | 'overtime' | 'holiday' | 'night' | 'off'; // 勤務タイプ
  startTime?: string; // 開始時間
  endTime?: string; // 終了時間
  breakTime: number; // 休憩時間（分）
  workLocation: string; // 勤務場所
  assignedTasks: string[]; // 担当業務
  notes?: string; // 備考
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'; // ステータス
  actualStartTime?: string; // 実際の開始時間
  actualEndTime?: string; // 実際の終了時間
  actualBreakTime?: number; // 実際の休憩時間
}

// スタッフ台帳データ
export interface StaffLedger {
  id: string;
  employeeNumber: string;
  personalInfo: {
    name: string;
    nameKana: string;
    nickname?: string;
    birthDate: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    phoneNumber: string;
    email?: string;
    address: {
      zipCode: string;
      prefecture: string;
      city: string;
      street: string;
      building?: string;
    };
    emergencyContact: {
      name: string;
      phoneNumber: string;
      relationship: string;
    };
  }; // 個人情報
  employmentInfo: {
    hireDate: string;
    position: string;
    department: string;
    employmentType: 'full_time' | 'part_time' | 'contract' | 'temporary';
    workLocation: string;
    supervisor: string;
    salaryType: 'monthly' | 'hourly' | 'commission';
    baseSalary: number;
    hourlyRate?: number;
  }; // 雇用情報
  qualifications: {
    drivingLicense?: {
      type: string;
      expiryDate: string;
    };
    certifications: string[];
    languages: string[];
    skills: string[];
  }; // 資格・スキル
  workHistory: {
    totalWorkDays: number;
    totalWorkHours: number;
    averageRating: number;
    disciplinaryActions: number;
    commendations: number;
  }; // 勤務履歴
  status: 'active' | 'inactive' | 'on_leave' | 'terminated'; // ステータス
  notes?: string; // 備考
}

