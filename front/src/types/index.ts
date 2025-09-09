// 共通型定義ファイル
// プロジェクト全体で使用される型を定義

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ErrorResponse {
  code: string;
  message: string;
  details?: unknown;
}

// 各カテゴリーの型定義をエクスポート
export * from './accounting';
export * from './customer';
export * from './hostess';
export * from './employee';
export * from './dispatch-extended';
export * from './reports';
export * from './management';
export * from './vehicle';
export * from './cast';
export * from './dispatch';
