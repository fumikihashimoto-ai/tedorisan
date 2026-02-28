import type { SalaryTableData } from '@/app/lib/types/salaryData';

/**
 * ITエンジニアの年収相場データ
 */
export const itEngineerSalaryData: SalaryTableData = {
  title: '経験年数別の年収相場',
  rows: [
    {
      ageGroup: '20代前半',
      experience: '0～4年',
      salary: '300万円～400万円台前半',
      role: 'プログラミング、テスト、保守運用、IT基礎知識、学習意欲',
    },
    {
      ageGroup: '20代後半',
      experience: '3～7年',
      salary: '400万円台前半～500万円台前半',
      role: '詳細設計、小規模開発、技術力向上、問題解決能力',
    },
    {
      ageGroup: '30代前半',
      experience: '6～10年',
      salary: '500万円台前半～600万円台後半',
      role: '要件定義、基本設計、プロジェクトリーダー補佐、専門性確立、リーダーシップ',
    },
    {
      ageGroup: '30代後半',
      experience: '9～13年',
      salary: '600万円台後半～700万円台後半',
      role: 'プロジェクトリーダー、システム設計、顧客折衝、マネジメントスキル、上流工程経験',
    },
    {
      ageGroup: '40代前半',
      experience: '12～16年',
      salary: '600万円台後半～800万円台',
      role: 'プロジェクトマネージャー、ITコンサルタント、ITアーキテクト、戦略立案能力、育成能力',
    },
    {
      ageGroup: '40代後半～50代',
      experience: '15年以上',
      salary: '700万円台～900万円以上',
      role: '部門長、技術顧問、事業戦略、組織運営、高い専門性とマネジメント能力',
    },
  ],
};

/**
 * 薬剤師の年収相場データ（将来用）
 */
export const pharmacistSalaryData: SalaryTableData = {
  title: '経験年数別の年収相場',
  rows: [
    // 将来的に薬剤師データを追加
  ],
};

/**
 * 保育士の年収相場データ（将来用）
 */
export const nurserySalaryData: SalaryTableData = {
  title: '経験年数別の年収相場',
  rows: [
    // 将来的に保育士データを追加
  ],
};
