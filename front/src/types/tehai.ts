export interface TehaiData {
  id: string;
  no: string;
  storeName: string;
  icName: string;
  hostessName: string;
  status: 'attendance' | 'finished' | 'today' | 'cancelled';
  pickupDriver: string;
  pickupTime: string;
  pickupLocation: string;
  arrivalTime: string;
  finishTime: string;
  dropoffLocation: string;
  manager: string;
  checkboxes: {
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    checkbox4: boolean;
  };
}

export type TehaiStatus = 'attendance' | 'finished' | 'today' | 'cancelled';

export const TEHAI_STATUS_LABELS: Record<TehaiStatus, string> = {
  attendance: '出勤',
  finished: '終了',
  today: '当日',
  cancelled: '取消'
};

export const TEHAI_STATUS_VARIANTS: Record<TehaiStatus, 'secondary' | 'destructive' | 'outline' | 'default'> = {
  attendance: 'secondary',
  finished: 'default',
  today: 'outline',
  cancelled: 'destructive'
};
