export interface ReservationData {
  id: string;
  reservationNumber: string; // 5桁数字
  customerName: string;
  hostessName: string;
  startTime: string; // HH:MM形式
  courseCode: string; // 大文字2文字
  endTime: string; // HH:MM形式
  location: string;
  hotelName: string;
}

export const COURSE_COLORS: Record<string, string> = {
  AA: 'bg-blue-100 text-blue-800',
  BB: 'bg-green-100 text-green-800',
  CC: 'bg-purple-100 text-purple-800',
  DD: 'bg-yellow-100 text-yellow-800',
  EE: 'bg-pink-100 text-pink-800'
};

