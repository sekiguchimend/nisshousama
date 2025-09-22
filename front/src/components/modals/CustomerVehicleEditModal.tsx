'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Car, Save, X } from "lucide-react";
import type { CustomerVehicle, CustomerVehicleFormData } from "@/types/customer-vehicle";
import {
  regionOptions,
  vehicleTypeOptions,
  vehicleColorOptions,
  hiraganaSymbolOptions,
} from "@/data/customerVehicleSampleData";

interface CustomerVehicleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: CustomerVehicle | null;
  onSave: (vehicle: CustomerVehicle) => void;
}

export default function CustomerVehicleEditModal({
  isOpen,
  onClose,
  vehicle,
  onSave,
}: CustomerVehicleEditModalProps) {
  const [formData, setFormData] = useState<CustomerVehicleFormData>({
    ctNo: '',
    customerName: '',
    vehicleType: '',
    vehicleColor: '',
    region: '',
    classificationNumber: '',
    hiraganaSymbol: '',
    vehicleNumber: '',
    notes: '',
  });

  const [status, setStatus] = useState<'active' | 'inactive' | 'suspended'>('active');

  // フォームデータの初期化
  useEffect(() => {
    if (vehicle) {
      setFormData({
        ctNo: vehicle.ctNo,
        customerName: vehicle.customerName,
        vehicleType: vehicle.vehicleType,
        vehicleColor: vehicle.vehicleColor,
        region: vehicle.region,
        classificationNumber: vehicle.classificationNumber,
        hiraganaSymbol: vehicle.hiraganaSymbol,
        vehicleNumber: vehicle.vehicleNumber,
        notes: vehicle.notes || '',
      });
      setStatus(vehicle.status);
    }
  }, [vehicle]);

  // ナンバープレート作成
  const createPlateNumber = (
    region: string,
    classificationNumber: string,
    hiraganaSymbol: string,
    vehicleNumber: string
  ): string => {
    if (!region || !classificationNumber || !hiraganaSymbol || !vehicleNumber) {
      return '';
    }
    return `${region} ${classificationNumber} ${hiraganaSymbol} ${vehicleNumber}`;
  };

  // 現在のナンバープレート表示
  const currentPlateNumber = createPlateNumber(
    formData.region,
    formData.classificationNumber,
    formData.hiraganaSymbol,
    formData.vehicleNumber
  );

  // フォーム送信
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicle) return;

    const updatedVehicle: CustomerVehicle = {
      ...vehicle,
      ctNo: formData.ctNo,
      customerName: formData.customerName,
      vehicleType: formData.vehicleType,
      vehicleColor: formData.vehicleColor,
      region: formData.region,
      classificationNumber: formData.classificationNumber,
      hiraganaSymbol: formData.hiraganaSymbol,
      vehicleNumber: formData.vehicleNumber,
      plateNumber: currentPlateNumber,
      status,
      notes: formData.notes,
    };

    onSave(updatedVehicle);
    onClose();
  };

  // フォームリセット
  const handleClose = () => {
    onClose();
  };

  // フォーム入力の変更処理
  const handleInputChange = (field: keyof CustomerVehicleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ステータスの日本語表示
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return '有効';
      case 'inactive':
        return '無効';
      case 'suspended':
        return '停止中';
      default:
        return status;
    }
  };

  // ステータスバッジの色取得
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'suspended':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            顧客車情報の編集
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">基本情報</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctNo">CTNo（顧客番号）*</Label>
                <Input
                  id="ctNo"
                  value={formData.ctNo}
                  onChange={(e) => handleInputChange('ctNo', e.target.value)}
                  placeholder="CT001"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerName">顧客名（カタカナ）*</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="タナカ"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleType">車種*</Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleInputChange('vehicleType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="車種を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicleColor">車色*</Label>
                <Select
                  value={formData.vehicleColor}
                  onValueChange={(value) => handleInputChange('vehicleColor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="車色を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleColorOptions.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* ナンバープレート情報 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">ナンバープレート情報</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">地域*</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleInputChange('region', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="地域" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionOptions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="classificationNumber">車種番号*</Label>
                <Input
                  id="classificationNumber"
                  value={formData.classificationNumber}
                  onChange={(e) => handleInputChange('classificationNumber', e.target.value)}
                  placeholder="300"
                  maxLength={3}
                  pattern="[0-9]{3}"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hiraganaSymbol">記号*</Label>
                <Select
                  value={formData.hiraganaSymbol}
                  onValueChange={(value) => handleInputChange('hiraganaSymbol', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="記号" />
                  </SelectTrigger>
                  <SelectContent>
                    {hiraganaSymbolOptions.map((symbol) => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicleNumber">車番号*</Label>
                <Input
                  id="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                  placeholder="1234"
                  maxLength={4}
                  pattern="[0-9]{1,4}"
                  required
                />
              </div>
            </div>

            {/* ナンバープレートプレビュー */}
            {currentPlateNumber && (
              <div className="space-y-2">
                <Label>ナンバープレートプレビュー</Label>
                <div className="p-4 bg-white border-2 border-black rounded-lg inline-block">
                  <div className="text-center">
                    <div className="font-mono text-xl font-bold">{formData.region} {formData.classificationNumber}</div>
                    <div className="font-mono text-xl font-bold">{formData.hiraganaSymbol} {formData.vehicleNumber}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ステータスと備考 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">設定</h3>
            
            <div className="space-y-2">
              <Label>ステータス</Label>
              <div className="flex gap-2">
                {(['active', 'inactive', 'suspended'] as const).map((statusOption) => (
                  <Button
                    key={statusOption}
                    type="button"
                    variant={status === statusOption ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatus(statusOption)}
                  >
                    <Badge variant={getStatusBadgeVariant(statusOption)} className="mr-1">
                      {getStatusLabel(statusOption)}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="備考を入力..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              <X className="w-4 h-4 mr-1" />
              キャンセル
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-1" />
              保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
