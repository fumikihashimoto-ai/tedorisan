# サイト構造（ツリー）

## プロジェクトルート

```
salary-calculator/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # TOP ページ (/)
│   ├── layout.tsx                # ルートレイアウト（Header, Footer, RelatedLinks）
│   ├── globals.css
│   ├── robots.ts
│   ├── sitemap.ts
│   │
│   ├── components/               # 共通コンポーネント
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HomePageClient.tsx    # TOP用（ヒーロー・診断・結果・手取り計算）
│   │   ├── DiagnosisSection.tsx
│   │   ├── DiagnosisForm.tsx
│   │   ├── DiagnosisResult.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── HomeClient.tsx        # 手取り計算フォーム
│   │   ├── RelatedLinks.tsx      # RECOMMEND リンク
│   │   ├── TopPageSidebar.tsx
│   │   ├── StructuredData.tsx
│   │   ├── ScrollToTopButton.tsx
│   │   ├── InlineAd.tsx, HeaderAd.tsx, PcAdSidebar.tsx
│   │   ├── ui/                   # Card, Typography, Buttons, FormFields, etc.
│   │   └── ...
│   │
│   ├── lib/                      # アプリ内ユーティリティ
│   │   ├── navigation.ts         # メニュー・フッター用リンク定義
│   │   ├── metadata.ts
│   │   └── ...
│   │
│   ├── comparison/               # 転職サービス比較
│   │   └── services/
│   │       ├── page.tsx          # /comparison/services
│   │       └── ComparisonClient.tsx
│   │
│   ├── tools/                    # 計算ツール
│   │   ├── fresh-graduate/       # /tools/fresh-graduate
│   │   ├── job-change/           # /tools/job-change
│   │   └── side-business/        # /tools/side-business
│   │
│   ├── magazine/                 # マガジン（年収・転職記事）
│   │   ├── job-salary/           # 職種別年収
│   │   │   ├── it-engineer/      # /magazine/job-salary/it-engineer
│   │   │   ├── nursery/
│   │   │   ├── sales/
│   │   │   ├── pharmacist/
│   │   │   ├── medical-tech/
│   │   │   ├── real-estate/
│   │   │   └── construction/
│   │   └── inexperienced/       # 未経験転職
│   │       ├── 20s/
│   │       ├── 20s-women/
│   │       ├── 30s/
│   │       ├── 30s-women/
│   │       ├── 40s/
│   │       ├── 40s-women/
│   │       ├── high-school/
│   │       └── high-school-women/
│   │
│   ├── qualifications/           # 資格・キャリア記事
│   │   ├── araforty-engineer/
│   │   ├── 40s-women-restart/
│   │   ├── stable-career/
│   │   ├── high-income/
│   │   ├── no-entry-requirement/
│   │   └── no-work-experience/
│   │
│   ├── career/                   # キャリア・早見表系
│   │   ├── high-income/          # /career/high-income
│   │   └── career-change-20s/    # /career/career-change-20s
│   │
│   ├── tables/                   # /tables（手取り早見表）
│   │   ├── page.tsx
│   │   └── TablesArticle.tsx
│   │
│   └── faq/                      # /faq
│       ├── page.tsx
│       └── FAQClient.tsx
│
├── lib/                          # 共有ロジック・データ
│   ├── comparisonData.ts         # アフィリエイトサービス・診断おすすめ
│   ├── diagnosisLogic.ts         # 診断ロジック
│   ├── relatedLinks.ts           # 関連リンク・ヒーロー画像マップ
│   ├── salaryCalculator.ts
│   ├── reverseSalaryCalculator.ts
│   ├── industryIncomeData.ts
│   ├── ageIncomeData.ts
│   ├── incomePercentile.ts
│   ├── ads.ts
│   └── affiliate.ts
│
├── public/                       # 静的ファイル
│   ├── images/
│   │   ├── hero_top.png
│   │   ├── hero_*.png            # 各ページ用ヒーロー
│   │   ├── ranking-1〜3.png
│   │   ├── user-1〜3.png
│   │   ├── logo.png
│   │   └── ...
│   └── *.svg
│
└── docs/
    └── site-structure.md         # 本ファイル
```

## URL（ルート）一覧

| URL | 説明 |
|-----|------|
| `/` | TOP（診断・手取り計算） |
| `/comparison/services` | 転職サービス比較 |
| `/tools/fresh-graduate` | 新卒向け手取り計算 |
| `/tools/job-change` | 転職向け手取り計算 |
| `/tools/side-business` | 副業向け手取り計算 |
| `/tables` | 手取り早見表 |
| `/faq` | よくある質問 |
| `/magazine/job-salary/*` | 職種別年収（ITエンジニア・保育士・営業・薬剤師等） |
| `/magazine/inexperienced/*` | 未経験転職（20s・30s・40s・高卒等） |
| `/qualifications/*` | 資格・キャリア（アラフォーエンジニア・高年収等） |
| `/career/high-income` | 年収1000万超え早見表 |
| `/career/career-change-20s` | 20代転職 |
