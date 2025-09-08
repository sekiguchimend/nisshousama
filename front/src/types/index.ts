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
