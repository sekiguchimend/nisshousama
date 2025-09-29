import { TehaiData } from '@/types/tehai';

export const tehaiSampleData: TehaiData[] = [
  {
    id: '1',
    no: '001',
    storeName: '本店',
    icName: '東京IC',
    hostessName: '山田花子',
    status: 'attendance',
    pickupDriver: '佐藤',
    pickupTime: '19:30',
    pickupLocation: '新宿駅',
    arrivalTime: '20:00',
    finishTime: '24:00',
    dropoffLocation: '渋谷駅',
    manager: '田中',
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false
    }
  },
  {
    id: '2',
    no: '002',
    storeName: '銀座',
    icName: '横浜IC',
    hostessName: '鈴木美香',
    status: 'cancelled',
    pickupDriver: '高橋',
    pickupTime: '20:00',
    pickupLocation: '池袋駅',
    arrivalTime: '20:30',
    finishTime: '25:00',
    dropoffLocation: '品川駅',
    manager: '木村',
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false
    }
  },
  {
    id: '3',
    no: '003',
    storeName: '新宿',
    icName: '川崎IC',
    hostessName: '伊藤舞',
    status: 'today',
    pickupDriver: '中村',
    pickupTime: '21:00',
    pickupLocation: '上野駅',
    arrivalTime: '21:30',
    finishTime: '26:00',
    dropoffLocation: '恵比寿駅',
    manager: '吉田',
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false
    }
  },
  {
    id: '4',
    no: '004',
    storeName: '渋谷',
    icName: '千葉IC',
    hostessName: '加藤愛',
    status: 'finished',
    pickupDriver: '松本',
    pickupTime: '18:30',
    pickupLocation: '銀座駅',
    arrivalTime: '19:00',
    finishTime: '23:30',
    dropoffLocation: '六本木駅',
    manager: '森田',
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false
    }
  }
];
