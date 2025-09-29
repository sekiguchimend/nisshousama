export interface StaffAttendanceData {
  id: string;
  serialNumber: string; // 通し番号
  workType: 'work' | 'request'; // 出/休（出勤または希望）
  employmentType: 'employee' | 'part_time'; // 区分（社員またはアルバイト）
  name: string; // 氏名
  number: string; // 数字
  startTime: string; // 出勤時刻（HH:MM形式）
  endTime: string; // 退社時刻（HH:MM形式）
  currentStatus?: 'attendance' | 'leaving'; // 出勤/退勤（自動設定）
  temperatureCheck: boolean; // 検温
  contactCheck: boolean; // 連絡
  catchStart: boolean; // キャッチスタート
}

export type WorkType = 'work' | 'request';
export type EmploymentType = 'employee' | 'part_time';
export type AttendanceStatus = 'attendance' | 'leaving';

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  work: '出勤',
  request: '希望'
};

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  employee: '社員',
  part_time: 'アルバイト'
};

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  attendance: '出勤',
  leaving: '退勤'
};

export const ATTENDANCE_STATUS_VARIANTS: Record<AttendanceStatus, 'default' | 'secondary'> = {
  attendance: 'default',
  leaving: 'secondary'
};

// 現在時刻に基づいて出勤/退勤ステータスを判定する関数
export function determineAttendanceStatus(
  workType: WorkType,
  startTime: string,
  endTime: string,
  currentTime: string = new Date().toLocaleTimeString('ja-JP', { hour12: false, hour: '2-digit', minute: '2-digit' })
): AttendanceStatus {
  // 希望の場合は時間に関係なく判定
  if (workType === 'request') {
    const current = timeToMinutes(currentTime);
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    
    return (current >= start && current <= end) ? 'attendance' : 'leaving';
  }
  
  // 出勤の場合は常に出勤ステータス
  return 'attendance';
}

// 時刻文字列（HH:MM）を分に変換するヘルパー関数
function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}
