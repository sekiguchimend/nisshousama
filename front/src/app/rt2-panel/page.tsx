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
    name: "美咲",
    startTime: "18:00",
    endTime: "2:00",
    homeTime: "21:30",
    deliverPlace: "銀座駅",
    achieve: "3200",
    finalCustomer: "六本木ヒルズ",
    nowCustomer: "六本木ヒルズ",
    inDriverMoving: "1:15",
    next1: "22:30 渋谷",
    next2: "0:15 新宿",
    next3: "",
    next4: "",
    next5: "",
    remark: "VIP",
    special: "新規顧客対応",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "002",
    name: "さくら",
    startTime: "19:30",
    endTime: "3:00",
    homeTime: "22:45",
    deliverPlace: "新宿駅南口",
    achieve: "2800",
    finalCustomer: "新宿駅南口",
    nowCustomer: "表参道駅",
    inDriverMoving: "0:25",
    next1: "23:00 表参道",
    next2: "1:30 池袋",
    next3: "2:45 品川",
    next4: "",
    next5: "",
    remark: "Lady",
    special: "",
    ngPlace: "歌舞伎町周辺",
    waitTime: ""
  },
  {
    id: "003",
    name: "まゆ",
    startTime: "20:00",
    endTime: "4:00",
    homeTime: "23:20",
    deliverPlace: "恵比寿駅",
    achieve: "4500",
    finalCustomer: "恵比寿駅",
    nowCustomer: "赤坂見附",
    inDriverMoving: "0:45",
    next1: "0:30 麻布",
    next2: "",
    next3: "",
    next4: "",
    next5: "",
    remark: "Girls",
    special: "VIP対応必須",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "004",
    name: "りな",
    startTime: "18:30",
    endTime: "1:30",
    homeTime: "20:15",
    deliverPlace: "羽田空港",
    achieve: "1800",
    finalCustomer: "お台場駅",
    nowCustomer: "",
    inDriverMoving: "0:15",
    next1: "21:00 お台場",
    next2: "23:30 豊洲",
    next3: "0:45 晴海",
    next4: "",
    next5: "",
    remark: "新人",
    special: "",
    ngPlace: "",
    waitTime: "15分"
  },
  {
    id: "005",
    name: "あいり",
    startTime: "21:00",
    endTime: "5:00",
    homeTime: "1:10",
    deliverPlace: "成田空港",
    achieve: "5200",
    finalCustomer: "成田空港",
    nowCustomer: "東京駅",
    inDriverMoving: "2:30",
    next1: "2:00 大手町",
    next2: "3:15 丸の内",
    next3: "4:30 八重洲",
    next4: "",
    next5: "",
    remark: "SUP",
    special: "長距離対応",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "006",
    name: "ゆき",
    startTime: "19:00",
    endTime: "2:30",
    homeTime: "22:00",
    deliverPlace: "品川駅",
    achieve: "3100",
    finalCustomer: "品川駅",
    nowCustomer: "五反田駅",
    inDriverMoving: "0:40",
    next1: "23:15 五反田",
    next2: "1:00 目黒",
    next3: "",
    next4: "",
    next5: "",
    remark: "Lady",
    special: "",
    ngPlace: "大崎周辺",
    waitTime: ""
  },
  {
    id: "007",
    name: "かな",
    startTime: "20:30",
    endTime: "3:30",
    homeTime: "0:45",
    deliverPlace: "浦安駅",
    achieve: "2400",
    finalCustomer: "浦安駅",
    nowCustomer: "舞浜",
    inDriverMoving: "1:20",
    next1: "1:30 新浦安",
    next2: "2:45 市川",
    next3: "",
    next4: "",
    next5: "",
    remark: "Girls",
    special: "",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "008",
    name: "えみ",
    startTime: "18:45",
    endTime: "1:00",
    homeTime: "21:30",
    deliverPlace: "横浜駅",
    achieve: "2700",
    finalCustomer: "みなとみらい駅",
    nowCustomer: "",
    inDriverMoving: "0:20",
    next1: "22:30 みなとみらい",
    next2: "0:15 中華街",
    next3: "",
    next4: "",
    next5: "",
    remark: "VIP",
    special: "新規エリア",
    ngPlace: "",
    waitTime: "10分"
  },
  {
    id: "009",
    name: "みお",
    startTime: "22:00",
    endTime: "6:00",
    homeTime: "2:20",
    deliverPlace: "千葉駅",
    achieve: "3800",
    finalCustomer: "千葉駅",
    nowCustomer: "津田沼",
    inDriverMoving: "0:50",
    next1: "3:00 船橋",
    next2: "4:30 柏",
    next3: "5:15 松戸",
    next4: "",
    next5: "",
    remark: "Lady",
    special: "長時間対応",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "010",
    name: "なな",
    startTime: "19:15",
    endTime: "2:45",
    homeTime: "23:10",
    deliverPlace: "大宮駅",
    achieve: "2900",
    finalCustomer: "大宮駅",
    nowCustomer: "浦和駅",
    inDriverMoving: "0:55",
    next1: "0:00 浦和",
    next2: "1:30 川口",
    next3: "",
    next4: "",
    next5: "",
    remark: "Girls",
    special: "",
    ngPlace: "大宮周辺繁華街",
    waitTime: ""
  },
  {
    id: "011",
    name: "ひな",
    startTime: "21:30",
    endTime: "4:30",
    homeTime: "1:45",
    deliverPlace: "立川駅",
    achieve: "1900",
    finalCustomer: "立川駅",
    nowCustomer: "八王子",
    inDriverMoving: "1:05",
    next1: "2:30 町田",
    next2: "3:45 多摩センター",
    next3: "",
    next4: "",
    next5: "",
    remark: "新人",
    special: "研修中",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "012",
    name: "あや",
    startTime: "20:15",
    endTime: "3:15",
    homeTime: "0:30",
    deliverPlace: "吉祥寺駅",
    achieve: "3600",
    finalCustomer: "吉祥寺駅",
    nowCustomer: "三鷹",
    inDriverMoving: "0:35",
    next1: "1:15 調布",
    next2: "2:30 府中",
    next3: "",
    next4: "",
    next5: "",
    remark: "SUP",
    special: "指名多数",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "013",
    name: "れい",
    startTime: "23:00",
    endTime: "7:00",
    homeTime: "3:15",
    deliverPlace: "武蔵小杉駅",
    achieve: "4100",
    finalCustomer: "武蔵小杉駅",
    nowCustomer: "川崎駅",
    inDriverMoving: "1:10",
    next1: "4:00 川崎",
    next2: "5:30 横浜",
    next3: "6:15 鶴見",
    next4: "",
    next5: "",
    remark: "VIP",
    special: "深夜専門",
    ngPlace: "",
    waitTime: ""
  },
  {
    id: "014",
    name: "みく",
    startTime: "18:15",
    endTime: "0:15",
    homeTime: "20:50",
    deliverPlace: "秋葉原駅",
    achieve: "2300",
    finalCustomer: "秋葉原駅",
    nowCustomer: "御茶ノ水",
    inDriverMoving: "0:25",
    next1: "21:45 神田",
    next2: "23:00 東京",
    next3: "",
    next4: "",
    next5: "",
    remark: "Girls",
    special: "",
    ngPlace: "秋葉原周辺",
    waitTime: ""
  },
  {
    id: "015",
    name: "こはる",
    startTime: "22:30",
    endTime: "5:30",
    homeTime: "2:40",
    deliverPlace: "池袋駅",
    achieve: "3300",
    finalCustomer: "新宿駅",
    nowCustomer: "",
    inDriverMoving: "0:45",
    next1: "3:30 新宿",
    next2: "4:45 渋谷",
    next3: "",
    next4: "",
    next5: "",
    remark: "Lady",
    special: "夜間専門",
    ngPlace: "",
    waitTime: "20分"
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
            <table className="w-full text-xs table-fixed">
              <colgroup>
                <col style={{width: '80px'}} />
                <col style={{width: '80px'}} />
                <col style={{width: '60px'}} />
                <col style={{width: '60px'}} />
                <col style={{width: '60px'}} />
                <col style={{width: '100px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '150px'}} />
                <col style={{width: '32px'}} />
                <col style={{width: '100px'}} />
                <col style={{width: '100px'}} />
                <col style={{width: '120px'}} />
              </colgroup>
              <thead>
                <tr className="bg-white">
                  <th className="border border-gray-300 px-2 py-1 text-center">名前</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Girls</th>
                  <th className="border-t border-b border-gray-300 px-2 py-1 text-center">受付</th>
                  <th className="border-t border-b border-gray-300 px-2 py-1 text-center">終了</th>
                  <th className="border-t border-b border-gray-300 px-2 py-1 text-center">帰宅</th>
                  <th className="border-t border-b border-gray-300 px-2 py-1 text-center">迎場所</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">最終接客</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">接客中</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">INドライバー稼働中</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約1</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約2</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約3</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約4</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">予約5</th>
                  <th className="border border-gray-300 px-1 py-1 text-center"></th>
                  <th className="border border-gray-300 px-2 py-1 text-center">出席備考</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">特記事項</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">ホステスNG確認</th>
                </tr>
              </thead>
              <tbody>
                {sampleCastData.map((cast) => (
                  <tr key={cast.id} className="bg-yellow-50 hover:bg-yellow-100/70">
                    {/* 名前 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-black font-bold">{cast.name}</div>
                    </td>
                    {/* Girls */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <span className="text-black">{cast.remark}</span>
                      {cast.achieve && (
                        <div className="text-red-600">{cast.achieve}</div>
                      )}
                    </td>
                    {/* 受付 */}
                    <td className="border-t border-b border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.startTime}</div>
                    </td>
                    {/* 終了 */}
                    <td className="border-t border-b border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.endTime}</div>
                    </td>
                    {/* 帰宅 */}
                    <td className="border-t border-b border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.homeTime}</div>
                    </td>
                    {/* 迎場所 */}
                    <td className="border-t border-b border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.deliverPlace}</div>
                    </td>
                    {/* 最終接客 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-black">{cast.finalCustomer}</div>
                        <div className="text-red-600">{cast.homeTime}</div>
                      </div>
                    </td>
                    {/* 最終接客ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {cast.finalCustomer && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none rounded-none">＜</button>
                      )}
                    </td>
                    {/* 接客中 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-black">{cast.nowCustomer || "待機中"}</div>
                        <div className="text-red-600">{cast.homeTime}</div>
                      </div>
                    </td>
                    {/* 接客中ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {cast.nowCustomer && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* INドライバー稼働中 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-black">{cast.nowCustomer || cast.deliverPlace}</div>
                        {cast.inDriverMoving && (
                          <div className="text-red-600">{cast.inDriverMoving}</div>
                        )}
                      </div>
                    </td>
                    {/* INドライバー稼働中ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {(cast.nowCustomer || cast.deliverPlace) && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* 予約1 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {cast.next1 && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-black">{cast.next1.split(' ')[1] || cast.next1}</div>
                          <div className="text-red-600">{cast.next1.split(' ')[0] || ''}</div>
                        </div>
                      )}
                    </td>
                    {/* 予約1ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {cast.next1 && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* 予約2 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {cast.next2 && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-black">{cast.next2.split(' ')[1] || cast.next2}</div>
                          <div className="text-red-600">{cast.next2.split(' ')[0] || ''}</div>
                        </div>
                      )}
                    </td>
                    {/* 予約2ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {cast.next2 && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* 予約3 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {cast.next3 && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-black">{cast.next3.split(' ')[1] || cast.next3}</div>
                          <div className="text-red-600">{cast.next3.split(' ')[0] || ''}</div>
                        </div>
                      )}
                    </td>
                    {/* 予約3ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {cast.next3 && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* 予約4 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {cast.next4 && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-black">{cast.next4.split(' ')[1] || cast.next4}</div>
                          <div className="text-red-600">{cast.next4.split(' ')[0] || ''}</div>
                        </div>
                      )}
                    </td>
                    {/* 予約4ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {cast.next4 && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* 予約5 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      {cast.next5 && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-black">{cast.next5.split(' ')[1] || cast.next5}</div>
                          <div className="text-red-600">{cast.next5.split(' ')[0] || ''}</div>
                        </div>
                      )}
                    </td>
                    {/* 予約5ボタン */}
                    <td className="border border-gray-300 p-0 text-center">
                      {cast.next5 && (
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-xs border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* 出席備考 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.special}</div>
                    </td>
                    {/* 特記事項 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.remark}</div>
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
