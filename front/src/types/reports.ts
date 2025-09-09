// レポート・分析関連の型定義

// 日報データ
export interface DailyReport {
  id: string;
  reportDate: string; // レポート日
  reporterId: string; // 報告者ID
  reporterName: string; // 報告者名
  shiftInfo: {
    startTime: string;
    endTime: string;
    totalHours: number;
  }; // シフト情報
  operationSummary: {
    totalJobs: number; // 総件数
    completedJobs: number; // 完了件数
    cancelledJobs: number; // キャンセル件数
    totalRevenue: number; // 総売上
    totalDistance: number; // 総走行距離
    fuelConsumption: number; // 燃料消費量
  }; // 運行概要
  driverPerformance: {
    driverId: string;
    driverName: string;
    jobsCompleted: number;
    hoursWorked: number;
    revenue: number;
    fuelUsed: number;
    customerRating: number;
    incidents: number;
  }[]; // ドライバー実績
  hostessPerformance: {
    hostessId: string;
    hostessName: string;
    workHours: number;
    customerCount: number;
    earnings: number;
    rating: number;
  }[]; // ホステス実績
  incidents: {
    time: string;
    type: 'accident' | 'complaint' | 'delay' | 'equipment_failure' | 'other';
    description: string;
    involvedPersonnel: string[];
    resolution: string;
    severity: 'low' | 'medium' | 'high';
  }[]; // インシデント
  expenses: {
    category: string;
    amount: number;
    description: string;
    receipt: boolean;
  }[]; // 支出
  notes: string; // その他特記事項
  weather: string; // 天候
  trafficConditions: string; // 交通状況
  approver?: string; // 承認者
  approvalDate?: string; // 承認日
  status: 'draft' | 'submitted' | 'approved' | 'rejected'; // ステータス
}

// リアルタイム実績サマリーデータ
export interface RealtimePerformanceSummary {
  id: string;
  timestamp: string; // タイムスタンプ
  currentStats: {
    activeDrivers: number;
    busyDrivers: number;
    availableDrivers: number;
    offlineDrivers: number;
    activeHostesses: number;
    pendingJobs: number;
    inProgressJobs: number;
    completedJobsToday: number;
    todayRevenue: number;
    averageJobDuration: number; // 平均作業時間（分）
    customerSatisfactionScore: number;
  }; // 現在の統計
  hourlyStats: {
    hour: string; // "14:00"
    completedJobs: number;
    revenue: number;
    averageWaitTime: number; // 平均待機時間（分）
    customerCount: number;
  }[]; // 時間別統計
  driverRealtime: {
    driverId: string;
    driverName: string;
    status: string;
    currentLocation: string;
    lastJobCompletion?: string;
    todayJobs: number;
    todayRevenue: number;
    currentJobId?: string;
    estimatedAvailableTime?: string;
  }[]; // ドライバーリアルタイム状況
  hostessRealtime: {
    hostessId: string;
    hostessName: string;
    status: string;
    currentCustomer?: string;
    workStartTime?: string;
    todayEarnings: number;
    customerCount: number;
  }[]; // ホステスリアルタイム状況
  alerts: {
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
    priority: 'low' | 'medium' | 'high';
    acknowledged: boolean;
  }[]; // アラート
}

// サマリーグラフデータ
export interface SummaryGraph {
  id: string;
  graphType: 'revenue' | 'jobs' | 'drivers' | 'hostesses' | 'customers' | 'performance';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  data: {
    labels: string[]; // X軸ラベル
    datasets: {
      label: string;
      data: number[];
      color: string;
      type: 'line' | 'bar' | 'pie' | 'area';
    }[];
  }; // グラフデータ
  summary: {
    total: number;
    average: number;
    highest: {
      value: number;
      date: string;
    };
    lowest: {
      value: number;
      date: string;
    };
    trend: 'increasing' | 'decreasing' | 'stable';
    trendPercentage: number;
  }; // サマリー統計
  compareData?: {
    previousPeriod: {
      total: number;
      average: number;
    };
    growthRate: number;
  }; // 比較データ
}

// 店舗顧客ルートサマリーデータ
export interface StoreCustomerRouteSummary {
  id: string;
  storeId: string;
  storeName: string;
  summaryDate: string;
  customerRoutes: {
    customerId: string;
    customerName: string;
    routeCount: number; // ルート利用回数
    totalDistance: number; // 総距離
    totalTravelTime: number; // 総移動時間
    frequentRoutes: {
      fromLocation: string;
      toLocation: string;
      usageCount: number;
      averageTime: number;
      averageDistance: number;
    }[];
    preferredTimeSlots: {
      timeSlot: string; // "18:00-19:00"
      usageCount: number;
    }[];
    totalSpent: number; // 総支払額
    averageJobValue: number; // 平均案件価値
  }[]; // 顧客ルート
  popularRoutes: {
    rank: number;
    fromLocation: string;
    toLocation: string;
    totalUsage: number;
    totalRevenue: number;
    averageTime: number;
    averageDistance: number;
    peakHours: string[];
  }[]; // 人気ルート
  geographicDistribution: {
    area: string;
    customerCount: number;
    jobCount: number;
    revenue: number;
    averageDistance: number;
  }[]; // 地理的分布
  timeAnalysis: {
    peakHours: {
      hour: string;
      jobCount: number;
      revenue: number;
    }[];
    dayOfWeekAnalysis: {
      dayOfWeek: string;
      jobCount: number;
      revenue: number;
      averageJobValue: number;
    }[];
  }; // 時間分析
}

// 店舗メディア使用状況サマリーデータ
export interface StoreMediaUsageSummary {
  id: string;
  storeId: string;
  storeName: string;
  summaryPeriod: {
    startDate: string;
    endDate: string;
  };
  mediaChannels: {
    channelId: string;
    channelName: string;
    channelType: 'website' | 'app' | 'phone' | 'social_media' | 'email' | 'other';
    totalBookings: number;
    totalRevenue: number;
    conversionRate: number; // 成約率（%）
    averageBookingValue: number;
    customerAcquisitionCost: number;
    customerRetentionRate: number;
    popularTimeSlots: {
      timeSlot: string;
      bookingCount: number;
    }[];
  }[]; // メディアチャネル
  performanceMetrics: {
    totalImpressions: number; // 総表示回数
    totalClicks: number; // 総クリック数
    clickThroughRate: number; // クリック率（%）
    totalBookings: number; // 総予約数
    bookingConversionRate: number; // 予約成約率（%）
    totalRevenue: number; // 総売上
    returnOnInvestment: number; // ROI（%）
  }; // パフォーマンス指標
  customerBehavior: {
    newCustomers: number;
    returningCustomers: number;
    averageSessionDuration: number; // 平均セッション時間（分）
    averagePageViews: number;
    bounceRate: number; // 直帰率（%）
    preferredBookingMethod: string;
  }; // 顧客行動
  campaigns: {
    campaignId: string;
    campaignName: string;
    startDate: string;
    endDate: string;
    budget: number;
    spent: number;
    impressions: number;
    clicks: number;
    bookings: number;
    revenue: number;
    roi: number;
  }[]; // キャンペーン
}

