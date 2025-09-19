import React from 'react';
import { SalesReportProps } from '../../types/sales-report';

const SalesReport: React.FC<SalesReportProps> = ({ data: reportData }) => {

  // 数字を3桁区切りのカンマ付き文字列にフォーマットする
  const formatNumber = (num: number | string): string => {
    if (typeof num !== 'number') return String(num);
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  return (
    <div className="grid grid-cols-6 w-[782px] border border-gray-400 bg-white font-sans text-sm">
      {/* 1行目: ヘッダー */}
      <div className="col-span-1 px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-200 font-bold justify-center">
        売上リスト
      </div>
      <div className="col-span-5 px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-red-200 font-bold text-base justify-center">
        {reportData.storeName}
      </div>

      {/* 2行目 */}
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        店売上現金計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.cashSales)}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        領収証発行
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.receiptsIssued)}件
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        給料日計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.payrollDaily)}
      </div>

      {/* 3行目 */}
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        店売上カード計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {`${formatNumber(reportData.cardSales)} ${reportData.cardSalesCount}件`}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        割引チケット利用
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.discountTickets)}件
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        派遣回数日計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.dispatchDaily)}
      </div>
      
      {/* 4行目 */}
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        店売上計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.totalStoreSales)}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        未回収売掛金額計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {reportData.uncollectedReceivables}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        指名回数日計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.nominationDaily)}
      </div>

      {/* 5行目 */}
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        カード請求計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.cardBilling)}
      </div>
      <div className="col-span-2 px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-center">
        入金計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        HF指名回数日計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.hfNominationDaily)}
      </div>
      
      {/* 6行目 */}
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        カード加算金額計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.cardSurcharge)}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        出金計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.withdrawals)}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        旧現金収入計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.oldCashRevenue)}
      </div>

      {/* 7行目 */}
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        その他売上計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {reportData.otherSales}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        報告金額
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.reportedAmount)}
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        旧報告金額
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.oldReportedAmount)}
      </div>

      {/* 8行目 */}
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] bg-gray-100 justify-start">
        現金収入計
      </div>
      <div className="px-2 py-1 border border-gray-300 flex items-center min-h-[28px] justify-end font-mono">
        {formatNumber(reportData.cashRevenue)}
      </div>
      {/* 空白セル */}
      <div className="col-span-4 border-none bg-white"></div>
    </div>
  );
};

export default SalesReport;
