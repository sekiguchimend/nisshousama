import React from 'react';
import { CreditCardProps } from '@/types/credit-card';

const CreditCard: React.FC<CreditCardProps> = ({ data: creditCardData }) => {
  const formatNumber = (num: number | string): string => {
    if (typeof num !== 'number') return String(num);
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  return (
    <div className="border-b border-gray-200 py-2">
      <div className="grid grid-cols-9 gap-2 text-sm">
        {/* 店舗 */}
        <div className="text-gray-700 text-center">
          {creditCardData.store}
        </div>
        
        {/* コース */}
        <div className="text-gray-700 text-center">
          {creditCardData.course}
        </div>
        
        {/* ホステス名 */}
        <div className="text-gray-700 text-center">
          {creditCardData.hostessName}
        </div>
        
        {/* 延長料金 */}
        <div className="text-gray-700 text-right font-mono">
          ¥{formatNumber(creditCardData.extensionFee)}
        </div>
        
        {/* 請求金額 */}
        <div className="text-gray-700 text-right font-mono font-semibold">
          ¥{formatNumber(creditCardData.billAmount)}
        </div>
        
        {/* 店舗取分 */}
        <div className="text-blue-600 text-right font-mono">
          ¥{formatNumber(creditCardData.storeShare)}
        </div>
        
        {/* ホステス取分 */}
        <div className="text-green-600 text-right font-mono">
          ¥{formatNumber(creditCardData.hostessShare)}
        </div>
        
        {/* ホステス預り金 */}
        <div className="text-orange-600 text-right font-mono">
          ¥{formatNumber(creditCardData.hostessDeposit)}
        </div>
        
        {/* OUTドライバ名 */}
        <div className="text-gray-700 text-center">
          {creditCardData.outDriverName}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
