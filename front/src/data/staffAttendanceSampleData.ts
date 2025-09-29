import { StaffAttendanceData, determineAttendanceStatus } from '@/types/staff-attendance';

const baseData: Omit<StaffAttendanceData, 'currentStatus'>[] = [
  {
    id: '1',
    serialNumber: '001',
    workType: 'work',
    employmentType: 'employee',
    name: '田中太郎',
    number: '101',
    startTime: '09:00',
    endTime: '18:00',
    temperatureCheck: true,
    contactCheck: true,
    catchStart: false
  },
  {
    id: '2',
    serialNumber: '002',
    workType: 'request',
    employmentType: 'part_time',
    name: '佐藤花子',
    number: '102',
    startTime: '10:00',
    endTime: '16:00',
    temperatureCheck: false,
    contactCheck: true,
    catchStart: true
  },
  {
    id: '3',
    serialNumber: '003',
    workType: 'work',
    employmentType: 'employee',
    name: '鈴木一郎',
    number: '103',
    startTime: '08:30',
    endTime: '17:30',
    temperatureCheck: true,
    contactCheck: false,
    catchStart: false
  },
  {
    id: '4',
    serialNumber: '004',
    workType: 'request',
    employmentType: 'part_time',
    name: '高橋美咲',
    number: '104',
    startTime: '14:00',
    endTime: '20:00',
    temperatureCheck: false,
    contactCheck: false,
    catchStart: true
  },
  {
    id: '5',
    serialNumber: '005',
    workType: 'work',
    employmentType: 'employee',
    name: '山田健二',
    number: '105',
    startTime: '07:00',
    endTime: '16:00',
    temperatureCheck: true,
    contactCheck: true,
    catchStart: false
  }
];

// 現在時刻に基づいてステータスを自動設定
export const staffAttendanceSampleData: StaffAttendanceData[] = baseData.map(data => ({
  ...data,
  currentStatus: determineAttendanceStatus(data.workType, data.startTime, data.endTime)
}));
