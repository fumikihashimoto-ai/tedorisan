export default function SidebarCTA() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      {/* ヘッダーバー */}
      <div className="bg-[#1e3a5f] px-4 py-3">
        <p className="text-white text-sm font-medium text-center">
          年収アップで手取りを増やすには？
        </p>
      </div>

      {/* メインコンテンツ */}
      <div className="p-5">
        {/* 見出し */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug">
          <span className="text-[#1e3a5f]">転職のプロ</span>
          <span className="text-amber-500">が</span>
          <span className="text-[#1e3a5f]">無料でサポート</span>
        </h3>

        {/* カテゴリタグ */}
        <div className="mb-3">
          <span className="inline-block text-xs font-medium text-[#1e3a5f] border border-[#1e3a5f] rounded px-2 py-1">
            20代・第二新卒向け
          </span>
        </div>

        {/* 説明文 */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          ブラック企業を除外した優良企業のみ紹介。1人あたり平均10時間の手厚いサポート。
        </p>

        {/* 特徴タグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">
            書類添削無料
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">
            面接対策
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">
            年収交渉
          </span>
        </div>

        {/* CTAボタン */}
        <a
          href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+631SY"
          className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center text-sm py-3 rounded-lg font-bold transition-colors"
          rel="nofollow"
          target="_blank"
        >
          無料で相談する →
        </a>

        {/* トラッキングピクセル */}
        <img
          width={1}
          height={1}
          src="https://www18.a8.net/0.gif?a8mat=4AVF01+4FK6WI+3Y6M+631SY"
          alt=""
          style={{ border: 0 }}
        />

        {/* サービス名 */}
        <p className="text-xs text-gray-400 mt-3 text-center">
          第二新卒エージェントneo by ネオキャリア
        </p>
      </div>
    </div>
  );
}
