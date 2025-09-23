'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Users, UserPlus, Search, FileText, User2, MapPin, Plus, Trash2 } from "lucide-react";
import { Customer, storeMapping } from '@/types';
import { sampleCustomers } from '@/data/customerSampleData';

interface Vehicle {
  id: string;
  type: string;
  color: string;
  number: string;
}

interface UsageHistory {
  id: string;
  receptionNumber: string;
  date: string;
  storeName: string;
  staffName: string;
  category: string;
  rank: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: 'completed' | 'absent'; // 'completed' = 終了（青）, 'absent' = 当日欠（赤）
}

export default function CustomerLedger() {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(sampleCustomers[0]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: '1', type: 'BMW 7シリーズ', color: 'ブラック', number: '品川300あ1234' }
  ]);
  
  const [kanaFilter, setKanaFilter] = useState<string>('all');
  
  const [usageHistory] = useState<UsageHistory[]>([
    {
      id: '1',
      receptionNumber: 'R-2025-001',
      date: '2025-01-26',
      storeName: '本店',
      staffName: '佐藤美智子',
      category: 'ガールズ',
      rank: 'VIP',
      startTime: '19:00',
      endTime: '23:30',
      amount: 45000,
      status: 'completed'
    },
    {
      id: '2',
      receptionNumber: 'R-2025-002',
      date: '2025-01-25',
      storeName: '銀座支店',
      staffName: '田中花子',
      category: 'プレミアム',
      rank: 'S',
      startTime: '20:00',
      endTime: '01:00',
      amount: 68000,
      status: 'completed'
    },
    {
      id: '3',
      receptionNumber: 'R-2025-003',
      date: '2025-01-24',
      storeName: '本店',
      staffName: '山田愛子',
      category: 'ガールズ',
      rank: 'A',
      startTime: '18:30',
      endTime: '',
      amount: 0,
      status: 'absent'
    },
    {
      id: '4',
      receptionNumber: 'R-2025-004',
      date: '2025-01-23',
      storeName: '新宿支店',
      staffName: '鈴木麻美',
      category: 'スタンダード',
      rank: 'B',
      startTime: '19:30',
      endTime: '22:45',
      amount: 32000,
      status: 'completed'
    },
    {
      id: '5',
      receptionNumber: 'R-2025-005',
      date: '2025-01-22',
      storeName: 'VIPルーム',
      staffName: '高橋美香',
      category: 'プレミアム',
      rank: 'VIP',
      startTime: '20:30',
      endTime: '02:15',
      amount: 95000,
      status: 'completed'
    }
  ]);

  const handleCustomerChange = (updatedFields: Partial<Customer>) => {
    setSelectedCustomer(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const addVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      type: '',
      color: '',
      number: ''
    };
    setVehicles(prev => [...prev, newVehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const updateVehicle = (id: string, field: keyof Omit<Vehicle, 'id'>, value: string) => {
    setVehicles(prev => prev.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  // フィルタリングされた履歴
  const filteredHistory = usageHistory.filter(history => {
    if (kanaFilter === 'all') return true;
    return history.staffName.charAt(0) === kanaFilter;
  });

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

      {/* ページヘッダー */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" />
              <h1 className="text-2xl font-bold">顧客台帳</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                検索
              </Button>
              <Button className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                新規登録
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 顧客情報ヘッダー */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 顧客番号 */}
            <div className="space-y-2">
              <Label htmlFor="customerNumber" className="text-sm font-medium text-gray-700">
                顧客番号
              </Label>
              <Input
                id="customerNumber"
                value={selectedCustomer?.customerNumber || ''}
                onChange={(e) => handleCustomerChange({ customerNumber: e.target.value })}
                placeholder="C-00000"
              />
            </div>

            {/* 名前 */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                名前
              </Label>
              <Input
                id="name"
                value={selectedCustomer?.name || ''}
                onChange={(e) => handleCustomerChange({ name: e.target.value })}
                placeholder="顧客名を入力"
              />
            </div>

            {/* 氏名ふりがな */}
            <div className="space-y-2">
              <Label htmlFor="nameKana" className="text-sm font-medium text-gray-700">
                氏名ふりがな
              </Label>
              <Input
                id="nameKana"
                value={selectedCustomer?.nameKana || ''}
                onChange={(e) => handleCustomerChange({ nameKana: e.target.value })}
                placeholder="コキャクメイ"
              />
            </div>

            {/* 店舗番号 */}
            <div className="space-y-2">
              <Label htmlFor="storeNumber" className="text-sm font-medium text-gray-700">
                店舗番号
              </Label>
              <Input
                id="storeNumber"
                value={selectedCustomer?.storeNumber || ''}
                onChange={(e) => handleCustomerChange({ storeNumber: e.target.value })}
                placeholder="001"
              />
              {/* 店舗名表示 */}
              {selectedCustomer?.storeNumber && storeMapping[selectedCustomer.storeNumber] && (
                <div className="text-xs text-gray-500 font-medium">
                  {storeMapping[selectedCustomer.storeNumber]}
                </div>
              )}
            </div>

            {/* 参照メディア */}
            <div className="space-y-2">
              <Label htmlFor="referenceMedia" className="text-sm font-medium text-gray-700">
                参照メディア
              </Label>
              <Input
                id="referenceMedia"
                value={selectedCustomer?.referenceMedia || ''}
                onChange={(e) => handleCustomerChange({ referenceMedia: e.target.value })}
                placeholder=""
              />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* メインコンテンツエリア - タブ構造 */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic-info" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                基本情報
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User2 className="w-4 h-4" />
                プロフィール
              </TabsTrigger>
            </TabsList>
            
            {/* 基本情報タブ */}
            <TabsContent value="basic-info" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 左カラム - 基本情報入力エリア */}
                <div className="space-y-8">
                  
                  {/* 電話番号（複数欄） */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">電話番号</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input id="phone-other" placeholder="050-1234-5678" />
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" className="flex items-center gap-1">
                            同一電話番号登録G1
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input id="phone-other" placeholder="050-1234-5678" />
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" className="flex items-center gap-1">
                            同一電話番号登録G2
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Input id="phone-other" placeholder="050-1234-5678" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* メールアドレス */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">メールアドレス</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="email-webmail">Webメール</Label>
                        <Input id="email-webmail" type="email" placeholder="example@gmail.com" />
                      </div>
                      <div>
                        <Label htmlFor="email-mobile">携帯メール</Label>
                        <Input id="email-mobile" type="email" placeholder="example@docomo.ne.jp" />
                      </div>
                      <div>
                        <Label htmlFor="email-pc">PCメール</Label>
                        <Input id="email-pc" type="email" placeholder="example@example.com" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 連絡方法 */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">連絡方法</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="contact-phone" />
                        <Label htmlFor="contact-phone">電話</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="contact-email" />
                        <Label htmlFor="contact-email">メール</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="contact-none" />
                        <Label htmlFor="contact-none">なし</Label>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" />
                        <Label htmlFor="newsletter">メルマガ有無</Label>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 住所 */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">住所</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label htmlFor="zipcode">郵便番号</Label>
                          <Input id="zipcode" placeholder="100-0001" />
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            住所検索
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="prefecture">都道府県</Label>
                        <Input id="prefecture" placeholder="東京都" />
                      </div>
                      <div>
                        <Label htmlFor="city">市区町村</Label>
                        <Input id="city" placeholder="千代田区" />
                      </div>
                      <div>
                        <Label htmlFor="street">町丁番地</Label>
                        <Input id="street" placeholder="千代田1-1-1" />
                      </div>
                      <div>
                        <Label htmlFor="building">建物名他</Label>
                        <Input id="building" placeholder="千代田ビル10F" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 地区区分 */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">地区区分</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="region">地域</Label>
                        <Input id="region" placeholder="京都" />
                      </div>
                      <div>
                        <Label htmlFor="area-code">コード</Label>
                        <Input id="area-code" placeholder="21" />
                      </div>
                      <div>
                        <Label htmlFor="place-name">地名</Label>
                        <Input id="place-name" placeholder="地名を入力" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 交通費・利用場所 */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">交通費・利用場所</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="transportation-fee">交通費</Label>
                        <Input id="transportation-fee" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label htmlFor="main-usage">主な利用場所</Label>
                        <Input id="main-usage" placeholder="主な利用場所を入力" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 位置情報 */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">位置情報</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="latitude">北緯</Label>
                        <Input id="latitude" type="number" step="0.0001" placeholder="35.6762" />
                      </div>
                      <div>
                        <Label htmlFor="longitude">東経</Label>
                        <Input id="longitude" type="number" step="0.0001" placeholder="139.6503" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* ホテル備考 */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">ホテル備考</h3>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        id="hotel-notes" 
                        placeholder="ホテルに関する備考を入力してください"
                        className="min-h-[100px]"
                      />
                    </CardContent>
                  </Card>

                  {/* 車両情報 */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <h3 className="text-lg font-semibold">車両情報</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={addVehicle}
                        className="flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        車両追加
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* 車両リスト */}
                      <div className="space-y-3">
                        {vehicles.map((vehicle, index) => (
                          <div key={vehicle.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-sm text-gray-700">車両 {index + 1}</h4>
                              {vehicles.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeVehicle(vehicle.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <Label htmlFor={`vehicle-type-${vehicle.id}`} className="text-xs">車種</Label>
                                <Input 
                                  id={`vehicle-type-${vehicle.id}`}
                                  value={vehicle.type}
                                  onChange={(e) => updateVehicle(vehicle.id, 'type', e.target.value)}
                                  placeholder="例：BMW 7シリーズ"
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`vehicle-color-${vehicle.id}`} className="text-xs">車色</Label>
                                <Input 
                                  id={`vehicle-color-${vehicle.id}`}
                                  value={vehicle.color}
                                  onChange={(e) => updateVehicle(vehicle.id, 'color', e.target.value)}
                                  placeholder="例：ブラック"
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`vehicle-number-${vehicle.id}`} className="text-xs">ナンバー</Label>
                                <Input 
                                  id={`vehicle-number-${vehicle.id}`}
                                  value={vehicle.number}
                                  onChange={(e) => updateVehicle(vehicle.id, 'number', e.target.value)}
                                  placeholder="例：品川300あ1234"
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* 本日の車（単独項目） */}
                      <div className="border-t pt-4 mt-4">
                        <div>
                          <Label htmlFor="todays-vehicle">本日の車</Label>
                          <Input id="todays-vehicle" placeholder="本日使用する車両" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* クレジットカード */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">クレジットカード情報</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="card-number">カード番号</Label>
                        <Input id="card-number" placeholder="**** **** **** ****" />
                      </div>
                      <div>
                        <Label htmlFor="card-holder">名義人</Label>
                        <Input id="card-holder" placeholder="カード名義人" />
                      </div>
                      <div>
                        <Label htmlFor="card-expiry">有効期限</Label>
                        <Input id="card-expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="card-company">カード会社</Label>
                        <Input id="card-company" placeholder="例：VISA" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 備考欄 */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">備考</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="notes">備考</Label>
                        <Textarea 
                          id="notes" 
                          placeholder="備考を入力してください"
                          className="min-h-[100px]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="old-notes">旧備考</Label>
                        <Textarea 
                          id="old-notes" 
                          placeholder="旧備考"
                          className="min-h-[100px]"
                          readOnly
                        />
                      </div>
                    </CardContent>
                  </Card>

                </div>

                {/* 中央カラム - 準備中 */}
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-8">
                      <div className="text-center text-gray-500">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-semibold mb-2">中央カラム</h3>
                        <p>このエリアは準備中です</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 右カラム - 利用履歴リスト */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">利用履歴</h3>
                    </CardHeader>
                    
                    {/* カタカナフィルター */}
                    <div className="px-6 py-4 border-b bg-gray-50">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">担当者名で検索（五十音）</Label>
                        <RadioGroup 
                          value={kanaFilter} 
                          onValueChange={setKanaFilter}
                          className="space-y-2"
                        >
                          {/* すべて */}
                          <div className="pb-2 border-b">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="all" />
                              <Label htmlFor="all" className="text-sm cursor-pointer font-medium">すべて</Label>
                            </div>
                          </div>

                          {/* あ行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">あ行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['ア', 'イ', 'ウ', 'エ', 'オ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* か行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">か行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['カ', 'キ', 'ク', 'ケ', 'コ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* さ行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">さ行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['サ', 'シ', 'ス', 'セ', 'ソ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* た行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">た行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['タ', 'チ', 'ツ', 'テ', 'ト'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* な行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">な行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* は行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">は行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ま行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">ま行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['マ', 'ミ', 'ム', 'メ', 'モ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* や行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">や行</div>
                            <div className="grid grid-cols-3 gap-2">
                              {['ヤ', 'ユ', 'ヨ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* ら行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">ら行</div>
                            <div className="grid grid-cols-5 gap-2">
                              {['ラ', 'リ', 'ル', 'レ', 'ロ'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* わ行 */}
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 font-medium">わ行</div>
                            <div className="grid grid-cols-3 gap-2">
                              {['ワ', 'ヲ', 'ン'].map((kana) => (
                                <div key={kana} className="flex items-center space-x-1">
                                  <RadioGroupItem value={kana} id={`kana-${kana}`} />
                                  <Label htmlFor={`kana-${kana}`} className="text-sm cursor-pointer">{kana}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                        </RadioGroup>
                      </div>
                    </div>
                    
                    <CardContent className="p-0">
                      <div className="max-h-[800px] overflow-y-auto">
                        {/* テーブルヘッダー */}
                        <div className="bg-gray-50 px-4 py-3 border-b">
                          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-700">
                            <div className="col-span-2">受付番号</div>
                            <div className="col-span-1">日付</div>
                            <div className="col-span-1">店舗</div>
                            <div className="col-span-2">担当者</div>
                            <div className="col-span-1">区分</div>
                            <div className="col-span-1">ランク</div>
                            <div className="col-span-2">時間</div>
                            <div className="col-span-1">金額</div>
                            <div className="col-span-1">状態</div>
                          </div>
                        </div>
                        
                        {/* テーブルボディ */}
                        <div>
                          {filteredHistory.length > 0 ? (
                            filteredHistory.map((history) => (
                            <div 
                              key={history.id} 
                              className="px-4 py-3 border-b hover:bg-gray-50"
                            >
                              <div className="grid grid-cols-12 gap-2 items-center text-sm">
                                {/* 受付番号 */}
                                <div className="col-span-2 font-semibold text-gray-900">
                                  {history.receptionNumber}
                                </div>
                                
                                {/* 日付 */}
                                <div className="col-span-1 text-gray-600">
                                  {history.date.slice(5)} {/* MM-DD表示 */}
                                </div>
                                
                                {/* 店舗名 */}
                                <div className="col-span-1 text-gray-900 truncate">
                                  {history.storeName}
                                </div>
                                
                                {/* 担当者名 */}
                                <div className="col-span-2 text-gray-900 truncate">
                                  {history.staffName}
                                </div>
                                
                                {/* 区分 */}
                                <div className="col-span-1 text-gray-700 text-xs">
                                  {history.category}
                                </div>
                                
                                {/* ランク */}
                                <div className="col-span-1">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    history.rank === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                                    history.rank === 'S' ? 'bg-purple-100 text-purple-800' :
                                    history.rank === 'A' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {history.rank}
                                  </span>
                                </div>
                                
                                {/* 時間 */}
                                <div className="col-span-2 text-gray-700">
                                  <div className="text-xs">
                                    {history.startTime}
                                    {history.endTime && ` ～ ${history.endTime}`}
                                    {history.status === 'absent' && (
                                      <div className="text-red-600">（欠席）</div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* 金額 */}
                                <div className="col-span-1 text-right font-semibold">
                                  {history.status === 'completed' ? (
                                    <span className="text-gray-900 text-xs">
                                      ¥{(history.amount / 1000).toFixed(0)}k
                                    </span>
                                  ) : (
                                    <span className="text-red-600 text-xs">¥0</span>
                                  )}
                                </div>
                                
                                {/* 状態 */}
                                <div className="col-span-1">
                                  <div className={`w-3 h-3 rounded-full ${
                                    history.status === 'completed'
                                      ? 'bg-blue-500'
                                      : 'bg-red-500'
                                  }`}></div>
                                </div>
                              </div>
                            </div>
                            ))
                          ) : (
                            <div className="px-4 py-12 text-center text-gray-500">
                              <div className="space-y-2">
                                <div className="text-lg">該当する履歴がありません</div>
                                <div className="text-sm">
                                  {kanaFilter !== 'all' && `「${kanaFilter}」で始まる担当者の履歴はありません`}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* フッター情報 */}
                      <div className="border-t px-6 py-4 bg-gray-50">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">終了</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-gray-600">当日欠</span>
                            </div>
                          </div>
                          <div className="font-semibold">
                            {kanaFilter === 'all' ? (
                              `総履歴: ${usageHistory.length}件`
                            ) : (
                              `表示: ${filteredHistory.length}件 / 総履歴: ${usageHistory.length}件`
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </TabsContent>
            
            {/* プロフィールタブ */}
            <TabsContent value="profile" className="mt-6">
              <div className="text-center text-gray-500 py-12">
                <User2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-semibold mb-2">プロフィール</h2>
                <p>このタブの内容は準備中です</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
