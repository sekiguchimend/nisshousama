// 店舗台帳のサンプルデータ

import {
  StoreBasicInfo,
  GMDivision,
  CoursePrice,
  CourseFee,
  SpecialPrice,
  StaffComposition,
  ClassPrice,
  BonusCriteria,
  Nomination,
  Attendance,
  Communication,
  SalesData,
  OtherPoints,
  MinusPoints,
  StoreCustomerPoints,
  Discount,
  DisplaySettings,
  Media,
  StoreOptions
} from '@/types/store-ledger';

// 店舗基本情報サンプルデータ
export const storeBasicInfoSampleData: StoreBasicInfo[] = [
  {
    id: '1',
    storeName: '本店',
    storeCode: 'MAIN001',
    address: '東京都港区銀座1-1-1',
    phoneNumber: '03-1234-5678',
    email: 'main@example.com',
    businessHours: {
      open: '18:00',
      close: '26:00'
    },
    capacity: 50,
    isActive: true,
    notes: 'メイン店舗'
  },
  {
    id: '2',
    storeName: '2F店舗',
    storeCode: 'FL2001',
    address: '東京都港区銀座1-1-1 2F',
    phoneNumber: '03-1234-5679',
    businessHours: {
      open: '19:00',
      close: '25:00'
    },
    capacity: 30,
    isActive: true
  },
  {
    id: '3',
    storeName: 'VIPルーム',
    storeCode: 'VIP001',
    address: '東京都港区銀座1-1-1 3F',
    phoneNumber: '03-1234-5680',
    businessHours: {
      open: '20:00',
      close: '24:00'
    },
    capacity: 10,
    isActive: true
  }
];

// GM区分サンプルデータ
export const gmDivisionSampleData: GMDivision[] = [
  {
    id: '1',
    storeId: '1',
    gmDivisionName: 'ガールズ',
    hostessType: 'A',
    webName: 'GIRL',
    hpNumber: 1,
    sortOrder: 1
  },
  {
    id: '2',
    storeId: '1',
    gmDivisionName: 'レディ',
    hostessType: 'B',
    webName: 'LADY',
    hpNumber: 2,
    sortOrder: 2
  },
  {
    id: '3',
    storeId: '2',
    gmDivisionName: 'ガールズ',
    hostessType: 'A',
    webName: 'GIRL',
    hpNumber: 0,
    sortOrder: 1
  },
  {
    id: '4',
    storeId: '2',
    gmDivisionName: 'レディ',
    hostessType: 'B',
    webName: 'LADY',
    hpNumber: 3,
    sortOrder: 2
  },
  {
    id: '5',
    storeId: '3',
    gmDivisionName: 'ガールズ',
    hostessType: 'A',
    webName: 'GIRL',
    hpNumber: 4,
    sortOrder: 1
  },
  {
    id: '6',
    storeId: '3',
    gmDivisionName: 'レディ',
    hostessType: 'B',
    webName: 'LADY',
    hpNumber: 1,
    sortOrder: 2
  }
];

// コース料金サンプルデータ
export const coursePriceSampleData: CoursePrice[] = [
  {
    id: '1',
    storeId: '1',
    courseName: 'ショートコース',
    duration: 60,
    price: 8000,
    taxIncluded: true,
    isActive: true,
    description: '60分の基本コース'
  },
  {
    id: '2',
    storeId: '1',
    courseName: 'スタンダードコース',
    duration: 90,
    price: 12000,
    taxIncluded: true,
    isActive: true,
    description: '90分のスタンダードコース'
  },
  {
    id: '3',
    storeId: '1',
    courseName: 'ロングコース',
    duration: 120,
    price: 16000,
    taxIncluded: true,
    isActive: true,
    description: '120分のロングコース'
  }
];

// コース料金（新）サンプルデータ
export const courseFeeSampleData: CourseFee[] = [
  // A種別（左側）
  {
    id: 'cf1',
    storeId: '1',
    courseName: 'スタンダード60分',
    gmDivision: 'ガールズ',
    courseType: 'Standard',
    type: 'A',
    duration: 60,
    price: 15000,
    hostessShare: {
      free: {
        percentage: 40,
        amount: 6000
      },
      panel: {
        percentage: 45,
        amount: 6750
      },
      nomination: {
        percentage: 50,
        amount: 7500
      }
    },
    storeShare: {
      free: {
        amount: 9000 // 15000 - 6000 (フリーの場合)
      },
      panel: {
        amount: 8250 // 15000 - 6750 (パネルの場合)
      },
      nomination: {
        amount: 7500 // 15000 - 7500 (指名の場合)
      }
    },
    isActive: true
  },
  {
    id: 'cf2',
    storeId: '1',
    courseName: 'ゴールド90分',
    gmDivision: 'ガールズ',
    courseType: 'Gold',
    type: 'A',
    duration: 90,
    price: 22000,
    hostessShare: {
      free: {
        percentage: 42,
        amount: 9240
      },
      panel: {
        percentage: 47,
        amount: 10340
      },
      nomination: {
        percentage: 52,
        amount: 11440
      }
    },
    storeShare: {
      free: {
        amount: 12760 // 22000 - 9240 (フリーの場合)
      },
      panel: {
        amount: 11660 // 22000 - 10340 (パネルの場合)
      },
      nomination: {
        amount: 10560 // 22000 - 11440 (指名の場合)
      }
    },
    isActive: true
  },
  {
    id: 'cf3',
    storeId: '1',
    courseName: 'プレミアム120分',
    gmDivision: 'ガールズ',
    courseType: 'Premium',
    type: 'A',
    duration: 120,
    price: 35000,
    hostessShare: {
      free: {
        percentage: 45,
        amount: 15750
      },
      panel: {
        percentage: 50,
        amount: 17500
      },
      nomination: {
        percentage: 55,
        amount: 19250
      }
    },
    storeShare: {
      free: {
        amount: 19250 // 35000 - 15750 (フリーの場合)
      },
      panel: {
        amount: 17500 // 35000 - 17500 (パネルの場合)
      },
      nomination: {
        amount: 15750 // 35000 - 19250 (指名の場合)
      }
    },
    isActive: true
  },
  // B種別（右側）
  {
    id: 'cf4',
    storeId: '1',
    courseName: 'スタンダード60分',
    gmDivision: 'レディ',
    courseType: 'Standard',
    type: 'B',
    duration: 60,
    price: 18000,
    hostessShare: {
      free: {
        percentage: 42,
        amount: 7560
      },
      panel: {
        percentage: 47,
        amount: 8460
      },
      nomination: {
        percentage: 52,
        amount: 9360
      }
    },
    storeShare: {
      free: {
        amount: 10440 // 18000 - 7560 (フリーの場合)
      },
      panel: {
        amount: 9540 // 18000 - 8460 (パネルの場合)
      },
      nomination: {
        amount: 8640 // 18000 - 9360 (指名の場合)
      }
    },
    isActive: true
  },
  {
    id: 'cf5',
    storeId: '1',
    courseName: 'ゴールド90分',
    gmDivision: 'レディ',
    courseType: 'Gold',
    type: 'B',
    duration: 90,
    price: 26000,
    hostessShare: {
      free: {
        percentage: 44,
        amount: 11440
      },
      panel: {
        percentage: 49,
        amount: 12740
      },
      nomination: {
        percentage: 54,
        amount: 14040
      }
    },
    storeShare: {
      free: {
        amount: 14560 // 26000 - 11440 (フリーの場合)
      },
      panel: {
        amount: 13260 // 26000 - 12740 (パネルの場合)
      },
      nomination: {
        amount: 11960 // 26000 - 14040 (指名の場合)
      }
    },
    isActive: true
  },
  {
    id: 'cf6',
    storeId: '1',
    courseName: 'プレミアム120分',
    gmDivision: 'レディ',
    courseType: 'Premium',
    type: 'B',
    duration: 120,
    price: 40000,
    hostessShare: {
      free: {
        percentage: 47,
        amount: 18800
      },
      panel: {
        percentage: 52,
        amount: 20800
      },
      nomination: {
        percentage: 57,
        amount: 22800
      }
    },
    storeShare: {
      free: {
        amount: 21200 // 40000 - 18800 (フリーの場合)
      },
      panel: {
        amount: 19200 // 40000 - 20800 (パネルの場合)
      },
      nomination: {
        amount: 17200 // 40000 - 22800 (指名の場合)
      }
    },
    isActive: true
  },
  // 店舗2のサンプル
  {
    id: 'cf7',
    storeId: '2',
    courseName: 'スタンダード60分',
    gmDivision: 'ガールズ',
    courseType: 'Standard',
    type: 'A',
    duration: 60,
    price: 14000,
    hostessShare: {
      free: {
        percentage: 38,
        amount: 5320
      },
      panel: {
        percentage: 43,
        amount: 6020
      },
      nomination: {
        percentage: 48,
        amount: 6720
      }
    },
    storeShare: {
      free: {
        amount: 8680 // 14000 - 5320 (フリーの場合)
      },
      panel: {
        amount: 7980 // 14000 - 6020 (パネルの場合)
      },
      nomination: {
        amount: 7280 // 14000 - 6720 (指名の場合)
      }
    },
    isActive: true
  },
  {
    id: 'cf8',
    storeId: '2',
    courseName: 'ゴールド90分',
    gmDivision: 'レディ',
    courseType: 'Gold',
    type: 'B',
    duration: 90,
    price: 24000,
    hostessShare: {
      free: {
        percentage: 42,
        amount: 10080
      },
      panel: {
        percentage: 47,
        amount: 11280
      },
      nomination: {
        percentage: 52,
        amount: 12480
      }
    },
    storeShare: {
      free: {
        amount: 13920 // 24000 - 10080 (フリーの場合)
      },
      panel: {
        amount: 12720 // 24000 - 11280 (パネルの場合)
      },
      nomination: {
        amount: 11520 // 24000 - 12480 (指名の場合)
      }
    },
    isActive: true
  }
];

// 特別料金サンプルデータ
export const specialPriceSampleData: SpecialPrice[] = [
  {
    id: '1',
    storeId: '1',
    eventName: 'クリスマス特別料金',
    eventType: 'holiday',
    startDate: '2024-12-24',
    endDate: '2024-12-25',
    priceModifier: 150, // 150%
    isActive: true,
    description: 'クリスマス期間の特別料金'
  },
  {
    id: '2',
    storeId: '1',
    eventName: '年末年始料金',
    eventType: 'season',
    startDate: '2024-12-29',
    endDate: '2025-01-03',
    priceModifier: 130,
    isActive: true,
    description: '年末年始期間の特別料金'
  }
];

// 人事構成サンプルデータ
export const staffCompositionSampleData: StaffComposition[] = [
  {
    id: '1',
    storeId: '1',
    staffId: 'S001',
    staffName: '山田一郎',
    position: 'マネージャー',
    department: '営業部',
    startDate: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    storeId: '1',
    staffId: 'S002',
    staffName: '伊藤美咲',
    position: 'ホステス',
    department: '接客部',
    startDate: '2024-02-01',
    isActive: true
  },
  {
    id: '3',
    storeId: '1',
    staffId: 'S003',
    staffName: '高橋健太',
    position: 'バーテンダー',
    department: '接客部',
    startDate: '2024-01-15',
    isActive: true
  }
];

// クラス別料金サンプルデータ
export const classPriceSampleData: ClassPrice[] = [
  {
    id: '1',
    storeId: '1',
    className: 'プレミアムクラス',
    classLevel: 1,
    basePrice: 20000,
    hourlyRate: 10000,
    isActive: true,
    requirements: '経験3年以上、指名率30%以上'
  },
  {
    id: '2',
    storeId: '1',
    className: 'スタンダードクラス',
    classLevel: 2,
    basePrice: 15000,
    hourlyRate: 7500,
    isActive: true,
    requirements: '経験1年以上、指名率15%以上'
  },
  {
    id: '3',
    storeId: '1',
    className: 'ベーシッククラス',
    classLevel: 3,
    basePrice: 10000,
    hourlyRate: 5000,
    isActive: true,
    requirements: '新人研修修了'
  }
];

// ボーナス支給基準サンプルデータ
export const bonusCriteriaSampleData: BonusCriteria[] = [
  {
    id: '1',
    storeId: '1',
    criteriaName: '月間売上目標達成',
    criteriaType: 'sales',
    threshold: 500000,
    bonusAmount: 50000,
    bonusPercentage: 10,
    period: 'monthly',
    isActive: true
  },
  {
    id: '2',
    storeId: '1',
    criteriaName: '指名件数ボーナス',
    criteriaType: 'performance',
    threshold: 20,
    bonusAmount: 30000,
    period: 'monthly',
    isActive: true
  },
  {
    id: '3',
    storeId: '1',
    criteriaName: '皆勤賞',
    criteriaType: 'attendance',
    threshold: 100,
    bonusAmount: 20000,
    period: 'monthly',
    isActive: true
  }
];

// 指名サンプルデータ
export const nominationSampleData: Nomination[] = [
  {
    id: '1',
    storeId: '1',
    hostessId: 'H001',
    hostessName: '美咲',
    customerId: 'C001',
    customerName: '田中様',
    nominationDate: '2024-09-15',
    nominationType: 'regular',
    fee: 5000,
    isActive: true
  },
  {
    id: '2',
    storeId: '1',
    hostessId: 'H002',
    hostessName: 'さくら',
    customerId: 'C002',
    customerName: '佐藤様',
    nominationDate: '2024-09-14',
    nominationType: 'special',
    fee: 8000,
    isActive: true
  }
];

// 出勤サンプルデータ
export const attendanceSampleData: Attendance[] = [
  {
    id: '1',
    storeId: '1',
    staffId: 'S001',
    staffName: '山田一郎',
    date: '2024-09-16',
    checkIn: '18:00',
    checkOut: '26:00',
    breakTime: 60,
    attendanceType: 'normal'
  },
  {
    id: '2',
    storeId: '1',
    staffId: 'S002',
    staffName: '伊藤美咲',
    date: '2024-09-16',
    checkIn: '19:30',
    checkOut: '25:30',
    breakTime: 30,
    attendanceType: 'late',
    notes: '電車遅延のため'
  }
];

// 連絡サンプルデータ
export const communicationSampleData: Communication[] = [
  {
    id: '1',
    storeId: '1',
    fromStaffId: 'S001',
    fromStaffName: '山田一郎',
    messageType: 'announcement',
    subject: '営業時間変更のお知らせ',
    content: '来週から営業時間が変更になります。詳細は別途連絡いたします。',
    isRead: false,
    isImportant: true,
    createdAt: '2024-09-16T10:00:00Z'
  },
  {
    id: '2',
    storeId: '1',
    fromStaffId: 'S001',
    fromStaffName: '山田一郎',
    toStaffId: 'S002',
    toStaffName: '伊藤美咲',
    messageType: 'notice',
    subject: 'シフト変更',
    content: '明日のシフトを変更します。確認をお願いします。',
    isRead: true,
    isImportant: false,
    createdAt: '2024-09-15T15:30:00Z',
    readAt: '2024-09-15T16:00:00Z'
  }
];

// 売上データサンプルデータ
export const salesDataSampleData: SalesData[] = [
  {
    id: '1',
    storeId: '1',
    date: '2024-09-15',
    totalSales: 450000,
    customerCount: 25,
    averageSpend: 18000,
    longSessionCount: 8,
    longSessionRevenue: 180000,
    averageSessionDuration: 105
  },
  {
    id: '2',
    storeId: '1',
    date: '2024-09-14',
    totalSales: 380000,
    customerCount: 22,
    averageSpend: 17273,
    longSessionCount: 6,
    longSessionRevenue: 120000,
    averageSessionDuration: 95
  }
];

// その他ポイントサンプルデータ
export const otherPointsSampleData: OtherPoints[] = [
  {
    id: '1',
    storeId: '1',
    staffId: 'S002',
    staffName: '伊藤美咲',
    pointType: 'customer_satisfaction',
    points: 10,
    reason: 'お客様からのお褒めの言葉',
    awardedDate: '2024-09-15',
    awardedBy: '山田一郎'
  },
  {
    id: '2',
    storeId: '1',
    staffId: 'S003',
    staffName: '高橋健太',
    pointType: 'service',
    points: 5,
    reason: '積極的な接客態度',
    awardedDate: '2024-09-14',
    awardedBy: '山田一郎'
  }
];

// マイナスポイントサンプルデータ
export const minusPointsSampleData: MinusPoints[] = [
  {
    id: '1',
    storeId: '1',
    staffId: 'S004',
    staffName: '佐々木次郎',
    penaltyType: 'late',
    points: -3,
    reason: '遅刻（30分）',
    incurredDate: '2024-09-14',
    issuedBy: '山田一郎',
    isResolved: false
  }
];

// 顧客ポイントサンプルデータ
export const customerPointsSampleData: StoreCustomerPoints[] = [
  {
    id: '1',
    storeId: '1',
    customerId: 'C001',
    customerName: '田中様',
    pointType: 'visit',
    points: 100,
    currentBalance: 1250,
    earnedDate: '2024-09-15',
    description: '来店ポイント'
  },
  {
    id: '2',
    storeId: '1',
    customerId: 'C001',
    customerName: '田中様',
    pointType: 'spending',
    points: 200,
    currentBalance: 1150,
    earnedDate: '2024-09-15',
    description: '利用金額20,000円'
  }
];

// 割引サンプルデータ
export const discountSampleData: Discount[] = [
  {
    id: '1',
    storeId: '1',
    discountName: '新規お客様割引',
    amount: 2000,
    status: '使用中',
    notes: '初回利用のお客様に適用',
    sortOrder: 1
  },
  {
    id: '2',
    storeId: '1',
    discountName: 'リピーター割引',
    amount: 1500,
    status: '使用中',
    notes: '月3回以上利用のお客様に適用'
  },
  {
    id: '3',
    storeId: '1',
    discountName: '学生割引',
    amount: 1000,
    status: '中止',
    notes: '学生証提示で適用（現在中止中）',
    sortOrder: 3
  },
  {
    id: '4',
    storeId: '1',
    discountName: '平日割引',
    amount: 500,
    status: '使用中',
    notes: '月曜～木曜の利用時に適用',
    sortOrder: 2
  },
  {
    id: '5',
    storeId: '1',
    discountName: 'キャンペーン割引',
    amount: 3000,
    status: '廃棄',
    notes: '期間限定キャンペーン（終了済み）'
  }
];

// 表示設定サンプルデータ
export const displaySettingsSampleData: DisplaySettings[] = [
  {
    id: '1',
    storeId: '1',
    settingName: 'メニュー表示順',
    settingType: 'menu',
    settingValue: 'price_asc',
    isEnabled: true,
    lastUpdated: '2024-09-15T10:00:00Z',
    updatedBy: '山田一郎'
  },
  {
    id: '2',
    storeId: '1',
    settingName: 'テーマカラー',
    settingType: 'theme',
    settingValue: '#1a1a1a',
    isEnabled: true,
    lastUpdated: '2024-09-10T14:30:00Z',
    updatedBy: '山田一郎'
  }
];

// メディアサンプルデータ
export const mediaSampleData: Media[] = [
  {
    id: '1',
    storeId: '1',
    mediaType: 'image',
    fileName: 'store_image_001.jpg',
    originalName: '店舗外観.jpg',
    fileSize: 2048000,
    mimeType: 'image/jpeg',
    url: '/media/store_image_001.jpg',
    category: 'interior',
    description: '店舗外観写真',
    isActive: true,
    uploadedAt: '2024-09-15T09:00:00Z',
    uploadedBy: '山田一郎'
  },
  {
    id: '2',
    storeId: '1',
    mediaType: 'image',
    fileName: 'menu_001.jpg',
    originalName: 'ドリンクメニュー.jpg',
    fileSize: 1536000,
    mimeType: 'image/jpeg',
    url: '/media/menu_001.jpg',
    category: 'menu',
    description: 'ドリンクメニュー',
    isActive: true,
    uploadedAt: '2024-09-14T16:00:00Z',
    uploadedBy: '山田一郎'
  }
];

// オプションサンプルデータ
export const storeOptionsSampleData: StoreOptions[] = [
  {
    id: '1',
    storeId: '1',
    type: 'A',
    optionName: 'ドリンクサービス',
    amount: 2000,
    storeShare: 1200,
    hostessShare: 800,
    webCode: 'DRINK',
    displayOrder: 1
  },
  {
    id: '2',
    storeId: '1',
    type: 'A',
    optionName: 'カラオケ',
    amount: 1500,
    storeShare: 900,
    hostessShare: 600,
    webCode: 'KARAOKE',
    displayOrder: 2
  },
  {
    id: '3',
    storeId: '1',
    type: 'B',
    optionName: 'マッサージ',
    amount: 3000,
    storeShare: 1500,
    hostessShare: 1500,
    webCode: 'MASSAGE',
    displayOrder: 1
  },
  {
    id: '4',
    storeId: '1',
    type: 'B',
    optionName: 'お食事サービス',
    amount: 2500,
    storeShare: 1700,
    hostessShare: 800,
    webCode: 'MEAL',
    displayOrder: 2
  },
  {
    id: '5',
    storeId: '1',
    type: 'A',
    optionName: 'VIPルーム',
    amount: 5000,
    storeShare: 3000,
    hostessShare: 2000,
    webCode: 'VIP'
  },
  {
    id: '6',
    storeId: '2',
    type: 'A',
    optionName: 'ドリンクサービス',
    amount: 1800,
    storeShare: 1100,
    hostessShare: 700,
    webCode: 'DRINK',
    displayOrder: 1
  },
  {
    id: '7',
    storeId: '2',
    type: 'B',
    optionName: 'プレミアムサービス',
    amount: 4000,
    storeShare: 2400,
    hostessShare: 1600,
    webCode: 'PREMIUM',
    displayOrder: 1
  }
];

