import type { Metadata } from 'next';
import ItEngineerClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: 'ITエンジニアの年収・手取り計算｜転職比較シミュレーター',
  description:
    'ITエンジニアの平均年収は約462万円。年代別・勤務先別の年収データと、転職前後の手取り額を比較できる計算ツール。SES・SIer・自社開発など働き方別の年収相場も解説。',
  keywords: ['ITエンジニア', '年収', '手取り', '転職', 'SIer', 'SES', '自社開発', '平均年収'],
  canonicalPath: '/industry/it-engineer',
  openGraphDescription: 'ITエンジニアの平均年収は約462万円。転職前後の手取り額を比較できる計算ツール。',
});

export default function Page() {
  return <ItEngineerClient />;
}

