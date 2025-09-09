import type { HostessScheduleData, DailyWorkSchedule } from '@/types/hostess';

// 空の日次スケジュールを作成
const createEmptyDailySchedule = (): DailyWorkSchedule => ({
  isWorkDay: false,
  startTime: '',
  endTime: '',
  breakTime: 0,
  workHours: 0,
  notes: ''
});

// ホステススケジュールサンプルデータ
export const hostessScheduleSampleData: HostessScheduleData[] = [
  {
    id: "1",
    hostessId: "H001",
    workType: "full_time",
    name: "田中美咲",
    assignedStaff: "佐藤主任",
    hostessManager: "山田HM",
    weeklySchedule: {
      monday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "02:00", 
        breakTime: 60, 
        workHours: 6, 
        notes: "" 
      },
      tuesday: { 
        isWorkDay: false, 
        startTime: "", 
        endTime: "", 
        breakTime: 0, 
        workHours: 0, 
        notes: "定休日" 
      },
      wednesday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "02:00", 
        breakTime: 60, 
        workHours: 6, 
        notes: "" 
      },
      thursday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "02:00", 
        breakTime: 60, 
        workHours: 6, 
        notes: "" 
      },
      friday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "03:00", 
        breakTime: 60, 
        workHours: 7, 
        notes: "金曜延長" 
      },
      saturday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "03:00", 
        breakTime: 60, 
        workHours: 7, 
        notes: "土曜延長" 
      },
      sunday: { 
        isWorkDay: false, 
        startTime: "", 
        endTime: "", 
        breakTime: 0, 
        workHours: 0, 
        notes: "定休日" 
      }
    },
    weeklyStats: {
      totalWorkDays: 5,
      totalWorkHours: 32,
      averageDailyHours: 6.4,
      expectedEarnings: 160000
    },
    weekStartDate: "2025-01-27",
    weekEndDate: "2025-02-02",
    lastUpdated: "2025-01-26T10:00:00Z",
    status: "confirmed"
  },
  {
    id: "2",
    hostessId: "H002",
    workType: "part_time",
    name: "鈴木さくら",
    assignedStaff: "高橋係長",
    hostessManager: "田中HM",
    weeklySchedule: {
      monday: createEmptyDailySchedule(),
      tuesday: { 
        isWorkDay: true, 
        startTime: "20:00", 
        endTime: "01:00", 
        breakTime: 30, 
        workHours: 4.5, 
        notes: "" 
      },
      wednesday: createEmptyDailySchedule(),
      thursday: { 
        isWorkDay: true, 
        startTime: "20:00", 
        endTime: "01:00", 
        breakTime: 30, 
        workHours: 4.5, 
        notes: "" 
      },
      friday: { 
        isWorkDay: true, 
        startTime: "20:00", 
        endTime: "02:00", 
        breakTime: 30, 
        workHours: 5.5, 
        notes: "" 
      },
      saturday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "02:00", 
        breakTime: 60, 
        workHours: 6, 
        notes: "土曜シフト" 
      },
      sunday: createEmptyDailySchedule()
    },
    weeklyStats: {
      totalWorkDays: 4,
      totalWorkHours: 20.5,
      averageDailyHours: 5.1,
      expectedEarnings: 102500
    },
    weekStartDate: "2025-01-27",
    weekEndDate: "2025-02-02",
    lastUpdated: "2025-01-26T10:00:00Z",
    status: "draft"
  },
  {
    id: "3",
    hostessId: "H003", 
    workType: "contract",
    name: "山口花音",
    assignedStaff: "中村主任",
    hostessManager: "鈴木HM",
    weeklySchedule: {
      monday: { 
        isWorkDay: true, 
        startTime: "18:00", 
        endTime: "01:00", 
        breakTime: 60, 
        workHours: 6, 
        notes: "" 
      },
      tuesday: { 
        isWorkDay: true, 
        startTime: "18:00", 
        endTime: "01:00", 
        breakTime: 60, 
        workHours: 6, 
        notes: "" 
      },
      wednesday: { 
        isWorkDay: true, 
        startTime: "18:00", 
        endTime: "01:00", 
        breakTime: 60, 
        workHours: 6, 
        notes: "" 
      },
      thursday: { 
        isWorkDay: false, 
        startTime: "", 
        endTime: "", 
        breakTime: 0, 
        workHours: 0, 
        notes: "私用休" 
      },
      friday: { 
        isWorkDay: true, 
        startTime: "18:00", 
        endTime: "02:00", 
        breakTime: 60, 
        workHours: 7, 
        notes: "" 
      },
      saturday: { 
        isWorkDay: true, 
        startTime: "18:00", 
        endTime: "02:00", 
        breakTime: 60, 
        workHours: 7, 
        notes: "" 
      },
      sunday: { 
        isWorkDay: false, 
        startTime: "", 
        endTime: "", 
        breakTime: 0, 
        workHours: 0, 
        notes: "定休日" 
      }
    },
    weeklyStats: {
      totalWorkDays: 5,
      totalWorkHours: 32,
      averageDailyHours: 6.4,
      expectedEarnings: 160000
    },
    weekStartDate: "2025-01-27",
    weekEndDate: "2025-02-02",
    lastUpdated: "2025-01-26T09:30:00Z",
    status: "published"
  },
  {
    id: "4",
    hostessId: "H004",
    workType: "dispatch",
    name: "伊藤あや",
    assignedStaff: "松本マネージャー",
    hostessManager: "渡辺HM", 
    weeklySchedule: {
      monday: createEmptyDailySchedule(),
      tuesday: createEmptyDailySchedule(),
      wednesday: { 
        isWorkDay: true, 
        startTime: "21:00", 
        endTime: "03:00", 
        breakTime: 30, 
        workHours: 5.5, 
        notes: "VIP専属" 
      },
      thursday: { 
        isWorkDay: true, 
        startTime: "21:00", 
        endTime: "03:00", 
        breakTime: 30, 
        workHours: 5.5, 
        notes: "VIP専属" 
      },
      friday: { 
        isWorkDay: true, 
        startTime: "21:00", 
        endTime: "04:00", 
        breakTime: 30, 
        workHours: 6.5, 
        notes: "VIP専属" 
      },
      saturday: { 
        isWorkDay: true, 
        startTime: "20:00", 
        endTime: "04:00", 
        breakTime: 60, 
        workHours: 7, 
        notes: "VIP専属" 
      },
      sunday: createEmptyDailySchedule()
    },
    weeklyStats: {
      totalWorkDays: 4,
      totalWorkHours: 24.5,
      averageDailyHours: 6.1,
      expectedEarnings: 147000
    },
    weekStartDate: "2025-01-27",
    weekEndDate: "2025-02-02",
    lastUpdated: "2025-01-26T11:15:00Z",
    status: "confirmed"
  },
  {
    id: "5",
    hostessId: "H005",
    workType: "temp",
    name: "新人研修生みゆ",
    assignedStaff: "新人担当・佐々木",
    hostessManager: "山田HM",
    weeklySchedule: {
      monday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "23:00", 
        breakTime: 30, 
        workHours: 3.5, 
        notes: "研修" 
      },
      tuesday: createEmptyDailySchedule(),
      wednesday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "23:00", 
        breakTime: 30, 
        workHours: 3.5, 
        notes: "研修" 
      },
      thursday: createEmptyDailySchedule(),
      friday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "00:00", 
        breakTime: 30, 
        workHours: 4.5, 
        notes: "実地研修" 
      },
      saturday: { 
        isWorkDay: true, 
        startTime: "19:00", 
        endTime: "00:00", 
        breakTime: 30, 
        workHours: 4.5, 
        notes: "実地研修" 
      },
      sunday: createEmptyDailySchedule()
    },
    weeklyStats: {
      totalWorkDays: 4,
      totalWorkHours: 16,
      averageDailyHours: 4.0,
      expectedEarnings: 64000
    },
    weekStartDate: "2025-01-27",
    weekEndDate: "2025-02-02", 
    lastUpdated: "2025-01-26T08:45:00Z",
    status: "draft"
  }
];

// 勤務形態別の設定
export const workTypeSettings = {
  full_time: { label: "正社員", baseHourlyRate: 5000, color: "blue" },
  part_time: { label: "パート", baseHourlyRate: 4500, color: "green" },
  contract: { label: "契約", baseHourlyRate: 5500, color: "purple" },
  dispatch: { label: "派遣", baseHourlyRate: 6000, color: "orange" },
  temp: { label: "臨時", baseHourlyRate: 4000, color: "gray" }
};

// 名前例（旧店舗一覧を名前例に変更）
export const nameOptions = [
  "田中美咲",
  "鈴木さくら",
  "山口花音",
  "伊藤あや",
  "新人研修生みゆ"
];

// ホステスマネージャー一覧
export const hostessManagerOptions = [
  "山田HM",
  "田中HM", 
  "鈴木HM",
  "渡辺HM",
  "佐藤HM"
];

// 担当者一覧
export const assignedStaffOptions = [
  "佐藤主任",
  "高橋係長",
  "中村主任",
  "松本マネージャー",
  "新人担当・佐々木"
];
