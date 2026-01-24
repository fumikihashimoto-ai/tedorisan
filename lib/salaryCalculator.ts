/**
 * 2026年日本の税制に基づいた手取り計算関数
 */

/**
 * 手取り計算結果の型定義
 */
export interface TakeHomeResult {
  takeHome: number; // 手取り年収
  monthlyTakeHome: number; // 手取り月収
  breakdown: {
    incomeTax: number; // 所得税
    residentTax: number; // 住民税
    socialInsurance: number; // 社会保険料
  };
  effectiveTaxRate: string; // 実効税率（%表示）
}

/**
 * 給与所得控除を計算する
 * @param annualSalary 年収（円）
 * @returns 給与所得控除額（円）
 */
function calculateSalaryIncomeDeduction(annualSalary: number): number {
  const salaryInMan = annualSalary / 10000; // 万円単位に変換

  if (salaryInMan <= 162.5) {
    // 年収162.5万円以下: 55万円
    return 550000;
  } else if (salaryInMan <= 180) {
    // 年収162.5万円超180万円以下: 年収×40%-10万円
    return Math.floor(annualSalary * 0.4 - 100000);
  } else if (salaryInMan <= 360) {
    // 年収180万円超360万円以下: 年収×30%+8万円
    return Math.floor(annualSalary * 0.3 + 80000);
  } else if (salaryInMan <= 660) {
    // 年収360万円超660万円以下: 年収×20%+44万円
    return Math.floor(annualSalary * 0.2 + 440000);
  } else if (salaryInMan <= 850) {
    // 年収660万円超850万円以下: 年収×10%+110万円
    return Math.floor(annualSalary * 0.1 + 1100000);
  } else {
    // 年収850万円超: 195万円（上限）
    return 1950000;
  }
}

/**
 * 所得税を計算する（累進課税）
 * @param taxableIncome 課税所得（円）
 * @returns 所得税額（円）
 */
function calculateIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) {
    return 0;
  }

  const incomeInMan = taxableIncome / 10000; // 万円単位に変換

  if (incomeInMan <= 195) {
    // 195万円以下: 5%
    return Math.floor(taxableIncome * 0.05);
  } else if (incomeInMan <= 330) {
    // 195万円超330万円以下: 10% - 97,500円
    return Math.floor(taxableIncome * 0.1 - 97500);
  } else if (incomeInMan <= 695) {
    // 330万円超695万円以下: 20% - 427,500円
    return Math.floor(taxableIncome * 0.2 - 427500);
  } else if (incomeInMan <= 900) {
    // 695万円超900万円以下: 23% - 636,000円
    return Math.floor(taxableIncome * 0.23 - 636000);
  } else if (incomeInMan <= 1800) {
    // 900万円超1,800万円以下: 33% - 1,536,000円
    return Math.floor(taxableIncome * 0.33 - 1536000);
  } else if (incomeInMan <= 4000) {
    // 1,800万円超4,000万円以下: 40% - 2,796,000円
    return Math.floor(taxableIncome * 0.4 - 2796000);
  } else {
    // 4,000万円超: 45% - 4,796,000円
    return Math.floor(taxableIncome * 0.45 - 4796000);
  }
}

/**
 * 住民税を計算する
 * @param taxableIncome 課税所得（円）
 * @returns 住民税額（円）
 */
function calculateResidentTax(taxableIncome: number): number {
  if (taxableIncome <= 0) {
    return 0;
  }
  // 住民税: 課税所得×10%
  return Math.floor(taxableIncome * 0.1);
}

/**
 * 社会保険料を計算する（概算）
 * @param annualSalary 年収（円）
 * @returns 社会保険料（円）
 */
function calculateSocialInsurance(annualSalary: number): number {
  // 社会保険料: 年収×15%（概算）
  return Math.floor(annualSalary * 0.15);
}

/**
 * 手取り年収を計算する
 * @param annualSalary 年収（円）
 * @param dependents 扶養人数（デフォルト: 0）
 * @returns 手取り計算結果
 */
export function calculateTakeHome(
  annualSalary: number,
  dependents: number = 0
): TakeHomeResult {
  // 1. 給与所得控除の計算
  const salaryIncomeDeduction = calculateSalaryIncomeDeduction(annualSalary);

  // 2. 所得控除の計算
  const basicDeduction = 480000; // 基礎控除: 48万円
  const dependentDeduction = 380000 * dependents; // 扶養控除: 38万円×扶養人数
  const totalDeduction = basicDeduction + dependentDeduction;

  // 3. 課税所得の計算
  const taxableIncome = Math.max(
    0,
    annualSalary - salaryIncomeDeduction - totalDeduction
  );

  // 4. 所得税の計算
  const incomeTax = calculateIncomeTax(taxableIncome);

  // 5. 住民税の計算
  const residentTax = calculateResidentTax(taxableIncome);

  // 6. 社会保険料の計算
  const socialInsurance = calculateSocialInsurance(annualSalary);

  // 7. 手取りの計算
  const takeHome = annualSalary - incomeTax - residentTax - socialInsurance;

  // 8. 実効税率の計算
  const totalTax = incomeTax + residentTax + socialInsurance;
  const effectiveTaxRate =
    annualSalary > 0 ? ((totalTax / annualSalary) * 100).toFixed(2) : "0.00";

  return {
    takeHome: Math.max(0, takeHome),
    monthlyTakeHome: Math.max(0, Math.floor(takeHome / 12)),
    breakdown: {
      incomeTax,
      residentTax,
      socialInsurance,
    },
    effectiveTaxRate: `${effectiveTaxRate}%`,
  };
}
