'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, List, CreditCard, Store, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Plus, Trash2, Search, User } from "lucide-react";

interface DailyReportHeaderProps {
  currentDate?: Date;
  closingDateTime?: Date | string;
  manager?: string;
  serialNumber?: string | number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  onMenuClick?: () => void;
  onListClick?: () => void;
  onCreditCheckClick?: () => void;
  onStoreCardSummaryClick?: () => void;
  onAClick?: () => void;
  onBClick?: () => void;
  onWeekBackClick?: () => void;
  onPreviousDayClick?: () => void;
  onNextDayClick?: () => void;
  onWeekForwardClick?: () => void;
  onNewClick?: () => void;
  onDeleteClick?: () => void;
  onSearchClick?: () => void;
  onOwnerClick?: () => void;
}

export default function DailyReportHeader({
  currentDate = new Date(),
  closingDateTime,
  manager = "未設定",
  serialNumber = "001",
  createdAt,
  updatedAt,
  onMenuClick,
  onListClick,
  onCreditCheckClick,
  onStoreCardSummaryClick,
  onAClick,
  onBClick,
  onWeekBackClick,
  onPreviousDayClick,
  onNextDayClick,
  onWeekForwardClick,
  onNewClick,
  onDeleteClick,
  onSearchClick,
  onOwnerClick
}: DailyReportHeaderProps) {
  
  const formatDate = (date: Date): string => {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return '日付取得エラー';
    }
  };

  const formatClosingDateTime = (dateTime: Date | string | undefined): string => {
    if (!dateTime) return "未設定";
    
    try {
      const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
      if (isNaN(date.getTime())) return "不正な日時";
      
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      
      return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Closing date formatting error:', error);
      return "日時エラー";
    }
  };

  const formatDateTime = (dateTime: Date | string | undefined): string => {
    if (!dateTime) return "未設定";
    
    try {
      const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
      if (isNaN(date.getTime())) return "不正な日時";
      
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      
      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('DateTime formatting error:', error);
      return "日時エラー";
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* 第1行: メインボタン群 */}
      <div className="flex items-center gap-3 p-4 pb-2">
        {/* 主要ボタン群 */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={onMenuClick}
          className="flex items-center gap-2"
        >
          <Menu className="w-4 h-4" />
          MENU
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onListClick}
          className="flex items-center gap-2"
        >
          <List className="w-4 h-4" />
          リスト
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCreditCheckClick}
          className="flex items-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          クレジット確認
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onStoreCardSummaryClick}
          className="flex items-center gap-2"
        >
          <Store className="w-4 h-4" />
          店別カード集計
        </Button>

        {/* CRUD・オーナーボタン群 */}
        <div className="flex items-center gap-2 ml-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onNewClick}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            新規
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onDeleteClick}
            className="flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            削除
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSearchClick}
            className="flex items-center gap-1"
          >
            <Search className="w-4 h-4" />
            検索
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onOwnerClick}
            className="flex items-center gap-1"
          >
            <User className="w-4 h-4" />
            オーナー
          </Button>
        </div>
      </div>

      {/* 第2行: 日付ナビゲーション・通し番号・日時情報 */}
      <div className="flex items-center gap-3 px-4 pb-4">
        {/* 通し番号 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">No.</span>
          <span className="text-sm text-gray-800 bg-blue-50 px-3 py-1 rounded border font-mono">
            {serialNumber}
          </span>
        </div>
      
        {/* 日付ナビゲーション */}
        <div className="flex items-center gap-2">
          {/* 1週間前 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onWeekBackClick}
            className="p-2"
            title="1週間前"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          
          {/* 前日 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousDayClick}
            className="p-2"
            title="前日"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {/* 日付表示 */}
          <div className="px-4 py-2 bg-gray-50 rounded-md text-sm font-medium text-gray-700 min-w-[140px] text-center">
            {formatDate(currentDate)}
          </div>
          
          {/* 翌日 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onNextDayClick}
            className="p-2"
            title="翌日"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          {/* 1週間後 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onWeekForwardClick}
            className="p-2"
            title="1週間後"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
        
        {/* A・Bボタン */}
        <div className="flex items-center gap-2 ml-4">
          <Button 
            variant="default" 
            size="sm"
            onClick={onAClick}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[40px]"
          >
            A
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={onBClick}
            className="bg-green-600 hover:bg-green-700 text-white min-w-[40px]"
          >
            B
          </Button>
        </div>

        {/* 作成・更新日時フィールド */}
        <div className="flex items-center gap-4 ml-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium">作成:</span>
            <span className="text-xs text-gray-800 bg-green-50 px-2 py-1 rounded border">
              {formatDateTime(createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium">更新:</span>
            <span className="text-xs text-gray-800 bg-yellow-50 px-2 py-1 rounded border">
              {formatDateTime(updatedAt)}
            </span>
          </div>
        </div>

        {/* 締め日時・責任者フィールド */}
        <div className="flex flex-col gap-1 ml-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium">締め日時:</span>
            <span className="text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded border">
              {formatClosingDateTime(closingDateTime)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium">責任者:</span>
            <span className="text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded border min-w-[80px]">
              {manager}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
