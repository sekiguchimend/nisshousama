import { PartTimeAttendanceData } from '@/types/part-time-attendance';

export const partTimeAttendanceSampleData: PartTimeAttendanceData[] = [
  {
    id: '1',
    serialNumber: '001',
    name: '田村健太',
    requestType: 'request',
    startTime: '10:00',
    endTime: '16:00',
    jobType: 'driver'
  },
  {
    id: '2',
    serialNumber: '002',
    name: '佐々木まり',
    requestType: 'attendance',
    startTime: '09:00',
    endTime: '15:00',
    jobType: 'office'
  },
  {
    id: '3',
    serialNumber: '003',
    name: '山本大樹',
    requestType: 'request',
    startTime: '14:00',
    endTime: '20:00',
    jobType: 'driver'
  },
  {
    id: '4',
    serialNumber: '004',
    name: '小林美咲',
    requestType: 'attendance',
    startTime: '11:00',
    endTime: '17:00',
    jobType: 'office'
  },
  {
    id: '5',
    serialNumber: '005',
    name: '井上拓也',
    requestType: 'request',
    startTime: '08:00',
    endTime: '14:00',
    jobType: 'driver'
  },
  {
    id: '6',
    serialNumber: '006',
    name: '松田香織',
    requestType: 'attendance',
    startTime: '13:00',
    endTime: '19:00',
    jobType: 'office'
  },
  {
    id: '7',
    serialNumber: '007',
    name: '加藤雄介',
    requestType: 'request',
    startTime: '12:00',
    endTime: '18:00',
    jobType: 'driver'
  },
  {
    id: '8',
    serialNumber: '008',
    name: '渡辺麻衣',
    requestType: 'attendance',
    startTime: '10:30',
    endTime: '16:30',
    jobType: 'office'
  },
  {
    id: '9',
    serialNumber: '009',
    name: '中島慎一',
    requestType: 'request',
    startTime: '15:00',
    endTime: '21:00',
    jobType: 'driver'
  },
  {
    id: '10',
    serialNumber: '010',
    name: '高木彩子',
    requestType: 'attendance',
    startTime: '09:30',
    endTime: '15:30',
    jobType: 'office'
  },
  {
    id: '11',
    serialNumber: '011',
    name: '橋本誠',
    requestType: 'request',
    startTime: '07:00',
    endTime: '13:00',
    jobType: 'driver'
  },
  {
    id: '12',
    serialNumber: '012',
    name: '石川優子',
    requestType: 'attendance',
    startTime: '14:30',
    endTime: '20:30',
    jobType: 'office'
  },
  {
    id: '13',
    serialNumber: '013',
    name: '藤田光',
    requestType: 'request',
    startTime: '11:30',
    endTime: '17:30',
    jobType: 'driver'
  },
  {
    id: '14',
    serialNumber: '014',
    name: '森下理恵',
    requestType: 'attendance',
    startTime: '08:30',
    endTime: '14:30',
    jobType: 'office'
  },
  {
    id: '15',
    serialNumber: '015',
    name: '清水駿',
    requestType: 'request',
    startTime: '16:00',
    endTime: '22:00',
    jobType: 'driver'
  },
  {
    id: '16',
    serialNumber: '016',
    name: '岡田奈々',
    requestType: 'attendance',
    startTime: '12:30',
    endTime: '18:30',
    jobType: 'office'
  },
  {
    id: '17',
    serialNumber: '017',
    name: '村田翔太',
    requestType: 'request',
    startTime: '06:00',
    endTime: '12:00',
    jobType: 'driver'
  },
  {
    id: '18',
    serialNumber: '018',
    name: '池田咲',
    requestType: 'attendance',
    startTime: '17:00',
    endTime: '23:00',
    jobType: 'office'
  }
];

// 最小表示行数（スクロール対応）
export const PART_TIME_MIN_ROWS = 18;
