'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, BarChart3 } from "lucide-react";
import DailyReportHeader from "@/components/daily-report/DailyReportHeader";
import SalesReport from "@/components/daily-report/SalesReport";
import { salesReportSampleDataList } from "@/data/salesReportSampleData";
import MoneyInout from "@/components/daily-report/MoneyInout";
import { moneyInoutSampleList } from "@/data/moneyInoutSampleData";

export default function DailyReport() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMenuClick = () => {
    console.log('MENUボタンがクリックされました');
  };

  const handleListClick = () => {
    console.log('リストボタンがクリックされました');
  };

  const handleCreditCheckClick = () => {
    console.log('クレジット確認ボタンがクリックされました');
  };

  const handleStoreCardSummaryClick = () => {
    console.log('店別カード集計ボタンがクリックされました');
  };

  const handleAClick = () => {
    console.log('Aボタンがクリックされました');
  };

  const handleBClick = () => {
    console.log('Bボタンがクリックされました');
  };

  // 日付ナビゲーション関数
  const handleWeekBackClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    console.log('1週間前:', newDate.toLocaleDateString());
  };

  const handlePreviousDayClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    console.log('前日:', newDate.toLocaleDateString());
  };

  const handleNextDayClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    console.log('翌日:', newDate.toLocaleDateString());
  };

  const handleWeekForwardClick = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    console.log('1週間後:', newDate.toLocaleDateString());
  };

  // CRUD・オーナーボタンハンドラー
  const handleNewClick = () => {
    console.log('新規ボタンがクリックされました');
  };

  const handleDeleteClick = () => {
    console.log('削除ボタンがクリックされました');
  };

  const handleSearchClick = () => {
    console.log('検索ボタンがクリックされました');
  };

  const handleOwnerClick = () => {
    console.log('オーナーボタンがクリックされました');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 戻るボタン */}
      <div className="p-4 pb-0">
        <Button 
          variant="outline" 
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          ダッシュボードに戻る
        </Button>
      </div>

      {/* 日報ヘッダー */}
      <DailyReportHeader
        currentDate={currentDate}
        closingDateTime={new Date(Date.now() + 8 * 60 * 60 * 1000)} // 8時間後
        manager="田中太郎"
        serialNumber="DRP-20250917-001"
        createdAt={new Date(Date.now() - 3 * 60 * 60 * 1000)} // 3時間前
        updatedAt={new Date(Date.now() - 30 * 60 * 1000)} // 30分前
        onMenuClick={handleMenuClick}
        onListClick={handleListClick}
        onCreditCheckClick={handleCreditCheckClick}
        onStoreCardSummaryClick={handleStoreCardSummaryClick}
        onAClick={handleAClick}
        onBClick={handleBClick}
        onWeekBackClick={handleWeekBackClick}
        onPreviousDayClick={handlePreviousDayClick}
        onNextDayClick={handleNextDayClick}
        onWeekForwardClick={handleWeekForwardClick}
        onNewClick={handleNewClick}
        onDeleteClick={handleDeleteClick}
        onSearchClick={handleSearchClick}
        onOwnerClick={handleOwnerClick}
      />

      {/* メインコンテンツ */}
      <div className="p-4">
        <div className="flex gap-6">
          {/* 左側: 売上レポート一覧 */}
          <Card className="flex-shrink-0">
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                売上レポート一覧
              </h3>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[600px] w-[782px] overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-4">
                <div className="space-y-1">
                  {salesReportSampleDataList.map((data, index) => (
                    <div key={index} className="flex justify-start">
                      <SalesReport data={data} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardContent className="p-4">
              <div className="h-[100px] w-[782px] overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-4">
                <div className="space-y-1">
                  {moneyInoutSampleList.map((data, index) => (
                    <div key={index} className="flex justify-start">
                      <MoneyInout data={data} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 右側: 集計結果とリスト */}
          <div className="flex-1 space-y-6">
            {/* 集計結果カード */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">集計結果</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* 左列 */}
                  <div className="space-y-2">
                    <div className="bg-blue-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">現金収入計</span>
                      <span className="text-lg font-bold text-blue-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-green-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">店舗売上計カード</span>
                      <span className="text-lg font-bold text-green-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-purple-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">売上計</span>
                      <span className="text-lg font-bold text-purple-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-indigo-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">店舗売上計現金</span>
                      <span className="text-lg font-bold text-indigo-700 font-mono">¥0</span>
                    </div>
                  </div>

                  {/* 右列 */}
                  <div className="space-y-2">
                    <div className="bg-orange-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">ドライバ回収額計</span>
                      <span className="text-lg font-bold text-orange-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-pink-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">ホステス支払計</span>
                      <span className="text-lg font-bold text-pink-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-cyan-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">入金計</span>
                      <span className="text-lg font-bold text-cyan-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-red-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">出金計</span>
                      <span className="text-lg font-bold text-red-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-yellow-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">収支計</span>
                      <span className="text-lg font-bold text-yellow-700 font-mono">¥0</span>
                    </div>
                    <div className="bg-gray-50 px-3 py-2 rounded-lg border flex justify-between items-center">
                      <span className="text-sm text-gray-600">現金残高</span>
                      <span className="text-lg font-bold text-gray-700 font-mono">¥0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 入金・出金リスト */}
            <div className="grid grid-cols-2 gap-4">
              {/* 入金リスト（赤） */}
              <Card>
                <CardHeader className="bg-red-50">
                  <h4 className="text-md font-semibold text-red-700">入金一覧</h4>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] overflow-y-auto">
                    <div className="p-4 text-center text-gray-500">
                      <div className="text-sm">入金データなし</div>
                      <div className="text-xs text-gray-400 mt-1">
                        ここに入金情報が表示されます
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 出金リスト（青） */}
              <Card>
                <CardHeader className="bg-blue-50">
                  <h4 className="text-md font-semibold text-blue-700">出金一覧</h4>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] overflow-y-auto">
                    <div className="p-4 text-center text-gray-500">
                      <div className="text-sm">出金データなし</div>
                      <div className="text-xs text-gray-400 mt-1">
                        ここに出金情報が表示されます
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
