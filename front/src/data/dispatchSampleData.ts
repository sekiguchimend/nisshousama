import type { HostessSchedule, StaffSchedule, DispatchData, DriverData } from '@/types';

// サンプルホステスデータ
export const sampleHostesses: HostessSchedule[] = [
  { 
    id: "1", 
    name: "みぽりん", 
    pickupDriver: "田中", 
    decision: 1, 
    workStart: "16:00", 
    pickupLocation: "成田空港", 
    workEnd: "22:00", 
    goHome: "23:30" 
  },
  { 
    id: "2", 
    name: "さとか", 
    pickupDriver: "佐藤", 
    decision: 1, 
    workStart: "16:00", 
    pickupLocation: "羽田空港", 
    workEnd: "22:30", 
    goHome: "23:45" 
  },
  { 
    id: "3", 
    name: "せり", 
    pickupDriver: "山田", 
    decision: 1, 
    workStart: "16:00", 
    pickupLocation: "成田空港", 
    workEnd: "21:30" 
  },
  { 
    id: "4", 
    name: "みか", 
    pickupDriver: "鈴木", 
    decision: 1, 
    workStart: "16:00", 
    pickupLocation: "羽田空港", 
    workEnd: "22:15" 
  },
  { 
    id: "5", 
    name: "らん", 
    decision: 1, 
    workStart: "17:00", 
    pickupLocation: "上野駅" 
  },
  { 
    id: "6", 
    name: "ここな", 
    pickupDriver: "高橋", 
    decision: 1, 
    workStart: "17:00", 
    pickupLocation: "成田空港" 
  },
  { 
    id: "7", 
    name: "ちなつ", 
    pickupDriver: "伊藤", 
    decision: 1, 
    workStart: "17:00", 
    pickupLocation: "羽田空港", 
    workEnd: "23:00" 
  },
  { 
    id: "8", 
    name: "ゆあ", 
    decision: 1, 
    workStart: "17:00", 
    pickupLocation: "成田空港" 
  },
  { 
    id: "9", 
    name: "りお", 
    decision: 1, 
    workStart: "18:00", 
    pickupLocation: "羽田空港" 
  },
  { 
    id: "10", 
    name: "なな", 
    pickupDriver: "松本", 
    decision: 1, 
    workStart: "18:00", 
    pickupLocation: "成田空港", 
    workEnd: "23:30" 
  },
  { 
    id: "11", 
    name: "ミント", 
    decision: 1, 
    workStart: "18:00", 
    pickupLocation: "羽田空港" 
  },
  { 
    id: "12", 
    name: "ゆめ", 
    decision: 1, 
    workStart: "19:00", 
    pickupLocation: "成田空港" 
  }
];

// サンプルスタッフデータ
export const sampleStaff: StaffSchedule[] = [
  { memo: "田中マネージャー 14:00出勤 マネージャー業務" },
  { memo: "佐藤主任 15:00出勤 主任業務" },
  { memo: "山田リーダー 16:00出勤 リーダー業務" },
  { memo: "鈴木サブ 17:00出勤 サブ業務" },
  { memo: "高橋アシスタント 18:00出勤 アシスタント業務" },
  { memo: "伊藤コーディネーター 19:00出勤 コーディネーター業務" }
];

// サンプル配車データ
export const sampleDispatch: DispatchData[] = [
  { id: "1", number: "0054", customer: "田中様", from: "成田空港", to: "渋谷", time: "17:30", status: "pending", priority: "high" },
  { id: "2", number: "0055", customer: "佐藤様", from: "羽田空港", to: "新宿", time: "18:00", status: "assigned", priority: "normal", driver: "山田" },
  { id: "3", number: "0056", customer: "鈴木様", from: "上野駅", to: "品川", time: "18:30", status: "pending", priority: "urgent" }
];

// サンプルドライバーデータ
export const sampleDrivers: DriverData[] = [
  { id: "1", name: "山田", status: "busy", location: "羽田空港", currentJob: "0055" },
  { id: "2", name: "田中", status: "available", location: "成田空港" },
  { id: "3", name: "佐藤", status: "available", location: "上野駅" },
  { id: "4", name: "鈴木", status: "offline", location: "品川駅" }
];
