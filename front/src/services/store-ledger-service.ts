// 店舗台帳データ管理サービス
// APIとの連携を想定したインターフェースを提供

import {
  StoreBasicInfo,
  GMDivision,
  CourseFee,
  StaffComposition,
  SalesData
  // StoreLedgerTab - 将来の実装で使用予定
} from '@/types';

import {
  storeBasicInfoSampleData,
  gmDivisionSampleData,
  courseFeeSampleData,
  staffCompositionSampleData,
  salesDataSampleData
} from '@/data/storeLedgerSampleData';

import { basicTagSampleData } from '@/data/basicTagSampleData';
import { BasicTag } from '@/types/basic-tag';

// 店舗台帳データサービスのインターフェース
export interface StoreLedgerService {
  // 店舗基本情報
  getStoreBasicInfo(): Promise<StoreBasicInfo[]>;
  getStoreBasicInfoById(storeId: string): Promise<StoreBasicInfo | null>;
  getStoreBasicInfoByName(storeName: string): Promise<StoreBasicInfo | null>;
  
  // 基本タグ
  getBasicTags(): Promise<BasicTag[]>;
  getBasicTagByStoreName(storeName: string): Promise<BasicTag | null>;
  
  // GM区分
  getGMDivisions(): Promise<GMDivision[]>;
  getGMDivisionsByStoreId(storeId: string): Promise<GMDivision[]>;
  
  // コース料金
  getCourseFees(): Promise<CourseFee[]>;
  getCourseFeesByStoreId(storeId: string): Promise<CourseFee[]>;
  getCourseFeesByType(storeId: string, type: 'A' | 'B'): Promise<CourseFee[]>;
  createCourseFee(courseFee: Omit<CourseFee, 'id'>): Promise<CourseFee>;
  updateCourseFee(id: string, courseFee: Partial<CourseFee>): Promise<CourseFee>;
  deleteCourseFee(id: string): Promise<boolean>;
  
  // 人事構成
  getStaffCompositions(): Promise<StaffComposition[]>;
  getStaffCompositionsByStoreId(storeId: string): Promise<StaffComposition[]>;
  
  // 売上データ
  getSalesData(): Promise<SalesData[]>;
  getSalesDataByStoreId(storeId: string): Promise<SalesData[]>;
}

// サンプルデータを使用した実装
class SampleStoreLedgerService implements StoreLedgerService {
  // 店舗基本情報
  async getStoreBasicInfo(): Promise<StoreBasicInfo[]> {
    // 実際のAPIでは fetch() を使用
    return Promise.resolve([...storeBasicInfoSampleData]);
  }

  async getStoreBasicInfoById(storeId: string): Promise<StoreBasicInfo | null> {
    const store = storeBasicInfoSampleData.find(s => s.id === storeId);
    return Promise.resolve(store || null);
  }

  async getStoreBasicInfoByName(storeName: string): Promise<StoreBasicInfo | null> {
    const store = storeBasicInfoSampleData.find(s => s.storeName === storeName);
    return Promise.resolve(store || null);
  }

  // 基本タグ
  async getBasicTags(): Promise<BasicTag[]> {
    return Promise.resolve([...basicTagSampleData]);
  }

  async getBasicTagByStoreName(storeName: string): Promise<BasicTag | null> {
    const tag = basicTagSampleData.find(tag => tag.storeName === storeName);
    return Promise.resolve(tag || null);
  }

  // GM区分
  async getGMDivisions(): Promise<GMDivision[]> {
    return Promise.resolve([...gmDivisionSampleData]);
  }

  async getGMDivisionsByStoreId(storeId: string): Promise<GMDivision[]> {
    const divisions = gmDivisionSampleData.filter(gm => gm.storeId === storeId);
    return Promise.resolve(divisions);
  }

  // コース料金
  async getCourseFees(): Promise<CourseFee[]> {
    return Promise.resolve([...courseFeeSampleData]);
  }

  async getCourseFeesByStoreId(storeId: string): Promise<CourseFee[]> {
    const courses = courseFeeSampleData.filter(course => course.storeId === storeId);
    return Promise.resolve(courses);
  }

  async getCourseFeesByType(storeId: string, type: 'A' | 'B'): Promise<CourseFee[]> {
    const courses = courseFeeSampleData.filter(
      course => course.storeId === storeId && course.type === type
    );
    return Promise.resolve(courses);
  }

  async createCourseFee(courseFee: Omit<CourseFee, 'id'>): Promise<CourseFee> {
    const newCourseFee: CourseFee = {
      ...courseFee,
      id: `cf_new_${Date.now()}`
    };
    
    // 実際のAPIでは POST リクエスト
    courseFeeSampleData.push(newCourseFee);
    return Promise.resolve(newCourseFee);
  }

  async updateCourseFee(id: string, updates: Partial<CourseFee>): Promise<CourseFee> {
    const index = courseFeeSampleData.findIndex(course => course.id === id);
    if (index === -1) {
      throw new Error(`Course fee with id ${id} not found`);
    }

    const updatedCourseFee = { ...courseFeeSampleData[index], ...updates };
    courseFeeSampleData[index] = updatedCourseFee;
    
    // 実際のAPIでは PUT/PATCH リクエスト
    return Promise.resolve(updatedCourseFee);
  }

  async deleteCourseFee(id: string): Promise<boolean> {
    const index = courseFeeSampleData.findIndex(course => course.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }

    // 実際のAPIでは DELETE リクエスト
    courseFeeSampleData.splice(index, 1);
    return Promise.resolve(true);
  }

  // 人事構成
  async getStaffCompositions(): Promise<StaffComposition[]> {
    return Promise.resolve([...staffCompositionSampleData]);
  }

  async getStaffCompositionsByStoreId(storeId: string): Promise<StaffComposition[]> {
    const staff = staffCompositionSampleData.filter(s => s.storeId === storeId);
    return Promise.resolve(staff);
  }

  // 売上データ
  async getSalesData(): Promise<SalesData[]> {
    return Promise.resolve([...salesDataSampleData]);
  }

  async getSalesDataByStoreId(storeId: string): Promise<SalesData[]> {
    const sales = salesDataSampleData.filter(s => s.storeId === storeId);
    return Promise.resolve(sales);
  }
}

// サービスインスタンスをエクスポート
export const storeLedgerService: StoreLedgerService = new SampleStoreLedgerService();

// 実際のAPIサービスに切り替える場合は以下のようなクラスを作成
/*
class ApiStoreLedgerService implements StoreLedgerService {
  private baseUrl = '/api/store-ledger';

  async getStoreBasicInfo(): Promise<StoreBasicInfo[]> {
    const response = await fetch(`${this.baseUrl}/stores`);
    if (!response.ok) throw new Error('Failed to fetch store basic info');
    return response.json();
  }

  async getStoreBasicInfoById(storeId: string): Promise<StoreBasicInfo | null> {
    const response = await fetch(`${this.baseUrl}/stores/${storeId}`);
    if (!response.ok) return null;
    return response.json();
  }

  // ... その他のメソッドも同様に実装
}

// APIサービスを使用する場合
// export const storeLedgerService: StoreLedgerService = new ApiStoreLedgerService();
*/
