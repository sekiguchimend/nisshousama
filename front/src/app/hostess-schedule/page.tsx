'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, FileText, Menu } from "lucide-react";
import type { HostessScheduleData } from '@/types/hostess';

// 今週の日付を取得する関数
const getCurrentWeekDates = (baseDate: Date = new Date()) => {
  const today = new Date(baseDate);
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Monday start
  
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// サンプルホステスデータ
const sampleHostesses: HostessScheduleData[] = [
  {
    id: "1",
    name: "しょう",
    category: "内子系",
    schedules: {
      "2025-01-27": [{ startTime: "19:00", endTime: "02:00", status: "confirmed", workType: "normal" }],
      "2025-01-28": [{ startTime: "19:00", endTime: "02:00", status: "confirmed", workType: "normal" }]
    },
    weeklyStats: { totalHours: 14, totalDays: 2, earnings: 70000 }
  },
  {
    id: "2", 
    name: "美咲",
    category: "内子系",
    schedules: {
      "2025-01-27": [{ startTime: "19:00", endTime: "02:00", status: "confirmed", workType: "normal" }]
    },
    weeklyStats: { totalHours: 7, totalDays: 1, earnings: 35000 }
  },
  {
    id: "3",
    name: "さくら",
    category: "内子系",
    schedules: {},
    weeklyStats: { totalHours: 0, totalDays: 0, earnings: 0 }
  },
  {
    id: "4",
    name: "新人A",
    category: "内子系",
    schedules: {
      "2025-01-28": [{ startTime: "21:00", endTime: "03:00", status: "scheduled", workType: "normal" }],
      "2025-01-29": [{ startTime: "21:00", endTime: "03:00", status: "scheduled", workType: "normal" }]
    },
    weeklyStats: { totalHours: 12, totalDays: 2, earnings: 48000 }
  },
  {
    id: "5",
    name: "新人B",
    category: "内妻系",
    schedules: {
      "2025-01-27": [{ startTime: "15:00", endTime: "24:00", status: "confirmed", workType: "normal" }]
    },
    weeklyStats: { totalHours: 9, totalDays: 1, earnings: 36000 }
  }
];

export default function HostessSchedule() {
  const router = useRouter();
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    setWeekDates(getCurrentWeekDates(currentWeekStart));
  }, [currentWeekStart]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  };

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayName = (date: Date) => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  };

  const getScheduleColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-200 border-blue-400';
      case 'scheduled': return 'bg-yellow-200 border-yellow-400';
      case 'cancelled': return 'bg-red-200 border-red-400';
      default: return 'bg-gray-200 border-gray-400';
    }
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
              <h1 className="text-xl font-bold">点呼業務管理</h1>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-purple-100">
                  今週
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-100">
                  前週
                </Button>
                <Button variant="outline" size="sm" className="bg-green-100">
                  来週
                </Button>
                <Button variant="outline" size="sm" className="bg-yellow-100">
                  週間シート
                </Button>
                <div className="text-sm bg-gray-100 px-3 py-1 rounded">
                  ■営業人員シフト日付出勤
                </div>
                <Button variant="outline" size="sm">
                  クリア
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-100">
                  担当者簡易印刷
                </Button>
                <Button variant="outline" size="sm">
                  印刷
                </Button>
                <Button variant="outline" size="sm">
                  MENU
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateWeek('prev')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-semibold">
                  {weekDates.length > 0 && `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}`}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateWeek('next')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* メインスケジュールテーブル */}
      <div className="px-4">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-2 py-2 w-24 sticky left-0 bg-gray-200">番号時間</th>
                    <th className="border border-gray-300 px-2 py-2 w-24 sticky left-24 bg-gray-200">区分</th>
                    <th className="border border-gray-300 px-2 py-2 w-32 sticky left-48 bg-gray-200">姓名</th>
                    <th className="border border-gray-300 px-2 py-2 w-12">HM</th>
                    {weekDates.map((date, index) => (
                      <th key={index} className="border border-gray-300 px-2 py-2 w-32">
                        <div className="text-center">
                          <div>{formatDate(date)} {getDayName(date)}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleHostesses.map((hostess, index) => (
                    <tr key={hostess.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-2 text-center sticky left-0 bg-white">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center sticky left-24 bg-white">
                        <span className={`px-2 py-1 rounded text-xs ${
          hostess.category === '内子系' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
        }`}>
          {hostess.category}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sticky left-48 bg-white">
                        <div className="font-semibold">{hostess.name}</div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        {hostess.category}
                      </td>
                      {weekDates.map((date, dateIndex) => {
                        const dateKey = formatDateKey(date);
                        const daySchedules = hostess.schedules[dateKey] || [];
                        
                        return (
                          <td key={dateIndex} className="border border-gray-300 px-1 py-1">
                            <div className="space-y-1">
                              {daySchedules.map((schedule, scheduleIndex) => (
                                <div 
                                  key={scheduleIndex}
                                  className={`text-xs p-1 rounded border ${getScheduleColor(schedule.status)}`}
                                >
                                  <div className="font-semibold">
                                    {schedule.startTime}-{schedule.endTime}
                                  </div>
                                  {schedule.notes && (
                                    <div className="text-gray-600">{schedule.notes}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* フッター */}
      <div className="p-4 mt-4">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
            <span>確定済み</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
            <span>予定</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
            <span>キャンセル</span>
          </div>
        </div>
      </div>
    </div>
  );
}
