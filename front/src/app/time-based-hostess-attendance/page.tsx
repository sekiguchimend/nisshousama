'use client';

// ハイドレーションエラーあり　要修正

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, Users, Plus } from "lucide-react";
import { timeBasedHostessAttendanceSampleData } from '@/data/timeBasedHostessAttendanceSampleData';

// --- Types ---
export type HostessAttendanceTask = {
  id: string;
  hostessId: string;
  hostessName: string;
  start: string; // ISO string
  end: string; // ISO string
  location?: string;
  notes?: string;
};

// --- Data Conversion ---
function convertToGanttTasks(attendanceData: any[]): HostessAttendanceTask[] {
  return attendanceData.map(item => {
    const startDate = new Date();
    const endDate = new Date();
    
    // 時間文字列をパース
    const [startHour, startMin] = item.startTime.split(':').map(Number);
    const [endHour, endMin] = item.endTime.split(':').map(Number);
    
    // 同日の場合と翌日にまたがる場合を考慮
    startDate.setHours(startHour, startMin, 0, 0);
    if (endHour < startHour) {
      // 翌日にまたがる場合
      endDate.setDate(endDate.getDate() + 1);
    }
    endDate.setHours(endHour, endMin, 0, 0);
    
    return {
      id: item.id,
      hostessId: item.hostessId,
      hostessName: item.hostessName,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      status: item.status,
      location: item.location,
      notes: item.notes,
    };
  });
}

// --- Helper Functions ---
const MS_PER_MIN = 60 * 1000;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function isoToMinutes(iso: string) {
  return Math.floor(new Date(iso).getTime() / MS_PER_MIN);
}

function minutesToIso(mins: number) {
  return new Date(mins * MS_PER_MIN).toISOString();
}

function snapToFifteen(mins: number) {
  return Math.round(mins / 15) * 15;
}

function formatHourLabel(minutes: number) {
  const d = new Date(minutes * MS_PER_MIN);
  const hh = String(d.getHours()).padStart(2, "0");
  return `${hh}:00`;
}

function formatTimeRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

// --- Main Component ---
export default function TimeBasedHostessAttendance() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(1200);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025-01-27');
  
  // データの変換と状態管理
  const [tasks, setTasks] = useState<HostessAttendanceTask[]>(
    convertToGanttTasks(timeBasedHostessAttendanceSampleData)
  );
  
  const [active, setActive] = useState<{ 
    id: string; 
    mode: "drag" | "resize-left" | "resize-right" 
  } | null>(null);

  // 検索フィルター
  const filteredTasks = tasks.filter(task =>
    task.hostessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 幅の監視
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setWidth(el.clientWidth);
    });
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // 時間範囲の設定（6時〜翌5時）
  const today = new Date();
  const rangeStart = new Date(today);
  rangeStart.setHours(6, 0, 0, 0);
  const rangeEnd = new Date(today);
  rangeEnd.setDate(rangeEnd.getDate() + 1);
  rangeEnd.setHours(5, 0, 0, 0);

  const startM = isoToMinutes(rangeStart.toISOString());
  const endM = isoToMinutes(rangeEnd.toISOString());
  const totalMinutes = Math.max(1, endM - startM);
  const pxPerMin = width / totalMinutes;

  const minutesToX = (m: number) => (m - startM) * pxPerMin;

  // ドラッグ&ドロップの状態管理
  const pointerState = useRef<{
    originX: number;
    taskId: string;
    initialStart: number;
    initialEnd: number;
    mode: "drag" | "resize-left" | "resize-right";
  } | null>(null);

  function beginPointer(e: React.PointerEvent, task: HostessAttendanceTask, mode: "drag" | "resize-left" | "resize-right") {
    (e.target as Element).setPointerCapture(e.pointerId);
    e.stopPropagation();
    
    const px = e.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0);
    const initStart = isoToMinutes(task.start);
    const initEnd = isoToMinutes(task.end);
    
    pointerState.current = {
      originX: px,
      taskId: task.id,
      initialStart: initStart,
      initialEnd: initEnd,
      mode,
    };
    setActive({ id: task.id, mode });
  }

  /* function movePointer(e: PointerEvent) {
    if (!pointerState.current) return;
    
    const st = pointerState.current;
    const rectLeft = containerRef.current?.getBoundingClientRect().left ?? 0;
    const clientX = e.clientX - rectLeft;
    const dx = clientX - st.originX;
    const dM = dx / pxPerMin;

    setTasks((prev) => {
      const idx = prev.findIndex((t) => t.id === st.taskId);
      if (idx === -1) return prev;
      
      const copy = [...prev];
      const cur = copy[idx];
      let newStart = st.initialStart;
      let newEnd = st.initialEnd;
      
      if (st.mode === "drag") {
        newStart = st.initialStart + dM;
        newEnd = st.initialEnd + dM;
        const dur = newEnd - newStart;
        if (newStart < startM) {
          newStart = startM;
          newEnd = newStart + dur;
        }
        if (newEnd > endM) {
          newEnd = endM;
          newStart = newEnd - dur;
        }
      } else if (st.mode === "resize-left") {
        newStart = st.initialStart + dM;
        newStart = clamp(newStart, startM, st.initialEnd - 15);
      } else {
        newEnd = st.initialEnd + dM;
        newEnd = clamp(newEnd, st.initialStart + 15, endM);
      }

      newStart = snapToFifteen(newStart);
      newEnd = snapToFifteen(newEnd);

      copy[idx] = { 
        ...cur, 
        start: minutesToIso(newStart), 
        end: minutesToIso(newEnd) 
      };
      return copy;
    });
  } */

  function endPointer() {
    if (!pointerState.current) return;
    pointerState.current = null;
    setActive(null);
  }

  useEffect(() => {
    //const onMove = (e: PointerEvent) => movePointer(e);
    const onUp = () => endPointer();
    
    //window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    
    return () => {
      //window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [pxPerMin, startM, endM]);

  // 時間軸の目盛り生成
  const hourTicks: number[] = [];
  for (let hour = 6; hour <= 23; hour++) {
    const d = new Date();
    d.setHours(hour, 0, 0, 0);
    hourTicks.push(isoToMinutes(d.toISOString()));
  }
  for (let hour = 0; hour <= 5; hour++) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(hour, 0, 0, 0);
    hourTicks.push(isoToMinutes(d.toISOString()));
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <div className="p-4">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          ダッシュボードに戻る
        </Button>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">時間別ホステス出勤管理</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-semibold">{formatDate(selectedDate)}</span>
                </div>

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

                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  新規追加
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* メインコンテンツ */}
      <div className="px-4">
        <Card>
          <CardContent className="p-0">
            <div className="w-full">
              <div className="flex items-center gap-4 mb-2 px-4 pt-4">
                <div className="text-sm text-slate-600">タイムライン (6:00 〜 翌5:00)</div>
                <div className="text-xs text-slate-500">調整スナップ: 15分</div>
                <div className="text-xs text-slate-500">総件数: {filteredTasks.length}件</div>
              </div>

              <div ref={containerRef} className="w-full border rounded-lg overflow-hidden select-none mx-4" style={{ width: 'calc(100% - 2rem)' }}>
                {/* 時間軸ヘッダー */}
                <div className="relative h-10 bg-white border-b">
                  <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0 }}>
                    {hourTicks.map((m) => {
                      const x = minutesToX(m);
                      return (
                        <div key={m} style={{ position: "absolute", left: x }} className="-translate-x-1/2">
                          <div className="text-xs text-slate-600 font-medium">{formatHourLabel(m)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* タスク表示エリア */}
                <div className="relative" style={{ height: Math.max(400, filteredTasks.length * 64) }}>
                  {/* 背景グリッド */}
                  <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
                    {Array.from({ length: Math.ceil(totalMinutes / 60) }).map((_, i) => {
                      const m = startM + i * 60;
                      const x = minutesToX(m);
                      return (
                        <div key={i} style={{ position: "absolute", left: x, top: 0, bottom: 0, width: 1 }} className="opacity-10 bg-slate-300" />
                      );
                    })}
                  </div>

                  {/* ホステスタスク */}
                  {filteredTasks.map((task, idx) => {
                    const top = idx * 64 + 8;
                    const startMin = isoToMinutes(task.start);
                    const endMin = isoToMinutes(task.end);
                    const left = minutesToX(startMin);
                    const w = Math.max(80, (endMin - startMin) * pxPerMin);
                    const isActive = active?.id === task.id;

                    return (
                      <div key={task.id} className="absolute" style={{ left: 0, top }}>
                        {/* ホステス名ラベル */}
                        <div className="absolute -left-48 w-44 text-sm text-slate-700 py-2">
                          <div className="font-semibold">{task.hostessName}</div>
                          <div className="text-xs text-slate-500">{task.location}</div>
                        </div>

                        {/* 勤務時間バー */}
                        <div
                          className={`rounded-md shadow-md cursor-move transition-all ${isActive ? "ring-2 ring-offset-1 ring-blue-400" : ""}`}
                          style={{
                            position: "absolute",
                            left,
                            width: w,
                            height: 40,
                            background: "#60a5fa",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 8px",
                            color: "white",
                            userSelect: "none",
                          }}
                          onPointerDown={(e) => beginPointer(e, task, "drag")}
                          title={`${task.hostessName}: ${formatTimeRange(task.start, task.end)}`}
                        >
                          <div className="text-xs truncate flex-1">
                            {task.hostessName}
                          </div>

                          {/* リサイズハンドル（右） */}
                          <div
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              beginPointer(e, task, "resize-right");
                            }}
                            style={{ width: 12, height: "100%", cursor: "ew-resize", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <div className="w-1 h-6 rounded bg-white/80" />
                          </div>

                          {/* リサイズハンドル（左） */}
                          <div
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              beginPointer(e, task, "resize-left");
                            }}
                            style={{ position: "absolute", left: -8, top: 0, width: 16, height: "100%", cursor: "ew-resize" }}
                          />
                        </div>

                        {/* 時間表示 */}
                        <div className="absolute text-xs text-slate-600 mt-12" style={{ left }}>
                          {formatTimeRange(task.start, task.end)}
                        </div>

                      
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* フッター - 凡例 */}
      <div className="p-4 mt-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold">ステータス凡例:</span>
              </div>
            </div>

            
                

          </CardContent>
        </Card>
      </div>
    </div>
  );
}