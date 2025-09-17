import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// コース料金計算関連のユーティリティ関数

/**
 * ホステス取分の金額を計算
 * @param price 料金
 * @param percentage 割合（%）
 * @returns 計算された金額
 */
export function calculateHostessShare(price: number, percentage: number): number {
  return Math.floor(price * (percentage / 100));
}

/**
 * 店舗取分を計算（それぞれのタイプで個別計算）
 * @param price 料金
 * @param freePercentage フリーの割合
 * @param panelPercentage パネルの割合
 * @param nominationPercentage 指名の割合
 * @returns 店舗取分（3種類）
 */
export function calculateStoreShares(
  price: number,
  freePercentage: number,
  panelPercentage: number,
  nominationPercentage: number
) {
  return {
    free: {
      amount: price - calculateHostessShare(price, freePercentage)
    },
    panel: {
      amount: price - calculateHostessShare(price, panelPercentage)
    },
    nomination: {
      amount: price - calculateHostessShare(price, nominationPercentage)
    }
  };
}

/**
 * コース料金の全ての取分を計算
 * @param price 料金
 * @param freePercentage フリーの割合
 * @param panelPercentage パネルの割合
 * @param nominationPercentage 指名の割合
 * @returns 計算された取分情報
 */
export function calculateCourseFeeShares(
  price: number,
  freePercentage: number,
  panelPercentage: number,
  nominationPercentage: number
) {
  const hostessShare = {
    free: {
      percentage: freePercentage,
      amount: calculateHostessShare(price, freePercentage)
    },
    panel: {
      percentage: panelPercentage,
      amount: calculateHostessShare(price, panelPercentage)
    },
    nomination: {
      percentage: nominationPercentage,
      amount: calculateHostessShare(price, nominationPercentage)
    }
  };

  const storeShare = calculateStoreShares(price, freePercentage, panelPercentage, nominationPercentage);

  return {
    hostessShare,
    storeShare
  };
}
