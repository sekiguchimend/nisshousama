'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react";
import SalesReport from '@/components/daily-report/SalesReport';
import { salesReportSampleDataList } from '@/data/salesReportSampleData';

function TestDaily() {
  const router = useRouter();

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

      {/* ページタイトル */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              売上レポート テストページ
            </CardTitle>
            <p className="text-gray-600">
              複数店舗の売上レポートサンプルデータを表示しています
            </p>
          </CardHeader>
        </Card>
      </div>

      {/* 売上レポート一覧 */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            {/* スクロール可能なコンテナ */}
            <div className="h-[600px] w-[782px] overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-4">
              <div className="space-y-1">
                {salesReportSampleDataList.map((data, index) => (
                  <div key={index} className="">
                    {/* 売上レポートコンポーネント */}
                    <div className="flex justify-center">
                      <SalesReport data={data} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* フッター */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-gray-500">
              <p className="text-sm">
                合計 {salesReportSampleDataList.length} 店舗のサンプルデータを表示しています
              </p>
              <p className="text-xs text-gray-400 mt-2">
                このページはテスト用のサンプルデータを使用しています
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TestDaily;