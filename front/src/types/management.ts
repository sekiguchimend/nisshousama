// 管理・運営関連の型定義

// 管理一覧データ
export interface ManagementList {
  id: string;
  category: 'vehicle' | 'driver' | 'hostess' | 'customer' | 'finance' | 'system';
  itemName: string; // 管理項目名
  description: string; // 説明
  lastUpdated: string; // 最終更新日
  updatedBy: string; // 更新者
  status: 'active' | 'inactive' | 'maintenance' | 'pending_approval';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string[]; // 担当者一覧
  relatedItems: string[]; // 関連項目
  notes?: string; // 備考
}

// 面接一覧データ
export interface InterviewList {
  id: string;
  interviewNumber: string; // 面接番号
  applicantInfo: {
    name: string;
    nameKana: string;
    age: number;
    phoneNumber: string;
    email?: string;
    address: string;
    experience: string; // 経験
    motivation: string; // 志望動機
  }; // 応募者情報
  position: 'hostess' | 'driver' | 'operator' | 'manager' | 'other';
  interviewSchedule: {
    date: string;
    time: string;
    location: string;
    interviewer: string[];
    estimatedDuration: number; // 予定時間（分）
  }; // 面接スケジュール
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  results?: {
    overallScore: number; // 総合評価（1-10）
    skillAssessment: {
      communication: number;
      appearance: number;
      attitude: number;
      experience: number;
      potential: number;
    }; // スキル評価
    interviewerComments: {
      interviewerId: string;
      interviewerName: string;
      comment: string;
      recommendation: 'hire' | 'reject' | 'consider';
    }[]; // 面接官コメント
    finalDecision: 'hired' | 'rejected' | 'pending' | 'waitlist';
    decisionDate?: string;
    decisionReason?: string;
  }; // 面接結果
  followUp: {
    nextSteps: string[];
    contactDate?: string;
    offerMade?: boolean;
    offerDetails?: {
      position: string;
      salary: number;
      startDate: string;
      conditions: string[];
    };
  }; // フォローアップ
  documents: {
    resumeSubmitted: boolean;
    idVerified: boolean;
    referencesChecked: boolean;
    backgroundCheckCompleted: boolean;
    medicalCheckCompleted: boolean;
  }; // 書類確認
}

// ホテルデータ
export interface Hotel {
  id: string;
  hotelNumber: string; // ホテル番号
  name: string; // ホテル名
  nameKana: string; // ホテル名（カナ）
  category: 'luxury' | 'business' | 'budget' | 'boutique' | 'resort';
  address: {
    zipCode: string;
    prefecture: string;
    city: string;
    street: string;
    building?: string;
  }; // 住所
  contactInfo: {
    phoneNumber: string;
    faxNumber?: string;
    email?: string;
    website?: string;
  }; // 連絡先
  businessInfo: {
    checkInTime: string;
    checkOutTime: string;
    totalRooms: number;
    availableRooms?: number;
    roomTypes: {
      type: string;
      count: number;
      basePrice: number;
    }[];
    amenities: string[];
    services: string[];
  }; // 営業情報
  contractInfo: {
    contractNumber?: string;
    contractDate?: string;
    contractType: 'partner' | 'preferred' | 'standard' | 'occasional';
    discountRate: number; // 割引率（%）
    paymentTerms: string;
    specialConditions: string[];
  }; // 契約情報
  usage: {
    totalBookings: number;
    totalRevenue: number;
    averageBookingValue: number;
    lastBookingDate?: string;
    frequentGuests: {
      customerId: string;
      customerName: string;
      bookingCount: number;
    }[];
  }; // 利用実績
  rating: {
    overallRating: number; // 総合評価（1-5）
    customerSatisfaction: number;
    serviceQuality: number;
    cleanliness: number;
    location: number;
    valueForMoney: number;
    reviewCount: number;
  }; // 評価
  status: 'active' | 'inactive' | 'temporarily_closed' | 'under_renovation';
  notes?: string; // 備考
}

// メディア管理データ
export interface MediaManagement {
  id: string;
  mediaId: string; // メディアID
  mediaName: string; // メディア名
  mediaType: 'website' | 'mobile_app' | 'social_media' | 'print' | 'radio' | 'tv' | 'outdoor' | 'other';
  platform?: string; // プラットフォーム（Facebook, Instagram等）
  contentInfo: {
    title: string;
    description: string;
    createdDate: string;
    createdBy: string;
    lastModified: string;
    modifiedBy: string;
    fileSize?: number; // ファイルサイズ（KB）
    fileFormat?: string; // ファイル形式
    tags: string[];
  }; // コンテンツ情報
  campaignInfo: {
    campaignId?: string;
    campaignName?: string;
    startDate?: string;
    endDate?: string;
    budget?: number;
    targetAudience: string;
    objectives: string[];
  }; // キャンペーン情報
  performance: {
    impressions: number; // 表示回数
    clicks: number; // クリック数
    conversions: number; // 成約数
    engagement: number; // エンゲージメント
    reach: number; // リーチ数
    ctr: number; // クリック率（%）
    conversionRate: number; // 成約率（%）
    cost: number; // コスト
    roi: number; // ROI（%）
  }; // パフォーマンス
  targetMetrics: {
    targetImpressions?: number;
    targetClicks?: number;
    targetConversions?: number;
    targetCtr?: number;
    targetRoi?: number;
  }; // 目標指標
  approval: {
    status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'published';
    reviewer?: string;
    reviewDate?: string;
    reviewComments?: string;
  }; // 承認状況
  distribution: {
    channels: string[]; // 配信チャネル
    schedule: {
      startDate: string;
      endDate: string;
      frequency: string;
      timeslots: string[];
    };
    regions: string[]; // 配信地域
  }; // 配信情報
  status: 'active' | 'inactive' | 'scheduled' | 'completed' | 'cancelled';
}

// 許可承認一覧データ
export interface UnlockApprovalList {
  id: string;
  requestNumber: string; // 申請番号
  requestType: 'access_permission' | 'data_modification' | 'system_configuration' | 'financial_transaction' | 'emergency_override' | 'other';
  requestorInfo: {
    employeeId: string;
    employeeName: string;
    position: string;
    department: string;
  }; // 申請者情報
  requestDetails: {
    title: string;
    description: string;
    reason: string;
    urgency: 'low' | 'medium' | 'high' | 'emergency';
    requestedAccess: string[];
    affectedSystems: string[];
    dataInvolved: string[];
    riskLevel: 'low' | 'medium' | 'high';
  }; // 申請詳細
  timeline: {
    requestDate: string;
    requestedStartDate: string;
    requestedEndDate?: string;
    actualStartDate?: string;
    actualEndDate?: string;
    expiryDate?: string;
  }; // タイムライン
  approvalWorkflow: {
    currentStep: number;
    totalSteps: number;
    steps: {
      stepNumber: number;
      approverPosition: string;
      approverName?: string;
      status: 'pending' | 'approved' | 'rejected' | 'skipped';
      approvalDate?: string;
      comments?: string;
      conditions?: string[];
    }[];
  }; // 承認ワークフロー
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'cancelled' | 'expired';
  finalDecision?: {
    decision: 'approved' | 'rejected';
    finalApprover: string;
    decisionDate: string;
    conditions: string[];
    expiryDate?: string;
    reason?: string;
  }; // 最終決定
  auditTrail: {
    timestamp: string;
    action: string;
    performedBy: string;
    details: string;
  }[]; // 監査ログ
  relatedRequests: string[]; // 関連申請
}

