// 構造化データコンポーネント
export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // ========================================
      // WebSite（サイト情報）
      // ========================================
      {
        '@type': 'WebSite',
        '@id': 'https://tedorisan.jp/#website',
        url: 'https://tedorisan.jp/',
        name: '手取りのミカタ',
        description: '年収から手取り額を自動計算できる無料ツール',
        publisher: {
          '@id': 'https://tedorisan.jp/#organization',
        },
        inLanguage: 'ja',
      },

      // ========================================
      // Organization（組織情報）
      // ========================================
      {
        '@type': 'Organization',
        '@id': 'https://tedorisan.jp/#organization',
        name: '手取りのミカタ',
        url: 'https://tedorisan.jp/',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://tedorisan.jp/#logo',
          url: 'https://tedorisan.jp/icon-512.png',
          contentUrl: 'https://tedorisan.jp/icon-512.png',
          width: 512,
          height: 512,
          caption: '手取りのミカタ',
        },
        image: {
          '@id': 'https://tedorisan.jp/#logo',
        },
      },

      // ========================================
      // WebPage（ページ情報）
      // ========================================
      {
        '@type': 'WebPage',
        '@id': 'https://tedorisan.jp/#webpage',
        url: 'https://tedorisan.jp/',
        name: '【シミュレーション付き】年収の手取りを最速で計算！初心者でも安心の仕組み解説 | 手取りのミカタ',
        isPartOf: {
          '@id': 'https://tedorisan.jp/#website',
        },
        about: {
          '@id': 'https://tedorisan.jp/#webpage',
        },
        description: '年収から手取り額を自動計算。額面との違い、社会保険料・税金の仕組みを初心者向けに解説。',
        inLanguage: 'ja',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: ['https://tedorisan.jp/'],
          },
        ],
      },

      // ========================================
      // SoftwareApplication（シミュレーション）
      // ========================================
      {
        '@type': 'SoftwareApplication',
        name: '手取りのミカタ - 手取り計算シミュレーション',
        description: '年収から手取り額をシミュレーションできる無料Webツール',
        url: 'https://tedorisan.jp/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'JPY',
        },
        // aggregateRatingは実際のレビューがない場合は削除してください
        // aggregateRating: {
        //   '@type': 'AggregateRating',
        //   ratingValue: '4.8',
        //   ratingCount: '150',
        //   bestRating: '5',
        //   worstRating: '1',
        // },
      },

      // ========================================
      // FAQPage（よくある質問）
      // ========================================
      {
        '@type': 'FAQPage',
        '@id': 'https://tedorisan.jp/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '手取りとは何ですか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '手取りとは、額面年収から社会保険料（健康保険、厚生年金、雇用保険など）と税金（所得税、住民税）を差し引いた後、実際に銀行口座に振り込まれる金額のことです。',
            },
          },
          {
            '@type': 'Question',
            name: '年収の何割が手取りになりますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '一般的に手取りは額面年収の約75%〜85%程度です。年収300万円なら約78〜82%、年収500万円なら約75〜79%、年収700万円なら約70〜74%が目安となります。年収が高いほど税率が上がるため、手取り率は下がる傾向があります。',
            },
          },
          {
            '@type': 'Question',
            name: '手取りを増やす方法はありますか？',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '手取りを増やす方法には、①ふるさと納税や医療費控除などの控除を最大限活用する、②iDeCoやNISAなどの税制優遇制度を利用する、③副業で収入を増やす、④転職で年収アップを目指す、などがあります。',
            },
          },
        ],
      },

      // ========================================
      // BreadcrumbList（パンくずリスト）
      // ========================================
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://tedorisan.jp/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: 'https://tedorisan.jp/',
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
