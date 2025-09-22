// 顧客関連のサンプルデータ

import { Customer, CustomerPoints, CustomerVehicleInfo, GroupLedger} from '@/types/customer';

// 顧客台帳サンプルデータ
export const sampleCustomers: Customer[] = [
  {
    id: "cust001",
    customerNumber: "C-00001",
    name: "田中太郎",
    nameKana: "タナカタロウ",
    company: "田中商事株式会社",
    phoneNumber: "03-1234-5678",
    email: "tanaka@example.com",
    address: {
      zipCode: "100-0001",
      prefecture: "東京都",
      city: "千代田区",
      street: "千代田1-1-1",
      building: "千代田ビル10F"
    },
    registrationDate: "2024-01-15",
    lastUsedDate: "2025-01-26",
    totalUsageCount: 45,
    totalAmount: 678000,
    status: "active",
    preferredPayment: "card",
    notes: "VIP顧客、深夜利用多め",
    tags: ["VIP", "法人", "深夜利用"]
  },
  {
    id: "cust002",
    customerNumber: "C-00002",
    name: "佐藤花子",
    nameKana: "サトウハナコ",
    phoneNumber: "090-8765-4321",
    email: "sato.hanako@email.com",
    address: {
      zipCode: "150-0001",
      prefecture: "東京都",
      city: "渋谷区",
      street: "神宮前1-2-3",
      building: "渋谷マンション501"
    },
    registrationDate: "2024-03-20",
    lastUsedDate: "2025-01-25",
    totalUsageCount: 28,
    totalAmount: 420000,
    status: "active",
    preferredPayment: "cash",
    notes: "空港利用が多い",
    tags: ["個人", "空港利用", "リピーター"]
  },
  {
    id: "cust003",
    customerNumber: "C-00003",
    name: "鈴木次郎",
    nameKana: "スズキジロウ",
    company: "鈴木エンタープライズ",
    phoneNumber: "03-9876-5432",
    address: {
      zipCode: "106-0032",
      prefecture: "東京都",
      city: "港区",
      street: "六本木6-1-20",
      building: "六本木ヒルズ"
    },
    registrationDate: "2023-11-10",
    lastUsedDate: "2025-01-20",
    totalUsageCount: 120,
    totalAmount: 1850000,
    status: "active",
    preferredPayment: "transfer",
    notes: "月次契約、最優良顧客",
    tags: ["VIP", "法人", "月次契約", "最優良"]
  }
];

// 顧客ポイントサンプルデータ
export const sampleCustomerPoints: CustomerPoints[] = [
  {
    id: "points001",
    customerId: "cust001",
    customerName: "田中太郎",
    currentPoints: 3420,
    totalEarnedPoints: 6780,
    totalUsedPoints: 3360,
    lastEarnedDate: "2025-01-26",
    lastUsedDate: "2025-01-20",
    pointHistory: [
      {
        id: "pt001",
        date: "2025-01-26",
        type: "earned",
        points: 150,
        reason: "サービス利用",
        relatedServiceId: "job001",
        balance: 3420
      },
      {
        id: "pt002",
        date: "2025-01-20",
        type: "used",
        points: -500,
        reason: "料金割引",
        relatedServiceId: "job002",
        balance: 3270
      }
    ],
    expiringPoints: [
      {
        points: 500,
        expiryDate: "2025-03-31"
      },
      {
        points: 800,
        expiryDate: "2025-04-30"
      }
    ]
  },
  {
    id: "points002",
    customerId: "cust002",
    customerName: "佐藤花子",
    currentPoints: 1680,
    totalEarnedPoints: 4200,
    totalUsedPoints: 2520,
    lastEarnedDate: "2025-01-25",
    lastUsedDate: "2025-01-15",
    pointHistory: [
      {
        id: "pt003",
        date: "2025-01-25",
        type: "earned",
        points: 120,
        reason: "サービス利用",
        relatedServiceId: "job003",
        balance: 1680
      }
    ],
    expiringPoints: [
      {
        points: 300,
        expiryDate: "2025-02-28"
      }
    ]
  }
];

// 顧客車両情報サンプルデータ
export const sampleCustomerVehicles: CustomerVehicleInfo[] = [
  {
    id: "vehicle001",
    customerId: "cust001",
    customerName: "田中太郎",
    vehicleNumber: "品川300あ1234",
    vehicleType: "BMW 7シリーズ",
    color: "ブラック",
    ownerName: "田中太郎",
    registrationDate: "2024-01-15",
    notes: "VIP車両、特別対応要",
    isActive: true
  },
  {
    id: "vehicle002",
    customerId: "cust002",
    customerName: "佐藤花子",
    vehicleNumber: "世田谷500さ5678",
    vehicleType: "Mercedes-Benz Eクラス",
    color: "ホワイト",
    ownerName: "佐藤花子",
    registrationDate: "2024-03-20",
    isActive: true
  },
  {
    id: "vehicle003",
    customerId: "cust003",
    customerName: "鈴木次郎",
    vehicleNumber: "品川800す9012",
    vehicleType: "Lexus LS",
    color: "シルバー",
    ownerName: "鈴木エンタープライズ",
    registrationDate: "2023-11-10",
    notes: "法人車両",
    isActive: true
  }
];

// グループ台帳サンプルデータ
export const sampleGroupLedgers: GroupLedger[] = [
  {
    id: "group001",
    groupName: "田中グループ",
    groupCode: "GRP-001",
    representativeCustomerId: "cust001",
    representativeCustomerName: "田中太郎",
    memberCount: 5,
    totalUsageAmount: 1250000,
    registrationDate: "2024-01-15",
    lastUsedDate: "2025-01-26",
    status: "active",
    discountRate: 10,
    members: [
      {
        customerId: "cust001",
        customerName: "田中太郎",
        role: "representative",
        joinDate: "2024-01-15"
      },
      {
        customerId: "cust004",
        customerName: "田中花子",
        role: "member",
        joinDate: "2024-02-01"
      },
      {
        customerId: "cust005",
        customerName: "田中一郎",
        role: "member",
        joinDate: "2024-02-15"
      }
    ],
    notes: "法人グループ、月次契約"
  },
  {
    id: "group002",
    groupName: "六本木VIPグループ",
    groupCode: "GRP-002",
    representativeCustomerId: "cust003",
    representativeCustomerName: "鈴木次郎",
    memberCount: 8,
    totalUsageAmount: 3200000,
    registrationDate: "2023-11-10",
    lastUsedDate: "2025-01-25",
    status: "active",
    discountRate: 15,
    members: [
      {
        customerId: "cust003",
        customerName: "鈴木次郎",
        role: "representative",
        joinDate: "2023-11-10"
      },
      {
        customerId: "cust006",
        customerName: "高橋美智子",
        role: "member",
        joinDate: "2023-12-01"
      }
    ],
    notes: "VIPグループ、特別料金適用"
  }
];

