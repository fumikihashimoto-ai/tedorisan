import { calculateTakeHome } from '@/lib/salaryCalculator';

export type RequiredAnnualIncomeResult = {
  annualIncome: number;
  monthlyGross: number;
  incomeTax: number;
  residentTax: number;
  socialInsurance: number;
  takehomeRate: number;
};

export function calculateRequiredAnnualIncome(
  monthlyTakehome: number,
  dependents: number = 0
): RequiredAnnualIncomeResult {
  // 目標の年手取り（円）
  const yearlyTakehomeTarget = monthlyTakehome * 12;

  // 下限は「手取り=額面」と仮定した値
  let low = yearlyTakehomeTarget;

  // 上限は安全に増やしながら確保する（年収が高いほど手取りが増える前提）
  let high = Math.max(yearlyTakehomeTarget * 1.5, yearlyTakehomeTarget + 1);
  for (let i = 0; i < 30; i++) {
    const calc = calculateTakeHome(high, dependents);
    if (calc.takeHome >= yearlyTakehomeTarget) break;
    high *= 1.2;
  }

  let best = (low + high) / 2;

  // 二分探索で「目標の年手取り」を満たす年収を探す
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    const calc = calculateTakeHome(mid, dependents);
    const diff = calc.takeHome - yearlyTakehomeTarget;

    // 誤差1000円以内なら終了
    if (Math.abs(diff) < 1000) {
      best = mid;
      break;
    }

    if (diff < 0) {
      // 手取りが足りない → 年収を上げる
      low = mid;
    } else {
      // 手取りが多い → 年収を下げる
      high = mid;
    }

    best = (low + high) / 2;
  }

  const finalCalc = calculateTakeHome(best, dependents);

  return {
    annualIncome: Math.round(best),
    monthlyGross: Math.round(best / 12),
    incomeTax: finalCalc.breakdown.incomeTax,
    residentTax: finalCalc.breakdown.residentTax,
    socialInsurance: finalCalc.breakdown.socialInsurance,
    takehomeRate: Math.round((yearlyTakehomeTarget / best) * 100 * 10) / 10,
  };
}

