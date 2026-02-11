/**
 * 汎用比較表用データ・ロジック
 * 診断結果に基づいておすすめサービスを取得
 */

import type { AgeRange, DiagnosisResult, Situation } from '@/lib/diagnosisLogic';

// ============================================================
// 型定義
// ============================================================

export interface AffiliateService {
  id: string;
  name: string;
  description: string;
  features: string[];
  /** アフィリエイトリンクURL（A8.net等） */
  affiliateUrl: string;
  /** A8.netバナーHTML（オプショナル） */
  bannerHtml?: string;
  /** 報酬額（円） */
  commission: number;
  /** 成約率（%） */
  confirmationRate: number;
  /** EPC（1クリックあたり報酬） */
  epc: number;
  targetAge: AgeRange[];
  targetSituation: Situation[];
  /** 星評価（1-5） */
  rating: number;
  /** PR枠かどうか */
  isPr: boolean;
}

// ============================================================
// 広告主データ（A8.net等）
// ============================================================

export const affiliateServices: AffiliateService[] = [
  {
    id: 'rax-partners',
    name: 'ラクスパートナーズ',
    description: '23-30歳の未経験者に特化したIT転職',
    features: [
      '23-30歳に特化',
      '未経験者を丁寧にサポート',
      '自社開発企業多数',
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4G5MIA+5SN4+5YJRM',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4G5MIA+5SN4+5YZ75" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www23.a8.net/svt/bgt?aid=260126641269&wid=001&eno=01&mid=s00000027040001003000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4AVF01+4G5MIA+5SN4+5YZ75" alt="">`,
    commission: 20000,
    confirmationRate: 20,
    epc: 400,
    targetAge: ['20s'],
    targetSituation: ['it_beginner'],
    rating: 4,
    isPr: false,
  },
  {
    id: 'daini-neo',
    name: '第二新卒エージェントneo',
    description: '第二新卒・既卒の転職に強い',
    features: [
      '第二新卒・既卒に強い',
      '1人平均8時間サポート',
      '内定後も手厚いフォロー',
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+67JUA',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+66H9D" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?aid=260126641268&wid=001&eno=01&mid=s00000018427001038000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4AVF01+4FK6WI+3Y6M+66H9D" alt="">`,
    commission: 15000,
    confirmationRate: 38.28,
    epc: 574,
    targetAge: ['20s', '30s', '40s'],
    targetSituation: ['it_beginner'],
    rating: 4.5,
    isPr: false,
  },
  {
    id: 'pharmacist',
    name: 'ファルマスタッフ',
    description: '薬剤師専門の転職・派遣',
    features: [
      '薬剤師専門',
      '調剤薬局求人数業界最大級',
      '高年収求人多数',
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+609HU',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+65EOH" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=260126641284&wid=001&eno=01&mid=s00000010261001033000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+65EOH" alt="">`,
    commission: 60000,
    confirmationRate: 54.05,
    epc: 3243,
    targetAge: ['20s', '30s', '40s', '50s'],
    targetSituation: ['pharmacist'],
    rating: 5,
    isPr: false,
  },
  {
    id: 'deepro',
    name: 'ディープロ',
    description: 'プログラミング学習と転職サポート',
    features: [
      '実践的なプログラミング学習',
      '転職サポート付き',
      '年齢制限なし',
    ],
    affiliateUrl: 'https://h.accesstrade.net/sp/cc?rk=0100knoa00onsa',
    bannerHtml: `<a href="https://h.accesstrade.net/sp/cc?rk=0100kno300onsa" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer-when-downgrade" target="_blank"><img src="https://h.accesstrade.net/sp/rr?rk=0100kno300onsa" alt="ディープロ" border="0" /></a>`,
    commission: 22000,
    confirmationRate: 30,
    epc: 660,
    targetAge: ['20s', '30s', '40s'],
    targetSituation: ['skill_learning'],
    rating: 4.5,
    isPr: false,
  },
  {
    id: 'shanai-se-navi',
    name: '社内SE転職ナビ',
    description: '社内SE専門の転職支援',
    features: [
      '社内SE専門',
      'ワークライフバランス重視',
      'カジュアル面談可能',
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4ASQ2A+3IZO+I4FNM',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www25.a8.net/svt/bgt?aid=260126641260&wid=001&eno=01&mid=s00000016458003031000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH" alt="">`,
    commission: 20000,
    confirmationRate: 52.54,
    epc: 1050,
    targetAge: ['20s', '30s', '40s'],
    targetSituation: ['it_beginner', 'it_experienced'],
    rating: 4,
    isPr: false,
  },
  {
    id: 'meiko-career-partners',
    name: '明光キャリアパートナーズ',
    description: 'IT経験者向けハイクラス転職',
    features: [
      'IT経験者専門',
      '高年収案件多数',
      'ハイクラス転職に強い',
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4QVFEA+5P1E+5YJRM',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4QVFEA+5P1E+5YZ75" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=260126641287&wid=001&eno=01&mid=s00000026573001003000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=4AVF01+4QVFEA+5P1E+5YZ75" alt="">`,
    commission: 78000,
    confirmationRate: 17.14,
    epc: 1337,
    targetAge: ['30s', '40s', '50s'],
    targetSituation: ['it_experienced'],
    rating: 4.5,
    isPr: false,
  },
];

// ============================================================
// 診断結果からサービス取得
// ============================================================

const MAX_RECOMMENDED = 3;

/**
 * 診断結果に基づいておすすめサービスを取得する。
 * - 診断結果の age, situation でフィルタリング
 * - isPr: true を最優先
 * - その後は EPC 降順でソート
 * - 最大3件を返す
 */
export function getRecommendedServices(
  result: DiagnosisResult
): AffiliateService[] {
  const filtered = affiliateServices.filter((service) => {
    const ageMatch = service.targetAge.includes(result.age);
    const situationMatch = service.targetSituation.includes(result.situation);
    return ageMatch && situationMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.isPr && !b.isPr) return -1;
    if (!a.isPr && b.isPr) return 1;
    return b.epc - a.epc;
  });

  return sorted.slice(0, MAX_RECOMMENDED);
}
