'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User2, MapPin, Plus, Trash2, ArrowLeft } from "lucide-react";
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

interface PreferenceForm {
  rank: 'A' | 'B' | 'C';
  favoriteType: string;
  speakingStyle: string;
  dislikedType: string;
}

interface ReceiptForm {
  recipient: string;
  note: string;
}

type PetOption = 'dog' | 'cat' | 'none' | 'other';
type WorkAreaOption = 'local' | 'business_trip';

export default function CustomerLedger() {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(sampleCustomers[0]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: '1', type: 'BMW 7シリーズ', color: 'ブラック', number: '品川300あ1234' }
  ]);
  
  const [kanaFilter, setKanaFilter] = useState<string>('all');
  const [preferenceForm, setPreferenceForm] = useState<PreferenceForm>({
    rank: 'A',
    favoriteType: '',
    speakingStyle: '',
    dislikedType: ''
  });
  const [petSelections, setPetSelections] = useState<Record<PetOption, boolean>>({
    dog: false,
    cat: false,
    none: false,
    other: false
  });
  const [workArea, setWorkArea] = useState<WorkAreaOption>('local');
  const [receiptForm, setReceiptForm] = useState<ReceiptForm>({
    recipient: '',
    note: ''
  });
  
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
      staffName: 'あ',
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

  // 五十音グリッド配置（指定の並び）
  const rawKanaRows = [
    'あかさたなはまやらわ',
    'いきしちにひみ　り　',
    'うくすつぬふぬゆるを',
    'えけせてねへめ　れ　',
    'おこそとのほもよろん'
  ];

  const kanaGridRows: string[][] = rawKanaRows.map(row =>
    Array.from(row).map(char => (char === '　' ? '' : char))
  );

  const petOptions: { key: PetOption; label: string }[] = [
    { key: 'dog', label: '犬' },
    { key: 'cat', label: '猫' },
    { key: 'none', label: 'なし' },
    { key: 'other', label: 'その他' }
  ];

  const handlePreferenceChange = (field: keyof PreferenceForm, value: string) => {
    setPreferenceForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePetSelection = (option: PetOption) => {
    setPetSelections(prev => {
      const next = { ...prev };
      if (option === 'none') {
        // 「なし」を選択したら他を解除
        next.none = !prev.none;
        if (next.none) {
          next.dog = false;
          next.cat = false;
          next.other = false;
        }
      } else {
        const newValue = !prev[option];
        next[option] = newValue;
        if (newValue && prev.none) {
          next.none = false;
        }
      }
      return next;
    });
  };

  const handleReceiptChange = (field: keyof ReceiptForm, value: string) => {
    setReceiptForm(prev => ({
      ...prev,
      [field]: value
    }));
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
          <ArrowLeft className="h-4 w-4" />
          ダッシュボードに戻る
        </Button>
      </div>

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
            <TabsContent value="basic-info" className="mt-6 text-sm">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.3fr_1fr]">
                
                {/* 左カラム - 基本情報入力エリア */}
                <div className="space-y-8">
                  
                  {/* 電話番号（複数欄） */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
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
                    <CardContent className="p-6 space-y-4">
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
                    <CardContent className="p-6 space-y-4">
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
                    <CardContent className="p-6 space-y-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="newsletter" />
                          <Label htmlFor="newsletter">メルマガ有無</Label>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-700">地元 / 出張</span>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="work-area"
                                value="local"
                                checked={workArea === 'local'}
                                onChange={() => setWorkArea('local')}
                                className="h-4 w-4"
                              />
                              <span>地元</span>
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="work-area"
                                value="business_trip"
                                checked={workArea === 'business_trip'}
                                onChange={() => setWorkArea('business_trip')}
                                className="h-4 w-4"
                              />
                              <span>出張</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 住所 */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
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
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="region">地域</Label>
                          <Input id="region" placeholder="京都" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="area-code">コード</Label>
                          <Input id="area-code" placeholder="21" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="place-name">地名</Label>
                          <Input id="place-name" placeholder="地名を入力" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 交通費・利用場所 */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="transportation-fee">交通費</Label>
                          <Input id="transportation-fee" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="main-usage">主な利用場所</Label>
                          <Input id="main-usage" placeholder="主な利用場所を入力" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="latitude">北緯</Label>
                          <Input id="latitude" type="number" step="0.0001" placeholder="35.6762" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="longitude">東経</Label>
                          <Input id="longitude" type="number" step="0.0001" placeholder="139.6503" />
                        </div>
                      </div>
                      <Textarea 
                        id="hotel-notes" 
                        placeholder="ホテルに関する備考を入力してください"
                        className="min-h-[100px]"
                      />
                    </CardContent>
                  </Card>

                  {/* 車両情報 */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={addVehicle}
                          className="flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          車両追加
                        </Button>
                      </div>
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
                    <CardContent className="space-y-4">
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

                {/* 中央カラム - 好み情報 */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" variant="outline">顧客の統計</Button>
                    <Button size="sm" variant="outline">全履歴表示</Button>
                    <Button size="sm" variant="outline">ポイント履歴</Button>
                    <Button size="sm" variant="outline">初期ポイント入力</Button>
                  </div>
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="notes">備考</Label>
                          <Textarea 
                            id="notes" 
                            placeholder="備考を入力してください"
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                      {/* ランク */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">ランク (A〜C)</div>
                        <div className="flex gap-3">
                          {(['A', 'B', 'C'] as PreferenceForm['rank'][]).map(rankOption => (
                            <Button
                              key={rankOption}
                              type="button"
                              variant={preferenceForm.rank === rankOption ? 'default' : 'outline'}
                              className="flex-1"
                              onClick={() => handlePreferenceChange('rank', rankOption)}
                            >                                {rankOption}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* 好みタイプ */}
                      <div className="space-y-2">
                        <Label htmlFor="favoriteType" className="text-sm font-medium text-gray-700">
                          好みタイプ
                        </Label>
                        <Input
                          id="favoriteType"
                          value={preferenceForm.favoriteType}
                          onChange={e => handlePreferenceChange('favoriteType', e.target.value)}
                          placeholder="例：明るい、面倒見が良い"
                        />
                      </div>

                      {/* 話し方 */}
                      <div className="space-y-2">
                        <Label htmlFor="speakingStyle" className="text-sm font-medium text-gray-700">
                          話し方
                        </Label>
                        <Input
                          id="speakingStyle"
                          value={preferenceForm.speakingStyle}
                          onChange={e => handlePreferenceChange('speakingStyle', e.target.value)}
                          placeholder="例：落ち着いたトーンで、ゆっくりと話す"
                        />
                      </div>

                      {/* 嫌いタイプ */}
                      <div className="space-y-2">
                        <Label htmlFor="dislikedType" className="text-sm font-medium text-gray-700">
                          嫌いタイプ
                        </Label>
                        <Input
                          id="dislikedType"
                          value={preferenceForm.dislikedType}
                          onChange={e => handlePreferenceChange('dislikedType', e.target.value)}
                          placeholder="例：押しが強い、無口"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* ペット */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="text-sm font-medium text-gray-700">ペット</div>
                      <div className="grid grid-cols-2 gap-3">
                        {petOptions.map(option => (
                          <label key={option.key} className="flex items-center gap-2 text-sm text-gray-700">
                            <Checkbox
                              checked={petSelections[option.key]}
                              onCheckedChange={() => togglePetSelection(option.key)}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  {/* 領収書情報 */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="receipt-recipient" className="text-sm font-medium text-gray-700">
                            領収書宛先
                          </Label>
                          <Input
                            id="receipt-recipient"
                            value={receiptForm.recipient}
                            onChange={e => handleReceiptChange('recipient', e.target.value)}
                            placeholder="例：株式会社〇〇 御中"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="receipt-note" className="text-sm font-medium text-gray-700">
                            領収書但書
                          </Label>
                          <Input
                            id="receipt-note"
                            value={receiptForm.note}
                            onChange={e => handleReceiptChange('note', e.target.value)}
                            placeholder="例：お品代"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* ドライバ・NG情報 */}
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-driver" className="text-sm font-medium text-gray-700">
                          Fisstドライバ名
                        </Label>
                        <Textarea
                          id="first-driver"
                          placeholder="Fisstドライバ名を入力してください"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shop-ng" className="text-sm font-medium text-gray-700">
                          店NG
                        </Label>
                        <Textarea
                          id="shop-ng"
                          placeholder="店NGの情報を入力してください"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">ホステス・顧客 NG / 連絡</div>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>ホステス → 顧客NG</li>
                          <li>顧客 → ホステスNG</li>
                          <li>アドレス交換</li>
                          <li>内容判明し次第実装</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 右カラム - 利用履歴リスト */}
                <div className="space-y-6">
                  <Card>
                    {/* カタカナフィルター */}
                    <div className="px-6 py-4 border-b bg-gray-50">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">担当者名で検索（五十音）</Label>
                        <RadioGroup 
                          value={kanaFilter} 
                          onValueChange={setKanaFilter}
                          className="space-y-3"
                        >
                          {/* すべて */}
                          <div className="pb-2 border-b">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="all" />
                              <Label htmlFor="all" className="text-sm cursor-pointer font-medium">すべて</Label>
                            </div>
                          </div>

                          {/* 五十音表（回転配置） */}
                          <div className="space-y-2 overflow-x-auto">
                            {kanaGridRows.map((row, rowIndex) => (
                              <div key={`row-${rowIndex}`} className="flex items-center gap-2">
                                {row.map((kana, colIndex) => (
                                  kana ? (
                                    <div key={`kana-${rowIndex}-${colIndex}`} className="flex items-center space-x-1">
                                      <RadioGroupItem value={kana} id={`kana-${rowIndex}-${colIndex}`} className="scale-90" />
                                      <Label htmlFor={`kana-${rowIndex}-${colIndex}`} className="text-sm cursor-pointer">
                                        {kana}
                                      </Label>
                                    </div>
                                  ) : (
                                    <div key={`blank-${rowIndex}-${colIndex}`} className="w-8 h-6" />
                                  )
                                ))}
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <CardContent className="p-0">
                      <div className="min-h-[800px] overflow-y-auto">
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
