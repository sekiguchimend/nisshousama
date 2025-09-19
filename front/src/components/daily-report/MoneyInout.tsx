import React from 'react';
import { MoneyInoutProps } from '../../types/money-inout';

const MoneyInout: React.FC<MoneyInoutProps> = ({ data: moneyInoutData }) => {
    const formatNumber = (num: number | string): string => {
        if(typeof num !== 'number') return String(num);
        return new Intl.NumberFormat('ja-JP').format(num);
    };
    return (
        <div className='w-[782px] flex justify-between'>
            <div className=''>
                {moneyInoutData.title}
            </div>
            <div className='bg-blue-200 w-[100px]'>
                    {formatNumber(moneyInoutData.amount)}
            </div>
        </div>
    )
}

export default MoneyInout;