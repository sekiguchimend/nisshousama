// ホステス関連のサンプルデータ

import { 
  HostessLedger, 
  HostessRanking, 
  HostessManager, 
  HostessScheduleData,
  TimeBasedHostessAttendance,
  WeeklyHostessAttendance
} from '@/types/hostess';

// ホステス台帳サンプルデータ
export const sampleHostessLedger: HostessLedger[] = [
  {
    id: "hostess001",
    hostessNumber: "H-001",
    name: "山田美咲",
    nameKana: "ヤマダミサキ",
    stageName: "美咲",
    birthDate: "1995-03-15",
    age: 29,
    phoneNumber: "090-1234-5678",
    emergencyContact: {
      name: "山田太郎",
      phoneNumber: "03-1234-5678",
      relationship: "父"
    },
    address: {
      zipCode: "150-0001",
      prefecture: "東京都",
      city: "渋谷区",
      street: "神宮前1-2-3",
      building: "渋谷マンション301"
    },
    registrationDate: "2024-01-15",
    lastWorkDate: "2025-01-26",
    status: "active",
    category: "VIP",
    totalWorkDays: 280,
    totalEarnings: 5600000,
    averageRating: 4.8,
    specialNotes: "指名客多数、英語対応可能",
    ngAreas: ["歌舞伎町周辺"],
    preferences: {
      workStartTime: "18:00",
      workEndTime: "02:00",
      preferredAreas: ["銀座", "六本木", "表参道"],
      availableDays: ["月", "火", "水", "木", "金", "土"]
    }
  },
  {
    id: "hostess002",
    hostessNumber: "H-002",
    name: "田中さくら",
    nameKana: "タナカサクラ",
    stageName: "さくら",
    birthDate: "1997-07-20",
    age: 27,
    phoneNumber: "090-2345-6789",
    emergencyContact: {
      name: "田中花子",
      phoneNumber: "03-2345-6789",
      relationship: "母"
    },
    address: {
      zipCode: "106-0032",
      prefecture: "東京都",
      city: "港区",
      street: "六本木3-4-5",
      building: "六本木アパートメント502"
    },
    registrationDate: "2024-03-20",
    lastWorkDate: "2025-01-25",
    status: "active",
    category: "Lady",
    totalWorkDays: 220,
    totalEarnings: 3300000,
    averageRating: 4.5,
    ngAreas: [],
    preferences: {
      workStartTime: "19:30",
      workEndTime: "03:00",
      preferredAreas: ["新宿", "渋谷", "池袋"],
      availableDays: ["水", "木", "金", "土", "日"]
    }
  }
];

// ホステスランキングサンプルデータ
export const sampleHostessRanking: HostessRanking[] = [
  {
    id: "rank001",
    rank: 1,
    hostessId: "hostess001",
    hostessName: "山田美咲",
    stageName: "美咲",
    category: "VIP",
    monthlyEarnings: 450000,
    totalCustomers: 85,
    averageServiceTime: 180,
    customerSatisfactionScore: 4.8,
    workDaysInMonth: 24,
    earningsGrowthRate: 15.5,
    specialAchievements: ["月間売上No.1", "顧客満足度最高評価"],
    previousRank: 1,
    rankChange: "same"
  },
  {
    id: "rank002",
    rank: 2,
    hostessId: "hostess002",
    hostessName: "田中さくら",
    stageName: "さくら",
    category: "Lady",
    monthlyEarnings: 380000,
    totalCustomers: 72,
    averageServiceTime: 165,
    customerSatisfactionScore: 4.5,
    workDaysInMonth: 22,
    earningsGrowthRate: 8.2,
    specialAchievements: ["新規顧客獲得賞"],
    previousRank: 3,
    rankChange: "up"
  },
  {
    id: "rank003",
    rank: 3,
    hostessId: "hostess003",
    hostessName: "佐藤まゆ",
    stageName: "まゆ",
    category: "Girls",
    monthlyEarnings: 320000,
    totalCustomers: 68,
    averageServiceTime: 150,
    customerSatisfactionScore: 4.3,
    workDaysInMonth: 20,
    earningsGrowthRate: -2.1,
    specialAchievements: [],
    previousRank: 2,
    rankChange: "down"
  }
];

// ホステスマネージャーサンプルデータ
export const sampleHostessManagers: HostessManager[] = [
  {
    id: "manager001",
    managerNumber: "M-001",
    name: "鈴木太郎",
    nameKana: "スズキタロウ",
    phoneNumber: "090-9876-5432",
    email: "suzuki.manager@company.com",
    hireDate: "2023-04-01",
    position: "manager",
    managedHostesses: ["hostess001", "hostess002", "hostess003", "hostess004", "hostess005"],
    totalManagedHostesses: 5,
    monthlyPerformance: {
      totalRevenue: 1850000,
      averageHostessEarnings: 370000,
      newRecruits: 2,
      retentionRate: 95.0
    },
    status: "active",
    notes: "経験豊富、ホステス育成に定評あり"
  },
  {
    id: "manager002",
    managerNumber: "M-002",
    name: "高橋花子",
    nameKana: "タカハシハナコ",
    phoneNumber: "090-5432-1098",
    email: "takahashi.manager@company.com",
    hireDate: "2023-08-15",
    position: "sub_manager",
    managedHostesses: ["hostess006", "hostess007", "hostess008"],
    totalManagedHostesses: 3,
    monthlyPerformance: {
      totalRevenue: 980000,
      averageHostessEarnings: 326666,
      newRecruits: 1,
      retentionRate: 88.5
    },
    status: "active",
    notes: "新人育成担当"
  }
];

// ホステススケジュールサンプルデータ（更新版）
export const sampleHostessScheduleData: HostessScheduleData[] = [
  {
    id: "sched001",
    name: "美咲",
    category: "VIP",
    schedules: {
      "2025-01-27": [
        {
          startTime: "19:00",
          endTime: "02:00",
          status: "confirmed",
          workType: "normal",
          location: "銀座エリア",
          managerName: "鈴木太郎"
        }
      ],
      "2025-01-28": [
        {
          startTime: "19:00",
          endTime: "02:00",
          status: "confirmed",
          workType: "normal",
          location: "六本木エリア",
          managerName: "鈴木太郎"
        }
      ]
    },
    weeklyStats: {
      totalHours: 35,
      totalDays: 5,
      earnings: 180000
    }
  },
  {
    id: "sched002",
    name: "さくら",
    category: "Lady",
    schedules: {
      "2025-01-27": [
        {
          startTime: "19:00",
          endTime: "02:00",
          status: "confirmed",
          workType: "normal",
          location: "新宿エリア",
          managerName: "高橋花子"
        }
      ]
    },
    weeklyStats: {
      totalHours: 28,
      totalDays: 4,
      earnings: 140000
    }
  }
];

// 時間別ホステス出勤サンプルデータ
export const sampleTimeBasedAttendance: TimeBasedHostessAttendance[] = [
  {
    id: "time001",
    date: "2025-01-27",
    timeSlot: "18:00-19:00",
    hostesses: [
      {
        hostessId: "hostess001",
        hostessName: "美咲",
        category: "VIP",
        status: "waiting",
        location: "待機室"
      }
    ],
    totalCount: 1,
    workingCount: 0,
    waitingCount: 1,
    breakCount: 0
  },
  {
    id: "time002",
    date: "2025-01-27",
    timeSlot: "19:00-20:00",
    hostesses: [
      {
        hostessId: "hostess001",
        hostessName: "美咲",
        category: "VIP",
        status: "working",
        location: "銀座",
        customerId: "cust001",
        customerName: "田中様",
        serviceStartTime: "19:15",
        estimatedEndTime: "21:15"
      },
      {
        hostessId: "hostess002",
        hostessName: "さくら",
        category: "Lady",
        status: "waiting",
        location: "待機室"
      }
    ],
    totalCount: 2,
    workingCount: 1,
    waitingCount: 1,
    breakCount: 0
  }
];

// 週間ホステス出勤サンプルデータ
export const sampleWeeklyAttendance: WeeklyHostessAttendance[] = [
  {
    id: "weekly001",
    weekStartDate: "2025-01-20",
    weekEndDate: "2025-01-26",
    hostessId: "hostess001",
    hostessName: "美咲",
    category: "VIP",
    dailyAttendance: {
      "2025-01-20": {
        startTime: "19:00",
        endTime: "02:00",
        workHours: 7,
        status: "present",
        earnings: 35000,
        customerCount: 3
      },
      "2025-01-21": {
        startTime: "19:00",
        endTime: "02:30",
        workHours: 7.5,
        status: "present",
        earnings: 42000,
        customerCount: 4
      },
      "2025-01-22": {
        workHours: 0,
        status: "absent",
        earnings: 0,
        customerCount: 0,
        notes: "体調不良のため欠勤"
      },
      "2025-01-23": {
        startTime: "19:30",
        endTime: "02:00",
        workHours: 6.5,
        status: "late",
        earnings: 28000,
        customerCount: 2,
        notes: "30分遅刻"
      },
      "2025-01-24": {
        startTime: "19:00",
        endTime: "01:30",
        workHours: 6.5,
        status: "early_leave",
        earnings: 25000,
        customerCount: 2,
        notes: "体調不良のため早退"
      },
      "2025-01-25": {
        startTime: "19:00",
        endTime: "02:00",
        workHours: 7,
        status: "present",
        earnings: 38000,
        customerCount: 3
      },
      "2025-01-26": {
        startTime: "19:00",
        endTime: "02:00",
        workHours: 7,
        status: "present",
        earnings: 40000,
        customerCount: 4
      }
    },
    weeklyTotals: {
      totalHours: 41.5,
      totalDays: 6,
      totalEarnings: 208000,
      totalCustomers: 18,
      averageHoursPerDay: 6.9
    },
    attendanceRate: 85.7
  }
];

