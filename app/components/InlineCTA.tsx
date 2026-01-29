import { SECOND_NEW_GRADUATE_NEO } from '../../lib/affiliate';

export default function InlineCTA() {
  const { href, pixelSrc, serviceName } = SECOND_NEW_GRADUATE_NEO;

  return (
    <div className="my-10 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-slate-800 px-6 py-4">
        <p className="text-white text-sm font-medium text-center">
          年収アップで手取りを増やす
        </p>
      </div>

      {/* コンテンツ */}
      <div className="p-6">
        {/* 訴求文 */}
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          スタッフ全員が第二新卒経験者。
          <br />
          履歴書添削・面接対策・入社後まで無料サポート。
        </p>

        {/* CTAボタン */}
        <a
          href={href}
          className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center font-bold py-4 rounded-lg transition-colors"
          rel="nofollow noopener noreferrer"
          target="_blank"
          aria-label={`${serviceName}の無料相談ページへ`}
        >
          {serviceName}
        </a>

        {/* トラッキングピクセル */}
        <img width={1} height={1} src={pixelSrc} alt="" aria-hidden />
      </div>
    </div>
  );
}
