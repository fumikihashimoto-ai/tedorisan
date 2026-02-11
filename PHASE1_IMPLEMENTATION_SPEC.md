# V2.Phase 1 実装設計書：診断ツール中心のサイト再設計

## 📋 プロジェクト概要

**プロジェクト名**: tedorisan.jp 診断ツール実装（Phase 1）  
**目的**: 不労所得を生み出すWEBサービスのCV最適化  
**期間**: 1週間（7日間）  
**実装者**: Kuma + Cursor AI  

---

## 🎯 目標とKPI

### ビジネス目標
- 月間アフィリエイトクリック: 11件 → 50-80件（4-7倍）
- 初コンバージョン獲得: 1-3件/月
- ユーザーエンゲージメント向上

### 技術目標
- 診断ツールの実装（3問、動的結果表示）
- 汎用比較表の実装（URLパラメータ対応）
- 既存コンテンツのアコーディオン化
- GA4イベント計測の実装

---

## 📊 現状分析と課題

### 現在のTOPページ構造
```
app/page.tsx
├─ ヒーロー画像
├─ h1「年収の手取りを最速で計算...」
├─ HomeClient（手取り計算ツール）
│  ├─ リード文
│  ├─ 計算ツール
│  └─ 教育コンテンツ（7セクション、4,000-5,000文字）
└─ TopPageSidebar
```

### 課題
1. **CVへの導線が弱い**: CTAが最下部のみ
2. **ユーザーニーズとのミスマッチ**: 手取り計算がゴール化している
3. **広告主への送客が遅い**: 診断→記事→ツール→FAQ→CTA（最下部）

### 解決策
- **診断ツール**: ユーザーの深層ニーズ（年収アップ）を3問で特定
- **即座のCTA配置**: 診断結果直後に複数配置
- **アコーディオン化**: 教育コンテンツを折りたたみ、初期表示を軽量化

---

## 🏗️ 新TOPページ構造（確定版）

```
app/page.tsx（改修後）

【ファーストビュー - すぐ行動したい人向け】
├─ セクション1: 診断ツール（3問）★新規
├─ セクション2: 診断結果＋CTA ★新規
└─ セクション3: PR枠（TechGo強調）★新規

【セカンドビュー - 手取り計算したい人向け】
├─ セクション4: 手取り計算ツール ★既存（軽微改修）
│  ├─ セクション見出し「年収から手取りを詳しく計算」追加
│  ├─ 既存の計算ツール（HomeClient）
│  └─ 「詳しく知りたい方へ」ボタン

【サードビュー - じっくり勉強したい人向け】
└─ セクション5: 詳しく学ぶ（アコーディオン）★既存をラップ
   ├─ 額面と手取りの違い
   ├─ 社会保険料の詳細
   ├─ 税金の詳細
   ├─ シミュレーション例
   ├─ 手取りを増やす方法
   └─ まとめ

【最終CTA】
└─ セクション6: あなたに合った方法を見つける ★新規
```

---

## 📁 ファイル構成（作成・改修一覧）

### 新規作成ファイル

#### コンポーネント
```
app/components/
├─ DiagnosisForm.tsx ★新規 - 診断フォーム（3問）
├─ DiagnosisResult.tsx ★新規 - 診断結果表示＋CTA
├─ ServiceCard.tsx ★新規 - サービスカード
├─ ComparisonTable.tsx ★新規 - 比較表（汎用）
├─ DetailedContentAccordion.tsx ★新規 - アコーディオン
├─ PrSection.tsx ★新規 - PR枠（TechGo）
└─ FinalCta.tsx ★新規 - 最終CTA
```

#### ページ
```
app/
├─ comparison/
│  └─ services/
│     ├─ page.tsx ★新規 - 汎用比較表ページ
│     └─ ComparisonClient.tsx ★新規 - クライアント部分
└─ qualifications/
   └─ courses/
      ├─ page.tsx ★新規 - 資格講座ページ
      └─ CoursesClient.tsx ★新規 - クライアント部分
```

#### ロジック・データ
```
lib/
├─ diagnosisLogic.ts ★新規 - 診断ロジック
├─ comparisonData.ts ★新規 - 比較表データ＋ロジック
└─ affiliateData.ts ★新規 - アフィリエイトデータ
```

### 改修ファイル
```
app/
├─ page.tsx ★改修 - TOPページに診断統合
└─ components/
   └─ HomeClient.tsx ★改修 - アコーディオン対応
```

---

## 🔧 実装詳細仕様

### 1. 診断ツール（DiagnosisForm.tsx）

#### 質問設計
```typescript
// Q1: 年齢を教えてください
type AgeRange = '20s' | '30s' | '40s' | '50s' | '60s_plus';

// Q2: 現在の状況に最も近いものは？
type Situation = 
  | 'it_beginner'      // IT業界へ転職したい（未経験）
  | 'it_experienced'   // IT業界で年収アップしたい（経験者）
  | 'pharmacist'       // 薬剤師として転職したい
  | 'skill_learning';  // まずはスキルを身につけたい

// Q3: 最も重視することは？
type Priority = 
  | 'income'           // 収入アップ
  | 'beginner_friendly' // 未経験でも始めやすい
  | 'stability'        // 安定性
  | 'skill_acquisition' // スキル習得
  | 'flexibility';     // 柔軟な働き方
```

#### コンポーネント仕様
```typescript
interface DiagnosisFormProps {
  onComplete: (result: DiagnosisResult) => void;
}

interface DiagnosisResult {
  age: AgeRange;
  situation: Situation;
  priority: Priority;
}

// 状態管理
const [currentQuestion, setCurrentQuestion] = useState(1);
const [answers, setAnswers] = useState<Partial<DiagnosisResult>>({});
const [isComplete, setIsComplete] = useState(false);

// UI仕様
- ラジオボタン形式（各質問4-5選択肢）
- 「次へ」ボタンで質問遷移
- 最終質問で「診断結果を見る」ボタン
- 進捗表示（1/3, 2/3, 3/3）
```

#### スタイリング
```css
- カード型UI（bg-white, border, shadow）
- 選択肢はホバー効果付き
- 選択済みはblue系のborder
- モバイル最適化（スタック表示）
```

---

### 2. 診断結果表示（DiagnosisResult.tsx）

#### 表示ロジック
```typescript
import { getRecommendedServices } from '@/lib/comparisonData';

interface DiagnosisResultProps {
  result: DiagnosisResult;
}

// 診断結果からサービスを取得
const services = getRecommendedServices(result);

// 表示内容
1. 診断結果サマリー
   - 「あなたに最適な方法は...」
   - パーソナライズされたメッセージ

2. おすすめサービス（3つ）
   - ServiceCard × 3
   - 星評価（★★★★★）
   - 特徴3つ（箇条書き）
   - CTAボタン「無料で相談する」「詳しく見る」

3. 比較表への誘導
   - 「さらに詳しく比較する」ボタン
   - リンク先: /comparison/services/?age={age}&situation={situation}&priority={priority}
```

#### GA4イベント計測
```typescript
// 診断完了イベント
gtag('event', 'diagnosis_complete', {
  age: result.age,
  situation: result.situation,
  priority: result.priority,
});

// CTA クリックイベント
gtag('event', 'affiliate_click', {
  affiliate_type: 'TechGo',
  affiliate_position: 'diagnosis_result',
  affiliate_label: service.name,
});
```

---

### 3. 汎用比較表（/comparison/services/）

#### URL設計
```
/comparison/services/
  ?age=20s
  &situation=it_beginner
  &priority=income
```

#### データ構造（comparisonData.ts）
```typescript
interface AffiliateService {
  id: string;
  name: string;
  description: string;
  features: string[];
  affiliateUrl: string;
  commission: number;
  confirmationRate: number;
  epc: number;
  targetAge: AgeRange[];
  targetSituation: Situation[];
  rating: number; // 1-5
  isPr: boolean; // PR枠かどうか
}

// 広告主データ
export const affiliateServices: AffiliateService[] = [
  {
    id: 'techgo',
    name: 'TechGo',
    description: 'IT業界の転職に強い',
    features: [
      '未経験から高年収を目指せる',
      '書類選考通過率90%',
      '平均年収アップ120万円',
    ],
    affiliateUrl: 'https://...',
    commission: 45000,
    confirmationRate: 71.74,
    epc: 753.94,
    targetAge: ['20s', '30s', '40s'],
    targetSituation: ['it_beginner', 'it_experienced'],
    rating: 5,
    isPr: true,
  },
  // ... 他のサービス
];

// 診断結果からサービスを取得
export function getRecommendedServices(
  result: DiagnosisResult
): AffiliateService[] {
  const filtered = affiliateServices.filter(service => {
    const ageMatch = service.targetAge.includes(result.age);
    const situationMatch = service.targetSituation.includes(result.situation);
    return ageMatch && situationMatch;
  });

  // PR枠を最優先、その後はEPCでソート
  return filtered.sort((a, b) => {
    if (a.isPr && !b.isPr) return -1;
    if (!a.isPr && b.isPr) return 1;
    return b.epc - a.epc;
  });
}
```

#### 比較表UI仕様
```typescript
// ServiceCard.tsx
interface ServiceCardProps {
  service: AffiliateService;
  rank: number;
  isPr: boolean;
}

// 表示要素
- PRバッジ（isPr: true の場合）
- サービス名
- 星評価（★★★★★）
- 特徴3つ
- CTAボタン
- data-attributes（GA4計測用）
  - data-affiliate-type
  - data-affiliate-position
  - data-affiliate-label
```

---

### 4. アコーディオン（DetailedContentAccordion.tsx）

#### コンポーネント仕様
```typescript
'use client';

import { useState } from 'react';

export default function DetailedContentAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-12 bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* ヘッダー */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
        aria-expanded={isOpen}
        aria-controls="detailed-content"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            手取り計算について詳しく学ぶ
          </h2>
          <p className="text-sm text-gray-600">
            社会保険料、税金、控除について詳しく知りたい方はこちら
          </p>
        </div>
        <svg
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* コンテンツ */}
      {isOpen && (
        <div id="detailed-content" className="p-6 pt-0 border-t border-gray-100 animate-fade-in">
          {/* 既存のHomeClientの教育コンテンツ（Section 1-7）をここに配置 */}
        </div>
      )}
    </section>
  );
}
```

#### アニメーション
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

---

### 5. 資格講座ページ（/qualifications/courses/）

#### 目的
非提携リンク戦略 - 送客実績を作ってASP提携申請

#### 対象サービス
```typescript
interface CourseService {
  id: string;
  name: string;
  description: string;
  features: string[];
  url: string; // 外部リンク
  logoUrl: string;
}

export const courseServices: CourseService[] = [
  {
    id: 'u-can',
    name: 'ユーキャン',
    description: '150以上の資格講座、知名度No.1',
    features: [
      '初心者でもわかりやすい教材',
      '添削指導でサポート充実',
      '就職・転職に有利な資格多数',
    ],
    url: 'https://www.u-can.co.jp/',
    logoUrl: '/images/u-can-logo.png',
  },
  {
    id: 'foresight',
    name: 'フォーサイト',
    description: '高合格率、スマホ学習対応',
    features: [
      '業界トップクラスの合格率',
      'スマホでいつでも学習',
      'eラーニングシステム充実',
    ],
    url: 'https://www.foresight.jp/',
    logoUrl: '/images/foresight-logo.png',
  },
  {
    id: 'tac',
    name: 'TAC',
    description: '会計・法律系に強い',
    features: [
      '公認会計士・税理士に強い',
      '通学・通信が選べる',
      '実績豊富な講師陣',
    ],
    url: 'https://www.tac-school.co.jp/',
    logoUrl: '/images/tac-logo.png',
  },
];
```

#### GA4計測
```typescript
// 外部リンククリックイベント
gtag('event', 'external_link_click', {
  service: 'ユーキャン',
  category: '資格講座',
  url: 'https://www.u-can.co.jp/',
});
```

---

### 6. GA4イベント計測設計

#### イベント一覧
```typescript
// 1. 診断完了
gtag('event', 'diagnosis_complete', {
  age: string,
  situation: string,
  priority: string,
});

// 2. アフィリエイトクリック
gtag('event', 'affiliate_click', {
  affiliate_type: string,      // 'TechGo', 'ファルマスタッフ' など
  affiliate_position: string,  // 'diagnosis_result', 'pr_section', 'comparison_table'
  affiliate_label: string,     // サービス名
});

// 3. 外部リンククリック（資格講座）
gtag('event', 'external_link_click', {
  service: string,             // 'ユーキャン', 'フォーサイト', 'TAC'
  category: string,            // '資格講座'
  url: string,                 // 遷移先URL
});

// 4. アコーディオン展開
gtag('event', 'accordion_open', {
  section: string,             // 'detailed_content'
});

// 5. 比較表遷移
gtag('event', 'comparison_view', {
  age: string,
  situation: string,
  priority: string,
});
```

#### data-attributes設計
```html
<!-- アフィリエイトリンク -->
<a
  href="..."
  data-affiliate-type="TechGo"
  data-affiliate-position="diagnosis_result"
  data-affiliate-label="TechGo"
  onClick={handleAffiliateClick}
>
  無料で相談する
</a>

<!-- 外部リンク -->
<a
  href="https://www.u-can.co.jp/"
  target="_blank"
  rel="noopener noreferrer"
  data-external-service="ユーキャン"
  data-external-category="資格講座"
  onClick={handleExternalClick}
>
  資料請求する
</a>
```

---

## 📅 実装スケジュール（7日間）

### Day 1-2: 診断ツール（最優先）
- [ ] DiagnosisForm.tsx作成
  - [ ] 3問の質問UI
  - [ ] ラジオボタン、進捗表示
  - [ ] 状態管理（useState）
  - [ ] スタイリング
- [ ] diagnosisLogic.ts作成
  - [ ] 型定義（AgeRange, Situation, Priority）
  - [ ] バリデーション
- [ ] app/page.tsx統合
  - [ ] DiagnosisFormをTOPに配置
  - [ ] h1タイトル変更（SEO最適化）
- [ ] ローカルテスト

### Day 3-4: 診断結果＋汎用比較表
- [ ] comparisonData.ts作成
  - [ ] AffiliateServiceデータ作成
  - [ ] getRecommendedServices()ロジック
- [ ] DiagnosisResult.tsx作成
  - [ ] 診断結果サマリー表示
  - [ ] おすすめサービス3つ表示
  - [ ] 比較表への誘導ボタン
- [ ] ServiceCard.tsx作成
  - [ ] サービスカードUI
  - [ ] 星評価、特徴、CTAボタン
  - [ ] data-attributes設置
- [ ] /comparison/services/page.tsx作成
  - [ ] URLパラメータ取得
  - [ ] サービス一覧表示
  - [ ] ComparisonTable.tsx作成
- [ ] アフィリエイトリンク設置（A8.net）
  - [ ] TechGo, ラクスパートナーズ, 第二新卒neo, etc.
- [ ] GA4イベント実装
  - [ ] affiliate_click
  - [ ] comparison_view

### Day 5: 資格講座ページ＋アコーディオン
- [ ] /qualifications/courses/page.tsx作成
  - [ ] courseServicesデータ
  - [ ] 3サービスカード表示
  - [ ] 外部リンク設置（ユーキャン、フォーサイト、TAC）
- [ ] GA4イベント実装
  - [ ] external_link_click
- [ ] DetailedContentAccordion.tsx作成
  - [ ] アコーディオンUI
  - [ ] 開閉アニメーション
  - [ ] 既存のHomeClientコンテンツをラップ
- [ ] HomeClient.tsx改修
  - [ ] セクション見出し追加
  - [ ] アコーディオン対応

### Day 6: PR枠＋最終CTA
- [ ] PrSection.tsx作成
  - [ ] TechGo強調表示
  - [ ] PR枠デザイン
- [ ] FinalCta.tsx作成
  - [ ] 「あなたに合った方法を見つける」
  - [ ] 診断へ戻るリンク
- [ ] app/page.tsx最終統合
  - [ ] 全セクション配置確認
  - [ ] レイアウト調整

### Day 7: テスト＋デプロイ
- [ ] 機能テスト
  - [ ] 診断フロー（3問→結果→CTA）
  - [ ] 比較表パラメータ連携
  - [ ] アコーディオン開閉
  - [ ] アフィリエイトリンク動作確認
- [ ] GA4計測テスト
  - [ ] GTMプレビューモード
  - [ ] 各イベント発火確認
  - [ ] data-attributes確認
- [ ] モバイル最適化
  - [ ] レスポンシブデザイン確認
  - [ ] タッチ操作確認
- [ ] デプロイ
  - [ ] Git commit & push
  - [ ] Vercel自動デプロイ
  - [ ] 本番環境確認
  - [ ] Search Console URL検査

---

## 🧪 テスト項目

### 機能テスト
```
[ ] 診断ツール
  [ ] Q1→Q2→Q3の遷移
  [ ] 各質問で選択肢選択可能
  [ ] 「診断結果を見る」で結果表示
  [ ] ブラウザバック対応

[ ] 診断結果
  [ ] パーソナライズされたメッセージ表示
  [ ] おすすめサービス3つ表示
  [ ] CTAボタンクリック可能
  [ ] 比較表リンク正常動作

[ ] 汎用比較表
  [ ] URLパラメータで動的表示
  [ ] サービスカード表示
  [ ] 星評価表示
  [ ] アフィリエイトリンク動作

[ ] アコーディオン
  [ ] 初期状態は閉じている
  [ ] クリックで開閉
  [ ] アニメーション動作
  [ ] コンテンツ表示

[ ] GA4計測
  [ ] diagnosis_complete イベント
  [ ] affiliate_click イベント
  [ ] external_link_click イベント
  [ ] accordion_open イベント
  [ ] comparison_view イベント
```

### クロスブラウザテスト
```
[ ] Chrome（最新版）
[ ] Safari（最新版）
[ ] Firefox（最新版）
[ ] Edge（最新版）
[ ] モバイルSafari（iOS）
[ ] Chrome（Android）
```

### パフォーマンステスト
```
[ ] Lighthouse スコア
  [ ] Performance: 90+
  [ ] Accessibility: 95+
  [ ] Best Practices: 95+
  [ ] SEO: 100
[ ] ページ読み込み速度: 3秒以内
[ ] モバイルフレンドリー: 合格
```

---

## 🔐 SEO最適化

### メタデータ更新
```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: '【年収アップ診断＋手取り計算】あなたに最適な収入アップ方法｜手取りのミカタ',
  description: '3問の診断であなたに最適な年収アップ方法がわかります。転職・資格・スキル習得から最適なサービスをご提案。手取り計算ツールで転職後の収入もシミュレーション可能。',
  keywords: [
    '手取り計算',
    '年収アップ',
    '転職診断',
    'キャリア診断',
    // ... 既存のキーワード
  ],
  // ... その他は既存のまま
};
```

### 構造化データ
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "手取りのミカタ",
  "description": "年収アップ診断＋手取り計算ツール",
  "url": "https://tedorisan.jp/",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  }
}
```

---

## 📊 成功指標（Phase 1完了後1ヶ月）

### 定量指標
```
現状 → 目標

月間訪問数: 300-500人 → 500-800人
アフィリエイトクリック: 11件/月 → 50-80件/月（4-7倍）
CV: 0件 → 1-3件（初コンバージョン）
直帰率: 測定中 → 60%以下
平均滞在時間: 測定中 → 3分以上
```

### 定性指標
```
[ ] 診断完了率: 70%以上
[ ] 診断結果からのCTAクリック率: 30%以上
[ ] 比較表遷移率: 20%以上
[ ] アコーディオン展開率: 10%以上
```

### GA4で追跡する指標
```
- event: diagnosis_complete（診断完了数）
- event: affiliate_click（アフィリエイトクリック数）
  - affiliate_position別の集計
- event: external_link_click（資格講座クリック数）
  - service別の集計
- event: comparison_view（比較表閲覧数）
```

---

## 🚨 リスクと対策

### リスク1: SEO順位下落
**対策**: 
- 既存コンテンツを全てアコーディオン内に保持（削除しない）
- メタデータにキーワード追加
- 1週間後にSearch Console確認

### リスク2: 直帰率上昇
**対策**:
- 診断ツールで即座にエンゲージ
- ファーストビューでCTA配置
- アコーディオンで情報を隠しすぎない

### リスク3: GA4計測漏れ
**対策**:
- GTMプレビューモードで全イベント確認
- data-attributes必須化
- デプロイ前にチェックリスト実施

---

## 📝 Cursor AIへの指示テンプレート

### フェーズ別プロンプト

#### Day 1-2: 診断ツール
```
# 指示
tedorisan.jpの診断ツール（DiagnosisForm.tsx）を作成してください。

## 要件
- Next.js App Router, TypeScript, Tailwind CSS
- クライアントコンポーネント
- 3問の質問（年齢、状況、優先事項）
- ラジオボタン形式
- 進捗表示（1/3, 2/3, 3/3）
- モバイルファースト

## 型定義
PHASE1_IMPLEMENTATION_SPEC.mdの「1. 診断ツール」セクションを参照

## デザイン
- カード型UI（白背景、ボーダー、シャドウ）
- 選択肢はホバー効果
- 選択済みはblue系のborder
- アニメーション付き遷移

## ファイル作成先
app/components/DiagnosisForm.tsx
```

#### Day 3-4: 比較表
```
# 指示
汎用比較表ページ（/comparison/services/）を作成してください。

## 要件
- URLパラメータで動的表示（age, situation, priority）
- getRecommendedServices()でサービス取得
- ServiceCard×3表示
- アフィリエイトリンク設置（data-attributes必須）
- GA4イベント計測

## データ構造
PHASE1_IMPLEMENTATION_SPEC.mdの「3. 汎用比較表」セクションを参照

## ファイル作成先
app/comparison/services/page.tsx
app/comparison/services/ComparisonClient.tsx
app/components/ServiceCard.tsx
lib/comparisonData.ts
```

---

## 🎓 参考資料

### Next.js公式ドキュメント
- [App Router](https://nextjs.org/docs/app)
- [Server Components vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

### GA4イベント計測
- [GA4イベント計測の基本](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GTMとGA4の連携](https://support.google.com/tagmanager/answer/9442095)

### アクセシビリティ
- [WAI-ARIA Authoring Practices - Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

---

## 📞 サポート・質問

実装中に疑問が出たら:
1. まずPHASE1_IMPLEMENTATION_SPEC.mdを参照
2. Cursorに「PHASE1_IMPLEMENTATION_SPEC.mdの{セクション}を参照して実装して」と指示
3. それでも不明な場合はKumaに確認

---

**設計書バージョン**: 1.0  
**最終更新**: 2026-02-11  
**作成者**: Kuma + Claude  
**レビュー**: 承認済み  

---

## ✅ Phase 1 完了チェックリスト

実装完了時に確認:

```
基本機能
[ ] 診断ツール（3問）が動作する
[ ] 診断結果が表示される
[ ] 比較表が動的に表示される
[ ] アコーディオンが開閉する
[ ] アフィリエイトリンクが動作する

GA4計測
[ ] diagnosis_complete イベント発火
[ ] affiliate_click イベント発火
[ ] external_link_click イベント発火
[ ] accordion_open イベント発火
[ ] comparison_view イベント発火

SEO
[ ] メタデータ更新済み
[ ] h1タイトル最適化済み
[ ] 構造化データ実装済み
[ ] Search Console URL検査実施

パフォーマンス
[ ] Lighthouse Performance 90+
[ ] ページ読み込み 3秒以内
[ ] モバイルフレンドリー合格

デプロイ
[ ] Git commit & push
[ ] Vercel自動デプロイ成功
[ ] 本番環境動作確認
[ ] 404エラーなし
```

---

**Phase 1完了後は、1週間データ収集してPhase 2の計画を立てます。**
