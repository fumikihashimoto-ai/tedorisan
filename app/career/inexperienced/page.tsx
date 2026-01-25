import type { Metadata } from 'next';
import InexperiencedClient from './pageClient';
import { createArticleMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createArticleMetadata({
  title: '未経験転職の年収目安｜業界別の相場と年収アップのコツ',
  description:
    '未経験転職でも20代の約60%が年収アップ。IT、営業、施工管理など業界・職種別の未経験スタート年収と3年後の成長モデル、年収を下げない転職のコツを解説。',
  keywords: ['未経験', '転職', '年収', '手取り', '異業種', 'キャリアチェンジ', 'IT', '営業', '施工管理'],
  canonicalPath: '/career/inexperienced',
  openGraphDescription: '未経験転職でも年収アップは可能。業界別の相場と成長モデル、年収を下げないコツを解説。',
});

export default function Page() {
  return <InexperiencedClient />;
}

