import type { Metadata } from 'next';
import HomeClient from './components/HomeClient';

export const metadata: Metadata = {
  title: '手取り計算ツール - テドリさん｜年収・給与シミュレーター',
  description: '3秒で手取り額がわかる計算ツール。年収から手取りを自動計算。転職・新卒・副業の年収シミュレーションに対応。年代別の収入比較も表示。完全無料・個人情報不要。2025年度の最新税率で計算。',
  keywords: ['手取り計算', '手取り計算ツール', '年収 手取り', '給与 手取り', '手取りシミュレーション', '年収計算', '給与計算', '手取り', '年収シミュレーション'],
  openGraph: {
    title: '手取り計算ツール - テドリさん',
    description: '3秒で手取り額がわかる計算ツール',
    type: 'website',
    locale: 'ja_JP',
    siteName: '手取り計算ツール - テドリさん',
  },
  twitter: {
    card: 'summary_large_image',
    title: '手取り計算ツール - テドリさん',
    description: '3秒で手取り額がわかる',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tedorikun.jp',
  },
};

export default function Home() {
  return (
    <>
      {/* A8.net スマホヘッダー広告 */}
      <div className="md:hidden w-full bg-gray-50 py-2 flex justify-center border-b border-gray-200">
        <div
          dangerouslySetInnerHTML={{
            __html: `
        <a href="https://px.a8.net/svt/ejp?a8mat=4AVDG5+A36FSI+4N6C+639IP" target="_blank" rel="nofollow noopener noreferrer">
          <img border="0" width="320" height="50" alt="" src="https://www28.a8.net/svt/bgt?aid=260124629610&wid=001&eno=01&mid=s00000021666001023000&mc=1">
        </a>
        <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4AVDG5+A36FSI+4N6C+639IP" alt="">
      `,
          }}
        />
      </div>

      <HomeClient />
    </>
  );
}
