'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// キャストデータの型定義
interface todayCastData {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  homeTime: string;
  deliverPlace: string;
  achieve: string;
  finalCustomer: string;
  nowCustomer: string;
  inDriverMoving: string;
  next1: string;
  next2: string;
  next3: string;
  next4: string;
  next5: string;
  remark: string;
  special: string;
  ngPlace: string;
  waitTime: string;
}

// サンプルデータ
const sampleCastData: todayCastData[] = [
  {
    id: "001",
    name: "うちう",
    startTime: "12:00",
    endTime: "14:00",
    homeTime: "14:48",
    deliverPlace: "成田",
    achieve: "2600",
    finalCustomer: "成田駅",
    nowCustomer: "羽田空港",
    inDriverMoving: "0:56",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "Girls",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "002", 
    name: "うちう",
    startTime: "12:00",
    endTime: "14:00",
    homeTime: "14:48",
    deliverPlace: "成田",
    achieve: "2600",
    finalCustomer: "成田駅",
    nowCustomer: "羽田空港",
    inDriverMoving: "0:56",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "Girls",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "003",
    name: "ゆりの",
    startTime: "15:00",
    endTime: "2:30",
    homeTime: "22:30",
    deliverPlace: "上野",
    achieve: "3000",
    finalCustomer: "羽田空港",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "Lady",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "004",
    name: "いす",
    startTime: "16:00",
    endTime: "5:00",
    homeTime: "23:00",
    deliverPlace: "成田",
    achieve: "1600",
    finalCustomer: "",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "VIP",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "005",
    name: "あやこ",
    startTime: "17:30",
    endTime: "",
    homeTime: "22:36",
    deliverPlace: "成田",
    achieve: "2800",
    finalCustomer: "成田駅",
    nowCustomer: "羽田空港",
    inDriverMoving: "6:51",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "あや",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "006",
    name: "くれあ",
    startTime: "18:00",
    endTime: "5:00",
    homeTime: "20:38",
    deliverPlace: "羽田",
    achieve: "0",
    finalCustomer: "",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "小娘",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "007",
    name: "ミリア",
    startTime: "18:00",
    endTime: "4:00",
    homeTime: "6:40",
    deliverPlace: "羽田",
    achieve: "3400",
    finalCustomer: "羽田駅前",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "SUP",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "008",
    name: "新-inori-",
    startTime: "19:00",
    endTime: "3:00",
    homeTime: "22:18",
    deliverPlace: "成田",
    achieve: "",
    finalCustomer: "",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "JK",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "009",
    name: "すずな",
    startTime: "19:00",
    endTime: "",
    homeTime: "1:48",
    deliverPlace: "成田",
    achieve: "",
    finalCustomer: "",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "すず",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "010",
    name: "さやか",
    startTime: "20:00",
    endTime: "2:30",
    homeTime: "6:14",
    deliverPlace: "成田",
    achieve: "",
    finalCustomer: "",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "さや",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "011",
    name: "アヤナ",
    startTime: "21:00",
    endTime: "5:00",
    homeTime: "22:38",
    deliverPlace: "羽田",
    achieve: "",
    finalCustomer: "可児勝成",
    nowCustomer: "",
    inDriverMoving: "2:40",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "ｱﾔﾅ",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "012",
    name: "うぱな",
    startTime: "22:00",
    endTime: "5:00",
    homeTime: "8:01",
    deliverPlace: "羽田",
    achieve: "",
    finalCustomer: "秦直成",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "Lady",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "013",
    name: "らの",
    startTime: "24:30",
    endTime: "5:00",
    homeTime: "1:37",
    deliverPlace: "成田",
    achieve: "",
    finalCustomer: "東広志",
    nowCustomer: "",
    inDriverMoving: "",
    next1: "",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "Lady",
    special: "",
    ngPlace: "",
    waitTime: ""
  }
];



export default function RT2Panel() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

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
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    
    return `${year}/${month}/${day}(${weekday})`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* 戻るボタン */}
      <div className="mb-4">
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
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">RT Ⅱ パネル</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-green-100">
                配車統制検査
              </Button>
              <Button variant="outline" size="sm" className="bg-pink-100">
                配車パネル
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-100">
                考査印刷
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-100">
                Menu
              </Button>
              <Button variant="outline" size="sm" className="bg-yellow-100">
                再表示
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-blue-600">
              終了時刻
            </div>
            <div className="text-lg font-mono bg-black text-white px-3 py-1 rounded">
              {formatTime(currentTime)}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* メインテーブル */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-2 py-1 text-center">名前</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Girls</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">受付</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">終了</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">帰宅</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">迎場所</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">営業所等</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">稼働状況</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">時刻</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">INドライバー稼働中</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約1</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約2</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約3</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約4</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約5</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">出席備考</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">特記事項</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">ホステスNG確認</th>
                </tr>
              </thead>
              <tbody>
                {sampleCastData.map((cast) => (
                  <tr key={cast.id} className="hover:bg-gray-50">
                    {/* 名前 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600 font-bold">{cast.name}</div>
                    </td>
                    {/* Girls */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <span className="text-blue-600">{cast.remark}</span>
                      {cast.achieve && (
                        <div className="text-red-600">{cast.achieve}</div>
                      )}
                    </td>
                    {/* 受付 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.startTime}</div>
                    </td>
                    {/* 終了 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.endTime}</div>
                    </td>
                    {/* 帰宅 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.homeTime}</div>
                    </td>
                    {/* 営業所等 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.deliverPlace}</div>
                    </td>
                    {/* 稼働状況 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {cast.nowCustomer ? (
                        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                          稼働中
                        </div>
                      ) : cast.finalCustomer ? (
                        <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                          待機
                        </div>
                      ) : (
                        <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                          待機
                        </div>
                      )}
                    </td>
                    {/* 時刻 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-red-600 font-mono">{cast.homeTime}</div>
                    </td>
                    {/* INドライバー稼働中 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {cast.finalCustomer && (
                        <div className="text-blue-600">{cast.finalCustomer}</div>
                      )}
                      {cast.nowCustomer && (
                        <div className="text-blue-600">{cast.nowCustomer}</div>
                      )}
                      {cast.inDriverMoving && (
                        <div className="text-red-600">{cast.inDriverMoving}</div>
                      )}
                    </td>
                    {/* 予約1 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.next1}</div>
                    </td>
                    {/* 予約2 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.next2}</div>
                    </td>
                    {/* 予約3 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.next3}</div>
                    </td>
                    {/* 予約4 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.next4}</div>
                    </td>
                    {/* 予約5 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.next5}</div>
                    </td>
                    {/* 出席記録書 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.special}</div>
                    </td>
                    {/* 持込配車票 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-blue-600">{cast.remark}</div>
                    </td>
                    {/* ホステスNG確認 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-red-600">{cast.ngPlace}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
