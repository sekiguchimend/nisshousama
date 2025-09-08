'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, User, Users, FileText, MessageSquare, Settings } from "lucide-react";

// ホステスデータの型定義
interface HostessSchedule {
  id: string;
  name: string;
  time: string;
  status: 'scheduled' | 'working' | 'finished';
  location?: string;
}

// スタッフデータの型定義
interface StaffSchedule {
  id: string;
  name: string;
  time: string;
  position: string;
  status: 'scheduled' | 'working' | 'finished';
}

// 配車データの型定義
interface DispatchData {
  id: string;
  number: string;
  customer: string;
  from: string;
  to: string;
  time: string;
  driver?: string;
  status: 'pending' | 'assigned' | 'completed';
  priority: 'normal' | 'high' | 'urgent';
}

// ドライバーデータの型定義
interface DriverData {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location: string;
  currentJob?: string;
}

// サンプルホステスデータ
const sampleHostesses: HostessSchedule[] = [
  { id: "1", name: "みぽりん", time: "16:00", status: "scheduled", location: "成田" },
  { id: "2", name: "さとか", time: "16:00", status: "scheduled", location: "羽田" },
  { id: "3", name: "せり", time: "16:00", status: "working", location: "成田" },
  { id: "4", name: "みか", time: "16:00", status: "working", location: "羽田" },
  { id: "5", name: "らん", time: "17:00", status: "scheduled", location: "上野" },
  { id: "6", name: "ここな", time: "17:00", status: "scheduled", location: "成田" },
  { id: "7", name: "ちなつ", time: "17:00", status: "working", location: "羽田" },
  { id: "8", name: "ゆあ", time: "17:00", status: "scheduled", location: "成田" },
  { id: "9", name: "りお", time: "18:00", status: "scheduled", location: "羽田" },
  { id: "10", name: "なな", time: "18:00", status: "working", location: "成田" },
  { id: "11", name: "ミント", time: "18:00", status: "scheduled", location: "羽田" },
  { id: "12", name: "ゆめ", time: "19:00", status: "scheduled", location: "成田" }
];

// サンプルスタッフデータ
const sampleStaff: StaffSchedule[] = [
  { id: "1", name: "田中マネージャー", time: "14:00", position: "マネージャー", status: "working" },
  { id: "2", name: "佐藤主任", time: "15:00", position: "主任", status: "scheduled" },
  { id: "3", name: "山田リーダー", time: "16:00", position: "リーダー", status: "working" },
  { id: "4", name: "鈴木サブ", time: "17:00", position: "サブ", status: "scheduled" },
  { id: "5", name: "高橋アシスタント", time: "18:00", position: "アシスタント", status: "scheduled" },
  { id: "6", name: "伊藤コーディネーター", time: "19:00", position: "コーディネーター", status: "working" }
];

// サンプル配車データ
const sampleDispatch: DispatchData[] = [
  { id: "1", number: "0054", customer: "田中様", from: "成田空港", to: "渋谷", time: "17:30", status: "pending", priority: "high" },
  { id: "2", number: "0055", customer: "佐藤様", from: "羽田空港", to: "新宿", time: "18:00", status: "assigned", priority: "normal", driver: "山田" },
  { id: "3", number: "0056", customer: "鈴木様", from: "上野駅", to: "品川", time: "18:30", status: "pending", priority: "urgent" }
];

// サンプルドライバーデータ
const sampleDrivers: DriverData[] = [
  { id: "1", name: "山田", status: "busy", location: "羽田空港", currentJob: "0055" },
  { id: "2", name: "田中", status: "available", location: "成田空港" },
  { id: "3", name: "佐藤", status: "available", location: "上野駅" },
  { id: "4", name: "鈴木", status: "offline", location: "品川駅" }
];

const StatusIndicator = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'working': return 'bg-red-500';
      case 'finished': return 'bg-gray-500';
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
  );
};

export default function DispatchPanel2D() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedHostess, setSelectedHostess] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}年${month}月${day}日`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
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

      {/* 上部ボタン群 */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" className="bg-blue-100">
            ドライバー情報
          </Button>
          <Button variant="outline" size="sm" className="bg-purple-100">
            新規配車検査
          </Button>
          <Button variant="outline" size="sm" className="bg-green-100">
            RTIIパネル
          </Button>
          <Button variant="outline" size="sm" className="bg-yellow-100">
            手配表
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-100">
            Menu
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-200">
            チャット表示
          </Button>
          <div className="ml-auto text-lg font-bold">
            {formatDate(currentTime)} {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div className="px-4 grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        {/* 左側パネル - 出勤予定ホステス & スタッフ */}
        <div className="col-span-2 space-y-4">
          {/* 出勤予定ホステス */}
          <Card className="h-80">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold bg-pink-200 p-2 rounded">出勤予定ホステス</h3>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {sampleHostesses.map((hostess) => (
                  <div 
                    key={hostess.id} 
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${
                      selectedHostess === hostess.id ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => setSelectedHostess(hostess.id)}
                  >
                    <StatusIndicator status={hostess.status} />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-blue-600">{hostess.time}</div>
                      <div>{hostess.name}</div>
                      {hostess.location && (
                        <div className="text-gray-500">{hostess.location}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* スタッフ予定リスト */}
          <Card className="h-64">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold bg-blue-200 p-2 rounded">スタッフ予定リスト</h3>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1 max-h-44 overflow-y-auto">
                {sampleStaff.map((staff) => (
                  <div 
                    key={staff.id} 
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${
                      selectedStaff === staff.id ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => setSelectedStaff(staff.id)}
                  >
                    <StatusIndicator status={staff.status} />
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-blue-600">{staff.time}</div>
                      <div className="font-semibold">{staff.name}</div>
                      <div className="text-gray-500">{staff.position}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 中央エリア - メイン配車情報 */}
        <div className="col-span-7">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">JMF予定マイナリスト</h3>
                <div className="text-xs text-gray-600">配車番号: 0054〜</div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {/* 配車情報テーブル */}
              <div className="border border-gray-300 rounded">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-2 py-1">配車No</th>
                      <th className="border border-gray-300 px-2 py-1">顧客名</th>
                      <th className="border border-gray-300 px-2 py-1">出発地</th>
                      <th className="border border-gray-300 px-2 py-1">目的地</th>
                      <th className="border border-gray-300 px-2 py-1">時刻</th>
                      <th className="border border-gray-300 px-2 py-1">ドライバー</th>
                      <th className="border border-gray-300 px-2 py-1">状態</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleDispatch.map((dispatch) => (
                      <tr key={dispatch.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-1 text-center">
                          <span className={`font-bold ${
                            dispatch.priority === 'urgent' ? 'text-red-600' :
                            dispatch.priority === 'high' ? 'text-orange-600' : 'text-blue-600'
                          }`}>
                            {dispatch.number}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-2 py-1">{dispatch.customer}</td>
                        <td className="border border-gray-300 px-2 py-1">{dispatch.from}</td>
                        <td className="border border-gray-300 px-2 py-1">{dispatch.to}</td>
                        <td className="border border-gray-300 px-2 py-1 text-center">{dispatch.time}</td>
                        <td className="border border-gray-300 px-2 py-1 text-center">{dispatch.driver || '-'}</td>
                        <td className="border border-gray-300 px-2 py-1 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${
                            dispatch.status === 'completed' ? 'bg-green-100 text-green-800' :
                            dispatch.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {dispatch.status === 'completed' ? '完了' :
                             dispatch.status === 'assigned' ? '配車済' : '待機中'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 配車詳細エリア */}
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <h4 className="text-sm font-bold mb-2">配車詳細情報</h4>
                <div className="text-xs text-gray-600">
                  配車を選択すると詳細情報が表示されます
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右側パネル - 統計とドライバー管理 */}
        <div className="col-span-3 space-y-4">
          {/* 終了済みリスト */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold bg-red-200 p-2 rounded">終了済みリスト</h3>
            </CardHeader>
            <CardContent className="p-2">
              <div className="text-xs text-gray-600">
                <div>OUT中予定・特急中リスト</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>みか</span>
                    <span className="text-red-600">16:09</span>
                  </div>
                  <div className="flex justify-between">
                    <span>せり</span>
                    <span className="text-red-600">21:58</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ドライバー管理 */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold bg-blue-200 p-2 rounded">ドライバー管理</h3>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2">
                {sampleDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center gap-2 p-2 bg-white rounded border">
                    <StatusIndicator status={driver.status} />
                    <div className="flex-1 text-xs">
                      <div className="font-bold">{driver.name}</div>
                      <div className="text-gray-500">{driver.location}</div>
                      {driver.currentJob && (
                        <div className="text-blue-600">Job: {driver.currentJob}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 統計情報 */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold bg-yellow-200 p-2 rounded">統計情報</h3>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>本日配車数:</span>
                  <span className="font-bold text-blue-600">12件</span>
                </div>
                <div className="flex justify-between">
                  <span>完了:</span>
                  <span className="font-bold text-green-600">8件</span>
                </div>
                <div className="flex justify-between">
                  <span>進行中:</span>
                  <span className="font-bold text-orange-600">3件</span>
                </div>
                <div className="flex justify-between">
                  <span>待機中:</span>
                  <span className="font-bold text-red-600">1件</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 自動配車設定 */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-bold bg-green-200 p-2 rounded">自動配車設定</h3>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>自動配車有効</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" defaultChecked />
                  <span>優先度考慮</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>距離最適化</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 下部ステータスバー */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span>配車パネル2D v2.1</span>
            <span className="text-green-600">● 接続中</span>
          </div>
          <div className="flex items-center gap-2">
            <span>最終更新: {formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
