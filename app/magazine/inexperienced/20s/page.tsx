import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import InexperiencedArticle from './InexperiencedArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '転職したい20代未経験者必見！ゼロから始める理想のキャリアパス | 手取りのミカタ',
  description:
    '20代の未経験転職は大きなチャンス。なぜ今が有利なのか、自己分析から求人探し、履歴書・職務経歴書の書き方、面接対策まで、成功に必要なノウハウを徹底解説。転職エージェントの活用術や企業が求める人物像も紹介。',
  keywords: ['未経験', '転職', '20代', 'キャリア', '第二新卒', '転職エージェント', '履歴書', '面接対策'],
  canonicalPath: '/magazine/inexperienced/20s',
  openGraphTitle: '転職したい20代未経験者必見！ゼロから始める理想のキャリアパス | 手取りのミカタ',
  openGraphDescription:
    '20代の未経験転職は大きなチャンス。なぜ今が有利なのか、自己分析から求人探し、履歴書・職務経歴書の書き方、面接対策まで、成功に必要なノウハウを徹底解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="転職したい20代未経験者必見！ゼロから始める理想のキャリアパス"
        description="20代の未経験転職は大きなチャンス。なぜ今が有利なのか、自己分析から求人探し、履歴書・職務経歴書の書き方、面接対策まで、成功に必要なノウハウを徹底解説。転職エージェントの活用術や企業が求める人物像も紹介。"
        url="/magazine/inexperienced/20s"
      />
      <ArticlePageLayout
        catchphrase1="＼20代未経験から転職成功／"
        catchphrase2="【ゼロから始めるキャリアパス】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/magazine/inexperienced/20s">マガジン</Link> {'>'} 未経験者の就職・転職 {'>'} 20代未経験者の転職
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          転職したい20代未経験者必見！ゼロから始める理想のキャリアパス
        </h1>

        <InexperiencedArticle />
      </ArticlePageLayout>
    </>
  );
}
