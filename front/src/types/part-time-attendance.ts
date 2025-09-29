export interface PartTimeAttendanceData {
  id: string;
  serialNumber: string; // 通し番号
  name: string; // 名前
  requestType: 'request' | 'attendance'; // 希望または出勤
  startTime: string; // 出勤時刻（HH:MM形式）
  endTime: string; // 退社時刻（HH:MM形式）
  jobType: 'driver' | 'office'; // 職務（ドライバまたは内勤）
}

export type PartTimeRequestType = 'request' | 'attendance';
export type PartTimeJobType = 'driver' | 'office';

export const PART_TIME_REQUEST_TYPE_LABELS: Record<PartTimeRequestType, string> = {
  request: '希望',
  attendance: '出勤'
};

export const PART_TIME_JOB_TYPE_LABELS: Record<PartTimeJobType, string> = {
  driver: 'ドライバ',
  office: '内勤'
};

export const PART_TIME_REQUEST_TYPE_VARIANTS: Record<PartTimeRequestType, 'default' | 'outline'> = {
  request: 'outline',
  attendance: 'default'
};

export const PART_TIME_JOB_TYPE_VARIANTS: Record<PartTimeJobType, 'secondary' | 'outline'> = {
  driver: 'secondary',
  office: 'outline'
};
