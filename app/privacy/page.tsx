import type { Metadata } from 'next';
import PageLayout from '@/app/components/v2/layouts/PageLayout';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'プライバシーポリシー | 手取りのミカタ',
  description:
    '手取りのミカタのプライバシーポリシーです。個人情報の取扱い、Cookie、アクセス解析について記載しています。',
  canonicalPath: '/privacy',
  openGraphType: 'website',
});

export default function PrivacyPage() {
  return (
    <PageLayout maxWidth="content">
      <div className="bg-white py-10 font-['Noto_Sans_JP']">
        <h1 className="text-2xl font-bold mb-8">プライバシーポリシー</h1>

        <h2 className="text-lg font-bold mt-8 mb-4">個人情報の収集について</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          手取りのミカタ（以下「当サイト」）では、お問い合わせの際にメールアドレス等の個人情報をご提供いただく場合があります。取得した個人情報は、お問い合わせへの回答や必要な情報の提供のために利用し、それ以外の目的では利用しません。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-4">Cookieの使用について</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          当サイトでは、サイトの利便性向上やアクセス状況の分析のためにCookieを使用しています。Cookieとは、Webサイト訪問時にブラウザに保存される小さなテキストファイルです。Cookieにより個人を特定できる情報は取得していません。ブラウザの設定によりCookieの受け取りを拒否することができますが、その場合、当サイトの一部機能が利用できなくなる可能性があります。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-4">
          アクセス解析ツールについて
        </h2>
        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          当サイトでは、Googleが提供するアクセス解析ツール「Googleアナリティクス」をGoogleタグマネージャー経由で使用しています。Googleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          Googleアナリティクスによるデータ収集を望まない場合は、Googleが提供する
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            オプトアウトアドオン
          </a>
          をインストールすることで無効化できます。
        </p>
        <p className="text-sm leading-relaxed text-gray-700">
          詳しくはGoogleアナリティクスの利用規約およびGoogleのプライバシーポリシーをご確認ください。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-4">広告配信について</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          当サイトでは、第三者配信の広告サービス（A8.net、AccessTrade、afb）を利用しています。これらの広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用する場合があります。各事業者のプライバシーポリシーについては、それぞれの公式サイトをご確認ください。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-4">免責事項</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          当サイトに掲載されている情報の正確性には万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について、責任を負うものではありません。当サイトの計算ツールによる計算結果はあくまで概算であり、実際の金額とは異なる場合があります。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-4">リンクについて</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          当サイトは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-4">
          プライバシーポリシーの変更
        </h2>
        <p className="text-sm leading-relaxed text-gray-700">
          当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直し改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
        </p>

        <p className="text-sm text-gray-500 mt-12">
          最終更新日：2026年3月16日
        </p>
      </div>
    </PageLayout>
  );
}
