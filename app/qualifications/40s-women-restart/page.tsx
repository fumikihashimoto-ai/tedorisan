import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import ArticlePageLayout from '@/app/components/v2/layouts/ArticlePageLayout';
import TedoriCalculator from '@/app/components/v2/common/TedoriCalculator';
import Qualification40sWomenArticle from './Qualification40sWomenArticle';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '40代女性が人生をやり直すためにおすすめな資格｜在宅・高収入を実現 | 手取りのミカタ',
  description:
    '在宅・高収入も夢じゃない。40代女性が人生をやり直すために本当に役立つ資格を厳選。Webデザイナー、プログラマー、オンライン秘書、医療事務、FPなどおすすめ資格5選を徹底解説。',
  keywords: ['40代', '女性', '資格', '人生やり直し', '在宅ワーク', '高収入', 'セカンドキャリア'],
  canonicalPath: '/qualifications/40s-women-restart',
  openGraphTitle: '40代女性が人生をやり直すためにおすすめな資格｜在宅・高収入を実現 | 手取りのミカタ',
  openGraphDescription:
    '在宅・高収入も夢じゃない。40代女性が人生をやり直すために本当に役立つ資格を厳選。Webデザイナー、プログラマー、オンライン秘書、医療事務、FPなどおすすめ資格5選を徹底解説。',
  openGraphType: 'article',
});

export default function Page() {
  return (
    <>
      <ArticleStructuredData
        headline="在宅・高収入も夢じゃない!「40代女性が人生をやり直すためにおすすめな資格」徹底解説"
        description="在宅・高収入も夢じゃない。40代女性が人生をやり直すために本当に役立つ資格を厳選。Webデザイナー、プログラマー、オンライン秘書、医療事務、FPなどおすすめ資格5選を徹底解説。"
        url="/qualifications/40s-women-restart"
      />
      <ArticlePageLayout
        catchphrase1="＼40代女性が人生をやり直す／"
        catchphrase2="【在宅・高収入を実現する資格】"
      >
        <TedoriCalculator noMargin contentLayout={true} />
        <nav className="breadcrumb mb-3">
          <Link href="/">ホーム</Link> {'>'} <Link href="/qualifications">資格</Link> {'>'} 40代女性が人生をやり直すためにおすすめな資格
        </nav>

        <h1 className="text-[length:var(--font-size-h1-mobile)] sm:text-[length:var(--font-size-h1)] font-bold text-[#1E293B] mb-6">
          在宅・高収入も夢じゃない!「40代女性が人生をやり直すためにおすすめな資格」徹底解説
        </h1>

        <Qualification40sWomenArticle />
      </ArticlePageLayout>
    </>
  );
}
