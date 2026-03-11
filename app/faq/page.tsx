import type { Metadata } from 'next';
import FAQClient, { type FAQCategory } from './FAQClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'よくある質問（FAQ）- 手取り計算',
  description:
    '手取り計算に関するよくある質問。手取りとは？計算方法は？所得税・住民税・社会保険料の仕組みを解説。転職・新卒・副業の疑問も解決。',
  keywords: [
    '手取りとは',
    '手取り 計算方法',
    '所得税 計算',
    '住民税 計算',
    '新卒 手取り 平均',
    '副業 税金',
    'FAQ',
  ],
  canonicalPath: '/faq',
  openGraphTitle: 'よくある質問（FAQ）- 手取り計算',
  openGraphDescription: '手取り計算に関するよくある質問',
  openGraphType: 'website',
});

const faqData: FAQCategory[] = [
  {
    title: '基本編',
    icon: '',
    items: [
      {
        id: 'basic-1',
        question: '手取りとは何ですか？',
        answer:
          '手取りとは、給与から税金（所得税・住民税）と社会保険料を差し引いた後に、実際に受け取れる金額のことです。給与明細に記載されている「差引支給額」が手取り額になります。',
      },
      {
        id: 'basic-2',
        question: '年収と手取りの違いは？',
        answer:
          '年収は、給与の総支給額（税金・保険料が引かれる前）の年間合計です。手取りは、そこから税金と社会保険料を差し引いた実際の受取額です。一般的に手取りは年収の約75-85%になります。',
      },
      {
        id: 'basic-3',
        question: '額面と手取りの違いは？',
        answer:
          '額面は給与明細の「総支給額」のことで、税金や保険料が引かれる前の金額です。手取りは額面から各種控除を引いた後の「差引支給額」です。',
      },
      {
        id: 'basic-4',
        question: '手取りはどうやって計算するの？',
        answer:
          '手取りは以下の順序で計算します。\n1. 年収から給与所得控除を引く\n2. 各種控除（基礎控除、社会保険料控除等）を引く\n3. 課税所得に税率をかけて所得税を計算\n4. 住民税を計算（課税所得の約10%）\n5. 社会保険料を計算（年収の約15%）\n6. 年収から税金と保険料を引く',
      },
    ],
  },
  {
    title: '所得税・住民税編',
    icon: '',
    items: [
      {
        id: 'tax-1',
        question: '所得税はいくら引かれる？',
        answer:
          '所得税は課税所得に応じて5%〜45%の累進課税です。年収400万円の場合、所得税は年間約8万円（月額約7,000円）程度です。',
      },
      {
        id: 'tax-2',
        question: '住民税はいくら引かれる？',
        answer:
          '住民税は課税所得の約10%（都道府県税4% + 市区町村税6%）です。年収400万円の場合、住民税は年間約15万円（月額約1.3万円）程度です。',
      },
      {
        id: 'tax-3',
        question: '税金はいつから引かれる？',
        answer:
          '所得税は入社初月から引かれます。住民税は前年の所得に基づいて計算されるため、新卒1年目は引かれず、2年目の6月から引かれ始めます。',
      },
    ],
  },
  {
    title: '社会保険編',
    icon: '',
    items: [
      {
        id: 'insurance-1',
        question: '社会保険料とは？',
        answer:
          '社会保険料は、健康保険料、厚生年金保険料、雇用保険料の合計です。年収の約15%（会社と折半）が給与から引かれます。',
      },
      {
        id: 'insurance-2',
        question: '健康保険料はいくら？',
        answer:
          '健康保険料は標準報酬月額の約10%（労使折半で自己負担は5%）です。年収400万円の場合、月額約1.7万円程度です。',
      },
      {
        id: 'insurance-3',
        question: '厚生年金保険料はいくら？',
        answer:
          '厚生年金保険料は標準報酬月額の18.3%（労使折半で自己負担は9.15%）です。年収400万円の場合、月額約3万円程度です。',
      },
    ],
  },
  {
    title: '転職編',
    icon: '',
    items: [
      {
        id: 'job-1',
        question: '転職で手取りはどれくらい増える？',
        answer:
          '転職による年収アップの平均は50〜100万円です。年収が100万円アップすると、手取りは約75万円増加します（手取り率約75%）。',
      },
      {
        id: 'job-2',
        question: '年収交渉のコツは？',
        answer:
          '年収交渉のコツは以下の通りです。\n1. 市場価値を把握する（同業種・同職種の平均年収）\n2. 現年収の10-20%アップを目安に\n3. スキルと実績を具体的に提示\n4. 希望年収に幅を持たせる',
      },
      {
        id: 'job-3',
        question: '手取りが減るケースは？',
        answer:
          '以下の場合、手取りが減ることがあります。\n• 住民税が増加する年（前年の年収が高かった）\n• 社会保険料率の改定\n• 扶養家族が減った場合\n• 通勤手当などの非課税手当が減った場合',
      },
    ],
  },
  {
    title: '新卒編',
    icon: '',
    items: [
      {
        id: 'fresh-1',
        question: '新卒の手取り平均は？',
        answer:
          '2025年の新卒平均年収は約273万円で、手取りは約215万円（月額約18万円）です。ただし1年目は住民税が引かれないため、実質的な手取りはもう少し多くなります。',
      },
      {
        id: 'fresh-2',
        question: '初任給の手取りは？',
        answer:
          '初任給（月給23万円の場合）の手取りは約19万円です。1年目は住民税が引かれないため、2年目以降より約1.5万円多くなります。',
      },
      {
        id: 'fresh-3',
        question: '一人暮らしに必要な手取りは？',
        answer:
          '東京都内で一人暮らしをする場合、最低でも手取り18万円、余裕を持つなら手取り20万円以上が目安です。家賃は手取りの3分の1以下に抑えるのが理想です。',
      },
    ],
  },
  {
    title: '副業編',
    icon: '',
    items: [
      {
        id: 'side-1',
        question: '副業の税金はいくら？',
        answer:
          '副業収入に対する税金は、本業と合算した総所得に対して計算されます。副業で年間20万円の利益がある場合、所得税・住民税合わせて約3〜6万円程度です。',
      },
      {
        id: 'side-2',
        question: '副業20万円以下は申告不要？',
        answer:
          '副業の所得（収入−経費）が年間20万円以下の場合、確定申告は不要です。ただし、住民税の申告は必要な場合があります。',
      },
      {
        id: 'side-3',
        question: '確定申告はいつやる？',
        answer:
          '確定申告の期間は毎年2月16日〜3月15日です。前年1月1日〜12月31日の所得について申告します。e-Taxを使えば自宅から簡単に申告できます。',
      },
    ],
  },
];

function FAQStructuredData({ data }: { data: FAQCategory[] }) {
  const mainEntity = data.flatMap((cat) =>
    cat.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <FAQStructuredData data={faqData} />
      <FAQClient faqData={faqData} />
    </>
  );
}

