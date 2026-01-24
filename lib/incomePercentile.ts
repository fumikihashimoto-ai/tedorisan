/**
 * 年収からパーセンタイルを計算する関数
 */

export interface IncomePercentileResult {
  percentile: number;
  rank: string;
  averageDiff: number;
  message: string;
}

const AVERAGE_INCOME = 4430000; // 平均年収443万円

export function getIncomePercentile(annualIncome: number): IncomePercentileResult {
  const incomeInMan = annualIncome / 10000; // 万円単位に変換
  const averageDiff = annualIncome - AVERAGE_INCOME;

  let percentile: number;
  let rank: string;
  let message: string;

  if (incomeInMan >= 1000) {
    percentile = 5;
    rank = '上位5%';
    message = '高収入層です。さらに上を目指せます。';
  } else if (incomeInMan >= 800) {
    percentile = 10;
    rank = '上位10%';
    message = '高収入層です。さらに上を目指せます。';
  } else if (incomeInMan >= 600) {
    percentile = 25;
    rank = '上位25%';
    message = '高収入層です。さらに上を目指せます。';
  } else if (incomeInMan >= 500) {
    percentile = 35;
    rank = '上位35%';
    message = '平均以上の収入です。転職で大きく伸ばせる可能性があります。';
  } else if (incomeInMan >= 443) {
    percentile = 50;
    rank = '上位50%';
    message = '平均以上の収入です。転職で大きく伸ばせる可能性があります。';
  } else if (incomeInMan >= 400) {
    percentile = 60;
    rank = '上位60%';
    message = '転職で収入UPのチャンスが大きいです。';
  } else if (incomeInMan >= 300) {
    percentile = 75;
    rank = '上位75%';
    message = '転職で収入UPのチャンスが大きいです。';
  } else {
    percentile = 90;
    rank = '上位90%';
    message = '転職で収入UPのチャンスが大きいです。';
  }

  return {
    percentile,
    rank,
    averageDiff,
    message,
  };
}
