'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronLeft, ChevronRight, Search, Calendar, Users, FileText, Calculator, BookOpen } from "lucide-react";
import type { EmployeeWeeklyShift } from '@/types/employee';
import { sampleEmployeeWeeklyShifts } from '@/data/employeeSampleData';

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

// タブのタイプ定義
type TabType = 'weekly_schedule' | 'attendance_registration' | 'shift_print' | 'registration_list' | 'monthly_summary';

export default function EmployeeSchedule() {
  const router = useRouter();
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('weekly_schedule');
  const [shifts] = useState<EmployeeWeeklyShift[]>(sampleEmployeeWeeklyShifts);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setWeekDates(getCurrentWeekDates(currentWeekStart));
  }, [currentWeekStart]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(new Date());
  };

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  };

  const getDayName = (date: Date) => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  };


  const filteredShifts = shifts.filter(shift =>
    shift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shift.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shift.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabConfig = [
    { key: 'weekly_schedule', label: '従業員週間出勤予定', icon: Calendar },
    { key: 'attendance_registration', label: '出勤表登録', icon: Users },
    { key: 'shift_print', label: 'シフト表印刷', icon: FileText },
    { key: 'registration_list', label: '登録情報一覧', icon: BookOpen },
    { key: 'monthly_summary', label: '締め・月別集計', icon: Calculator }
  ];

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
              <h1 className="text-xl font-bold">従業員週間出勤予定</h1>

              <div className="flex items-center gap-4">
                {/* 週移動ボタン */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateWeek('prev')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    前週
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToCurrentWeek}
                  >
                    今週
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateWeek('next')}
                  >
                    翌週
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* 週表示 */}
                <div className="text-sm font-semibold">
                  {weekDates.length > 0 && `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}`}
                </div>

                {/* 検索 */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="従業員名・番号で検索"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48"
                  />
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* タブ */}
            <div className="flex items-center gap-2 mt-4">
              {tabConfig.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.key}
                    variant={activeTab === tab.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab(tab.key as TabType)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* メインコンテンツ */}
      <div className="px-4">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-2 py-2 w-16 sticky left-0 bg-gray-200">No</th>
                    <th className="border border-gray-300 px-2 py-2 w-20 sticky left-16 bg-gray-200">従業員No</th>
                    <th className="border border-gray-300 px-2 py-2 w-24 sticky left-36 bg-gray-200">氏名</th>
                    <th className="border border-gray-300 px-2 py-2 w-20 sticky left-60 bg-gray-200">部署</th>
                    <th className="border border-gray-300 px-2 py-2 w-20 sticky left-80 bg-gray-200">役職</th>
                    {weekDates.map((date, index) => (
                      <th key={index} className="border border-gray-300 px-2 py-2 w-32">
                        <div className="text-center">
                          <div>{formatDate(date)} {getDayName(date)}</div>
                          <div className="text-xs text-gray-500">時間</div>
                        </div>
                      </th>
                    ))}
                    <th className="border border-gray-300 px-2 py-2 w-24">週間統計</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShifts.map((shift, index) => (
                    <tr key={shift.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-2 text-center sticky left-0 bg-white">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center sticky left-16 bg-white">
                        {shift.employeeNumber}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sticky left-36 bg-white">
                        <div className="font-semibold">{shift.name}</div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sticky left-60 bg-white">
                        {shift.department}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sticky left-80 bg-white">
                        {shift.position}
                      </td>
                      {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const).map((dayKey, dayIndex) => {
                        const daySchedule = shift.weeklySchedule[dayKey];

                        return (
                          <td key={dayIndex} className="border border-gray-300 px-1 py-1">
                            {daySchedule.isWorkDay ? (
                              <div className="space-y-1">
                                <div className="text-xs p-1 rounded text-center bg-blue-100 text-blue-800">
                                  <div className="font-semibold">
                                    {daySchedule.startTime} - {daySchedule.endTime}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <div className="text-xs p-2 rounded bg-gray-100 text-gray-600">
                                  休み
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        <div className="space-y-1">
                          <div className="text-xs">
                            <div>勤務日: {shift.weeklyStats.totalWorkDays}日</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* フッター - 凡例 */}
      <div className="p-4 mt-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
          <span className="font-semibold">表示:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
            <span>出勤</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
            <span>休み</span>
          </div>
        </div>

      </div>
    </div>
  );
}
