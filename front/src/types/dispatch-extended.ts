// 配車関連の追加型定義（既存のdispatch.tsを拡張）

// 配車2Dパネルデータ
export interface DispatchPanel2D {
  id: string;
  currentTime: string;
  drivers: {
    id: string;
    name: string;
    vehicleNumber: string;
    position: {
      x: number; // X座標
      y: number; // Y座標
      address: string; // 現在地住所
    };
    status: 'available' | 'busy' | 'moving' | 'offline';
    currentJobId?: string;
    nextJobId?: string;
    fuelLevel: number; // 燃料レベル（%）
    workHours: number; // 勤務時間
  }[];
  pendingJobs: {
    id: string;
    customerName: string;
    pickupLocation: {
      x: number;
      y: number;
      address: string;
    };
    dropoffLocation: {
      x: number;
      y: number;
      address: string;
    };
    requestedTime: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    estimatedDuration: number; // 予想所要時間（分）
    specialRequests: string[];
  }[];
  mapCenter: {
    x: number;
    y: number;
  };
  zoomLevel: number;
}

// RT2パネルデータ
export interface RT2Panel {
  id: string;
  realTimeData: {
    timestamp: string;
    activeDrivers: number;
    busyDrivers: number;
    availableDrivers: number;
    pendingJobs: number;
    completedJobsToday: number;
    totalRevenueToday: number;
  };
  driverStatuses: {
    driverId: string;
    driverName: string;
    status: 'available' | 'busy' | 'break' | 'offline';
    currentLocation: string;
    lastUpdate: string;
    todayStats: {
      jobsCompleted: number;
      hoursWorked: number;
      revenue: number;
    };
  }[];
  jobQueue: {
    jobId: string;
    priority: number;
    customerName: string;
    pickupTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    estimatedDuration: number;
    assignedDriverId?: string;
    status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  }[];
  alerts: {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
    acknowledged: boolean;
  }[];
}

// 配車エリア区分データ（ホテル管理とは別）
export interface DispatchAreaDivision {
  id: string;
  areaCode: string; // エリアコード
  areaName: string; // エリア名
  parentAreaId?: string; // 親エリアID
  subAreas: string[]; // 子エリアID一覧
  boundaries: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
  }; // エリア境界
  baseTransportFee: number; // 基本運送料
  timeMultiplier: number; // 時間倍率
  distanceMultiplier: number; // 距離倍率
  surchargeRules: {
    nightSurcharge: number; // 深夜割増（%）
    holidaySurcharge: number; // 休日割増（%）
    peakHourSurcharge: number; // ピーク時割増（%）
  }; // 割増料金ルール
  driverAssignmentPriority: number; // ドライバー割当優先度
  estimatedTravelTimes: {
    [destinationAreaId: string]: number; // 他エリアへの推定移動時間（分）
  };
  isActive: boolean; // アクティブ状態
  notes?: string; // 備考
}

// 配車エリア運送料データ
export interface DispatchAreaTransportFee {
  id: string;
  fromAreaId: string; // 出発エリア
  fromAreaName: string;
  toAreaId: string; // 到着エリア
  toAreaName: string;
  distance: number; // 距離（km）
  baseFee: number; // 基本料金
  timeBasedFee: {
    perMinute: number; // 分単位料金
    minimumTime: number; // 最低時間（分）
  }; // 時間制料金
  distanceBasedFee: {
    perKm: number; // キロ単位料金
    minimumDistance: number; // 最低距離（km）
  }; // 距離制料金
  surcharges: {
    night: number; // 深夜割増（%）
    holiday: number; // 休日割増（%）
    peakHour: number; // ピーク時割増（%）
    weather: number; // 悪天候割増（%）
  }; // 各種割増
  tollFee: number; // 通行料
  estimatedTravelTime: number; // 推定移動時間（分）
  effectiveDate: string; // 有効開始日
  expiryDate?: string; // 有効終了日
  isActive: boolean; // アクティブ状態
}

// 手配データ
export interface Tehai {
  id: string;
  requestNumber: string; // 手配番号
  requestDate: string; // 手配日時
  customerInfo: {
    customerId: string;
    customerName: string;
    phoneNumber: string;
    specialRequests: string[];
  }; // 顧客情報
  serviceDetails: {
    serviceType: 'pickup' | 'delivery' | 'escort' | 'waiting' | 'round_trip';
    pickupLocation: {
      address: string;
      landmark?: string;
      notes?: string;
    };
    dropoffLocation: {
      address: string;
      landmark?: string;
      notes?: string;
    };
    requestedTime: string;
    estimatedDuration: number;
    passengerCount: number;
    luggageCount: number;
  }; // サービス詳細
  assignedDriver: {
    driverId?: string;
    driverName?: string;
    vehicleNumber?: string;
    assignedTime?: string;
  }; // 割当ドライバー
  feeCalculation: {
    baseFee: number;
    timeFee: number;
    distanceFee: number;
    tollFee: number;
    surcharges: number;
    totalFee: number;
  }; // 料金計算
  status: 'requested' | 'confirmed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  trackingInfo: {
    currentLocation?: string;
    estimatedArrival?: string;
    actualPickupTime?: string;
    actualDropoffTime?: string;
  }; // 追跡情報
  paymentInfo: {
    method: 'cash' | 'card' | 'transfer' | 'other';
    amount: number;
    receiptIssued: boolean;
    paymentCompleted: boolean;
  }; // 支払い情報
  notes?: string; // 備考
}

