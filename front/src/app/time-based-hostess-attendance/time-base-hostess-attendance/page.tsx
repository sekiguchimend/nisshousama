'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, Users } from "lucide-react";
import type { TimeBasedHostessAttendance } from '@/types';
import { hostessAttendanceStatusLabels, hostessAttendanceStatusColors } from '@/types';
import {
  timeBasedHostessAttendanceSampleData,
  timeSlots,
  getTimeLabel,
  getTimePosition,
  getDurationWidth
} from '@/data/timeBasedHostessAttendanceSampleData';

export default function TimeBaseHostessAttendance() {
  const router = useRouter();
  const [hostesses, setHostesses] = useState<TimeBasedHostessAttendance[]>(timeBasedHostessAttendanceSampleData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025-01-27');

  const filteredHostesses = hostesses.filter(hostess =>
    hostess.hostessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hostess.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 戻るボタン */}
      <div className="p-4">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          ダッシュボードに戻る
        </Button>
      </div>

      {/* ヘッダー */}
      <div className="px-4 mb-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">時間別ホステス出勤管理</h1>

              <div className="flex items-center gap-4">
                {/* 日付選択 */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-semibold">{formatDate(selectedDate)}</span>
                </div>

                {/* 検索 */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="ホステス名・場所で検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* メインコンテンツ */}
      <div className="px-4">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                {/* 時間軸ヘッダー */}
                <div className="flex bg-gray-200 border-b border-gray-300">
                  {/* 左側: ホステス情報用スペース */}
                  <div className="w-64 flex-shrink-0 border-r border-gray-300">
                    <div className="px-4 py-3 font-semibold text-sm">
                      ホステス / ステータス
                    </div>
                  </div>

                  {/* 右側: 時間軸 */}
                  <div className="flex-1 relative">
                    <div className="px-4 py-3 font-semibold text-sm text-center">
                      時間軸（{timeSlots[0]}時 ～ 翌{timeSlots[timeSlots.length - 1]}時）
                    </div>

                    {/* 時間ラベル */}
                    <div className="flex relative h-8 border-t border-gray-300">
                      {timeSlots.map((hour, index) => (
                        <div
                          key={hour}
                          className="flex-1 text-center text-xs py-1 border-r border-gray-200 last:border-r-0"
                          style={{
                            width: index === timeSlots.length - 1 ? 'auto' : `${100 / timeSlots.length}%`
                          }}
                        >
                          {getTimeLabel(hour)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ホステス行 */}
                {filteredHostesses.map((hostess, index) => {
                  const barLeft = getTimePosition(hostess.startTime, 736); // 800px - 64px (左側スペース)
                  const barWidth = getDurationWidth(hostess.startTime, hostess.endTime, 736);

                  return (
                    <div key={hostess.id} className={`flex border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      {/* 左側: ホステス情報 */}
                      <div className="w-64 flex-shrink-0 border-r border-gray-300">
                        <div className="px-4 py-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-sm">{hostess.hostessName}</div>
                              <div className="text-xs text-gray-600">{hostess.location}</div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs ${hostessAttendanceStatusColors[hostess.status]}`}>
                              {hostessAttendanceStatusLabels[hostess.status]}
                            </div>
                          </div>
                          {hostess.notes && (
                            <div className="text-xs text-gray-500 mt-1">
                              {hostess.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 右側: 時間軸グラフ */}
                      <div className="flex-1 relative h-16">
                        {/* 時間軸の背景グリッド */}
                        <div className="absolute inset-0 flex">
                          {timeSlots.map((hour, hourIndex) => (
                            <div
                              key={hour}
                              className="flex-1 border-r border-gray-200"
                              style={{
                                width: hourIndex === timeSlots.length - 1 ? 'auto' : `${100 / timeSlots.length}%`
                              }}
                            />
                          ))}
                        </div>

                        {/* 勤務時間バー */}
                        <div
                          className="absolute top-2 bottom-2 bg-purple-500 rounded opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                          style={{
                            left: `${barLeft}px`,
                            width: `${Math.max(barWidth, 20)}px`, // 最小幅を20pxに設定
                          }}
                          title={`${hostess.hostessName}: ${hostess.startTime} - ${hostess.endTime}`}
                        >
                          <div className="h-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {hostess.startTime} - {hostess.endTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* フッター - 凡例 */}
      <div className="p-4 mt-4">
        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold">凡例:</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500"></div>
            <span>勤務時間</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
            <span>予定</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
            <span>確定</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
            <span>勤務中</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-100 border border-orange-300"></div>
            <span>休憩中</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
            <span>終了</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-600 mt-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">総件数:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {filteredHostesses.length}件
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">勤務中:</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              {filteredHostesses.filter(h => h.status === 'working').length}件
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">確定:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {filteredHostesses.filter(h => h.status === 'confirmed').length}件
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
