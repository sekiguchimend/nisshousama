// 配車関連の追加サンプルデータ

import { DispatchPanel2D, RT2Panel, AreaDivision, DispatchAreaTransportFee, Tehai } from '@/types/dispatch-extended';

// 配車2Dパネルサンプルデータ
export const sampleDispatchPanel2D: DispatchPanel2D[] = [
  {
    id: "panel2d001",
    currentTime: "2025-01-27T20:30:00",
    drivers: [
      {
        id: "driver001",
        name: "山田太郎",
        vehicleNumber: "品川500あ1234",
        position: {
          x: 35.6762,
          y: 139.6503,
          address: "東京都千代田区丸の内1-1-1"
        },
        status: "available",
        fuelLevel: 75,
        workHours: 6.5
      },
      {
        id: "driver002",
        name: "佐藤花子",
        vehicleNumber: "品川500い5678",
        position: {
          x: 35.6586,
          y: 139.7454,
          address: "東京都渋谷区渋谷2-1-1"
        },
        status: "busy",
        currentJobId: "job001",
        fuelLevel: 60,
        workHours: 4.2
      }
    ],
    pendingJobs: [
      {
        id: "job002",
        customerName: "田中様",
        pickupLocation: {
          x: 35.6695,
          y: 139.7017,
          address: "東京都港区赤坂1-1-1"
        },
        dropoffLocation: {
          x: 35.6762,
          y: 139.6503,
          address: "東京都千代田区丸の内1-1-1"
        },
        requestedTime: "2025-01-27T21:00:00",
        priority: "high",
        estimatedDuration: 45,
        specialRequests: ["英語対応可能ドライバー希望"]
      }
    ],
    mapCenter: {
      x: 35.6762,
      y: 139.6503
    },
    zoomLevel: 12
  }
];

// RT2パネルサンプルデータ
export const sampleRT2Panel: RT2Panel[] = [
  {
    id: "rt2_001",
    realTimeData: {
      timestamp: "2025-01-27T20:30:00",
      activeDrivers: 12,
      busyDrivers: 8,
      availableDrivers: 4,
      pendingJobs: 5,
      completedJobsToday: 45,
      totalRevenueToday: 680000
    },
    driverStatuses: [
      {
        driverId: "driver001",
        driverName: "山田太郎",
        status: "available",
        currentLocation: "丸の内",
        lastUpdate: "2025-01-27T20:28:00",
        todayStats: {
          jobsCompleted: 6,
          hoursWorked: 6.5,
          revenue: 45000
        }
      },
      {
        driverId: "driver002",
        driverName: "佐藤花子",
        status: "busy",
        currentLocation: "渋谷",
        lastUpdate: "2025-01-27T20:25:00",
        todayStats: {
          jobsCompleted: 4,
          hoursWorked: 4.2,
          revenue: 35000
        }
      }
    ],
    jobQueue: [
      {
        jobId: "job002",
        priority: 1,
        customerName: "田中様",
        pickupTime: "21:00",
        pickupLocation: "赤坂",
        dropoffLocation: "丸の内",
        estimatedDuration: 45,
        status: "pending"
      },
      {
        jobId: "job003",
        priority: 2,
        customerName: "佐藤様",
        pickupTime: "21:30",
        pickupLocation: "銀座",
        dropoffLocation: "六本木",
        estimatedDuration: 30,
        assignedDriverId: "driver003",
        status: "assigned"
      }
    ],
    alerts: [
      {
        id: "alert001",
        type: "warning",
        message: "ドライバー不足のため配車に遅延が発生する可能性があります",
        timestamp: "2025-01-27T20:15:00",
        acknowledged: false
      }
    ]
  }
];

// エリア区分サンプルデータ
export const sampleAreaDivisions: AreaDivision[] = [
  {
    id: "area001",
    areaCode: "A01",
    areaName: "銀座エリア",
    subAreas: [],
    boundaries: {
      northeast: { lat: 35.6721, lng: 139.7731 },
      southwest: { lat: 35.6676, lng: 139.7619 }
    },
    baseTransportFee: 3000,
    timeMultiplier: 1.0,
    distanceMultiplier: 1.2,
    surchargeRules: {
      nightSurcharge: 25,
      holidaySurcharge: 15,
      peakHourSurcharge: 20
    },
    driverAssignmentPriority: 1,
    estimatedTravelTimes: {
      "area002": 15,
      "area003": 20,
      "area004": 25
    },
    isActive: true,
    notes: "高級エリア、特別料金適用"
  },
  {
    id: "area002",
    areaCode: "A02",
    areaName: "六本木エリア",
    subAreas: [],
    boundaries: {
      northeast: { lat: 35.6695, lng: 139.7348 },
      southwest: { lat: 35.6586, lng: 139.7266 }
    },
    baseTransportFee: 2800,
    timeMultiplier: 1.0,
    distanceMultiplier: 1.1,
    surchargeRules: {
      nightSurcharge: 30,
      holidaySurcharge: 20,
      peakHourSurcharge: 25
    },
    driverAssignmentPriority: 1,
    estimatedTravelTimes: {
      "area001": 15,
      "area003": 10,
      "area004": 20
    },
    isActive: true,
    notes: "夜間需要が高い"
  }
];

// 配車エリア運送料サンプルデータ
export const sampleDispatchAreaTransportFees: DispatchAreaTransportFee[] = [
  {
    id: "fee001",
    fromAreaId: "area001",
    fromAreaName: "銀座エリア",
    toAreaId: "area002",
    toAreaName: "六本木エリア",
    distance: 3.2,
    baseFee: 2000,
    timeBasedFee: {
      perMinute: 80,
      minimumTime: 10
    },
    distanceBasedFee: {
      perKm: 300,
      minimumDistance: 2.0
    },
    surcharges: {
      night: 25,
      holiday: 15,
      peakHour: 20,
      weather: 10
    },
    tollFee: 0,
    estimatedTravelTime: 15,
    effectiveDate: "2025-01-01",
    isActive: true
  },
  {
    id: "fee002",
    fromAreaId: "area001",
    fromAreaName: "銀座エリア",
    toAreaId: "area003",
    toAreaName: "新宿エリア",
    distance: 6.8,
    baseFee: 3500,
    timeBasedFee: {
      perMinute: 80,
      minimumTime: 15
    },
    distanceBasedFee: {
      perKm: 300,
      minimumDistance: 3.0
    },
    surcharges: {
      night: 25,
      holiday: 15,
      peakHour: 20,
      weather: 10
    },
    tollFee: 320,
    estimatedTravelTime: 20,
    effectiveDate: "2025-01-01",
    isActive: true
  }
];

// 手配サンプルデータ
export const sampleTehai: Tehai[] = [
  {
    id: "tehai001",
    requestNumber: "REQ-20250127-001",
    requestDate: "2025-01-27T20:30:00",
    customerInfo: {
      customerId: "cust001",
      customerName: "田中太郎",
      phoneNumber: "03-1234-5678",
      specialRequests: ["英語対応可能ドライバー", "高級車希望"]
    },
    serviceDetails: {
      serviceType: "escort",
      pickupLocation: {
        address: "東京都港区赤坂1-1-1 赤坂ビル",
        landmark: "赤坂見附駅A出口から徒歩3分",
        notes: "ビル1Fロビーでお待ちください"
      },
      dropoffLocation: {
        address: "東京都千代田区丸の内1-1-1",
        landmark: "東京駅丸の内南口",
        notes: "駅前ロータリー"
      },
      requestedTime: "2025-01-27T21:00:00",
      estimatedDuration: 45,
      passengerCount: 2,
      luggageCount: 1
    },
    assignedDriver: {
      driverId: "driver001",
      driverName: "山田太郎",
      vehicleNumber: "品川500あ1234",
      assignedTime: "2025-01-27T20:35:00"
    },
    feeCalculation: {
      baseFee: 3000,
      timeFee: 3600,
      distanceFee: 960,
      tollFee: 0,
      surcharges: 750,
      totalFee: 8310
    },
    status: "assigned",
    trackingInfo: {
      currentLocation: "配車準備中",
      estimatedArrival: "2025-01-27T20:55:00"
    },
    paymentInfo: {
      method: "card",
      amount: 8310,
      receiptIssued: false,
      paymentCompleted: false
    },
    notes: "VIP顧客、丁寧な対応をお願いします"
  },
  {
    id: "tehai002",
    requestNumber: "REQ-20250127-002",
    requestDate: "2025-01-27T19:45:00",
    customerInfo: {
      customerId: "cust002",
      customerName: "佐藤花子",
      phoneNumber: "090-8765-4321",
      specialRequests: []
    },
    serviceDetails: {
      serviceType: "pickup",
      pickupLocation: {
        address: "東京都渋谷区渋谷2-1-1",
        landmark: "渋谷駅ハチ公口",
        notes: "駅前のスターバックス前"
      },
      dropoffLocation: {
        address: "羽田空港第2ターミナル",
        notes: "出発ロビー"
      },
      requestedTime: "2025-01-27T20:30:00",
      estimatedDuration: 60,
      passengerCount: 1,
      luggageCount: 2
    },
    assignedDriver: {
      driverId: "driver002",
      driverName: "佐藤次郎",
      vehicleNumber: "品川500い5678",
      assignedTime: "2025-01-27T19:50:00"
    },
    feeCalculation: {
      baseFee: 4000,
      timeFee: 4800,
      distanceFee: 2400,
      tollFee: 1200,
      surcharges: 0,
      totalFee: 12400
    },
    status: "in_progress",
    trackingInfo: {
      currentLocation: "首都高速道路",
      estimatedArrival: "2025-01-27T21:20:00",
      actualPickupTime: "2025-01-27T20:32:00"
    },
    paymentInfo: {
      method: "cash",
      amount: 12400,
      receiptIssued: true,
      paymentCompleted: false
    },
    notes: "空港送迎、フライト時間に注意"
  }
];
