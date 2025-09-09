'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import type { TodayCastData } from '@/types';
import { sampleCastData } from '@/data/castSampleData';




export default function RT2Panel() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


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
            <table className="w-full text-[10px] table-fixed">
              <colgroup>
                <col style={{width: '55px'}} />
                <col style={{width: '50px'}} />
                <col style={{width: '40px'}} />
                <col style={{width: '40px'}} />
                <col style={{width: '40px'}} />
                <col style={{width: '70px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '140px'}} />
                <col style={{width: '24px'}} />
                <col style={{width: '70px'}} />
                <col style={{width: '60px'}} />
                <col style={{width: '70px'}} />
                <col style={{width: '60px'}} />
                <col style={{width: '40px'}} />
                <col style={{width: '30px'}} />
                <col style={{width: '130px'}} />
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
                  <th className="border border-gray-300 px-2 py-1 text-center">待ち時間</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">特記事項</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">web状態</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">mode</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">順位</th>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none rounded-none">＜</button>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none">＜</button>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none">＜</button>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none">＜</button>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none">＜</button>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none">＜</button>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none">＜</button>
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
                        <button className="w-full h-full bg-green-700 hover:bg-green-800 text-white text-[8px] border-0 flex items-center justify-center rounded-none">＜</button>
                      )}
                    </td>
                    {/* 出席備考 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.special}</div>
                    </td>
                    {/* 待ち時間 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.waitTime}</div>
                    </td>
                    {/* 特記事項 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-black">{cast.remark}</div>
                    </td>
                    {/* web状態 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className={cast.webStatus === "オンライン" ? "text-green-600" : "text-red-600"}>{cast.webStatus}</div>
                    </td>
                    {/* mode */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className={cast.mode === "自動" ? "text-blue-600" : "text-orange-600"}>{cast.mode}</div>
                    </td>
                    {/* 順位 */}
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="text-black font-bold">{cast.ranking}</div>
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
