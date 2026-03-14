/**
 * microCMS 記事入稿スクリプト
 *
 * 使い方:
 *   npx tsx scripts/post-article.ts
 *
 * 前提:
 *   .env.local に MICROCMS_API_KEY が設定されていること
 *
 * 注意:
 *   - 下書きとして保存される（公開はされない）
 *   - 重複入稿に注意（1回だけ実行すること）
 *   - gitにコミットしない（使い捨てスクリプト）
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// .env.local を手動で読み込み（dotenv不要）
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
} catch {
  console.error("❌ .env.local が見つかりません");
  process.exit(1);
}

const API_KEY = process.env.MICROCMS_API_KEY;
if (!API_KEY) {
  console.error("❌ MICROCMS_API_KEY が .env.local に設定されていません");
  process.exit(1);
}

const ENDPOINT = "https://tedorisan.microcms.io/api/v1/articles";

// --- 記事データ ---

const articleData = {
  title: "20代転職の年収相場と手取り計算",
  slug: "career-change-20s",
  description:
    "20代の平均年収は365万円。転職で約40%が年収アップに成功。20代前半・後半の年収データ、転職前後の手取り比較シミュレーター、年収アップしやすい業界・転職パターンを解説。",
  category: ["career-change"],
  bodyBlocks: [
    // ブロック1: pointBox
    {
      fieldId: "partsBlock",
      partType: ["pointBox"],
      pointTitle: "20代の平均年収と、転職でどれくらい変わる？",
      pointVariant: ["highlight"],
      pointBody: `<p>20代の平均年収は365万円です。転職では約40%が年収アップに成功している一方、職種・業界チェンジの内容によっては一時的に下がるケースもあります。まずは転職前後の手取りを比較して、現実的な目標を作りましょう。</p><p>出典: doda平均年収ランキング2025 / 国税庁 民間給与実態統計調査 / マイナビ転職動向調査2024年版</p>`,
    },
    // ブロック2: リッチテキスト（20代の平均年収データ）
    {
      fieldId: "richTextBlock",
      richText: `<h2>20代の平均年収データ（2025年版）</h2><table><tbody><tr><th><p>区分</p></th><th><p>平均年収</p></th><th><p>中央値</p></th></tr><tr><td><p>20代全体</p></td><td><p>365万円</p></td><td><p>350万円</p></td></tr><tr><td><p>20代前半（20〜24歳）</p></td><td><p>267万円</p></td><td><p>280万円</p></td></tr><tr><td><p>20代後半（25〜29歳）</p></td><td><p>394万円</p></td><td><p>400万円</p></td></tr><tr><td><p>20代男性</p></td><td><p>392万円</p></td><td><p>360万円</p></td></tr><tr><td><p>20代女性</p></td><td><p>341万円</p></td><td><p>300万円</p></td></tr></tbody></table>`,
    },
    // ブロック3: リッチテキスト（シミュレーター見出し）
    {
      fieldId: "richTextBlock",
      richText: `<h2>転職前後の手取り比較シミュレーター</h2>`,
    },
    // ブロック4: calculator
    {
      fieldId: "partsBlock",
      partType: ["calculator"],
    },
    // ブロック5: リッチテキスト（年齢別早見表）
    {
      fieldId: "richTextBlock",
      richText: `<h2>20代 年齢別の平均年収・手取り早見表</h2><table><tbody><tr><th><p>年齢</p></th><th><p>平均年収</p></th><th><p>手取り目安</p></th><th><p>月収手取り</p></th></tr><tr><td><p>22歳</p></td><td><p>280万円</p></td><td><p>約230万円</p></td><td><p>約19万円</p></td></tr><tr><td><p>23歳</p></td><td><p>300万円</p></td><td><p>約245万円</p></td><td><p>約20万円</p></td></tr><tr><td><p>24歳</p></td><td><p>320万円</p></td><td><p>約260万円</p></td><td><p>約22万円</p></td></tr><tr><td><p>25歳</p></td><td><p>350万円</p></td><td><p>約285万円</p></td><td><p>約24万円</p></td></tr><tr><td><p>26歳</p></td><td><p>370万円</p></td><td><p>約300万円</p></td><td><p>約25万円</p></td></tr><tr><td><p>27歳</p></td><td><p>390万円</p></td><td><p>約315万円</p></td><td><p>約26万円</p></td></tr><tr><td><p>28歳</p></td><td><p>410万円</p></td><td><p>約330万円</p></td><td><p>約28万円</p></td></tr><tr><td><p>29歳</p></td><td><p>430万円</p></td><td><p>約345万円</p></td><td><p>約29万円</p></td></tr></tbody></table><p>※ 手取りは概算の目安です（扶養/地域等で変動します）。</p>`,
    },
    // ブロック6: リッチテキスト（年収変化データ）
    {
      fieldId: "richTextBlock",
      richText: `<h2>20代転職者の年収変化データ</h2><table><tbody><tr><th><p>項目</p></th><th><p>数値</p></th></tr><tr><td><p>転職で年収アップした割合</p></td><td><p>約40〜45%</p></td></tr><tr><td><p>転職で年収維持の割合</p></td><td><p>約35%</p></td></tr><tr><td><p>転職で年収ダウンした割合</p></td><td><p>約20〜25%</p></td></tr><tr><td><p>転職による平均年収増加額</p></td><td><p>+17〜22万円</p></td></tr><tr><td><p>転職前の平均年収（20代）</p></td><td><p>約415万円</p></td></tr><tr><td><p>転職後の平均年収（20代）</p></td><td><p>約432万円</p></td></tr></tbody></table><p>出典: マイナビ転職動向調査 2024年版</p>`,
    },
    // ブロック7: リッチテキスト（高年収業界TOP10）
    {
      fieldId: "richTextBlock",
      richText: `<h2>20代で年収が高い業界 TOP10</h2><table><tbody><tr><th><p>順位</p></th><th><p>業界</p></th><th><p>20代平均年収</p></th></tr><tr><td><p>1位</p></td><td><p>金融（投資・証券）</p></td><td><p>450〜550万円</p></td></tr><tr><td><p>2位</p></td><td><p>コンサルティング</p></td><td><p>450〜600万円</p></td></tr><tr><td><p>3位</p></td><td><p>IT・通信</p></td><td><p>380〜480万円</p></td></tr><tr><td><p>4位</p></td><td><p>総合商社</p></td><td><p>400〜500万円</p></td></tr><tr><td><p>5位</p></td><td><p>メーカー（電機・自動車）</p></td><td><p>380〜450万円</p></td></tr><tr><td><p>6位</p></td><td><p>不動産</p></td><td><p>350〜450万円</p></td></tr><tr><td><p>7位</p></td><td><p>広告・メディア</p></td><td><p>350〜420万円</p></td></tr><tr><td><p>8位</p></td><td><p>建設・プラント</p></td><td><p>340〜420万円</p></td></tr><tr><td><p>9位</p></td><td><p>医療・製薬</p></td><td><p>350〜450万円</p></td></tr><tr><td><p>10位</p></td><td><p>人材サービス</p></td><td><p>330〜400万円</p></td></tr></tbody></table>`,
    },
    // ブロック8: リッチテキスト（年収アップ転職パターン）
    {
      fieldId: "richTextBlock",
      richText: `<h2>20代で年収アップしやすい転職パターン</h2><p><strong>同業界×同職種（組織チェンジ）</strong></p><p>経験・スキルをそのまま活かしやすく、年収アップ率が最も高い傾向です。大手企業や成長企業への転職が狙い目です。</p><p><strong>同職種×異業界（業種チェンジ）</strong></p><p>スキルを活かしつつ、年収水準の高い業界へ移る形です。例：小売営業→IT営業、事務→金融事務。</p><p><strong>異職種×同業界（職種チェンジ）</strong></p><p>業界知識を活かしながらキャリアチェンジ。例：営業→マーケティング、SE→PM。</p><p><strong>異職種×異業界（フルチェンジ）</strong></p><p>将来性を見据えた挑戦。短期的に年収が下がることもありますが、成長産業への未経験転職で伸びしろを狙えます。</p>`,
    },
    // ブロック9: リッチテキスト（年収交渉ポイント）
    {
      fieldId: "richTextBlock",
      richText: `<h2>20代転職の年収交渉ポイント</h2><ol><li><p>市場相場を把握する（同年代・同職種の相場を調査し、自分の市場価値を確認）</p></li><li><p>希望年収は現年収の+10〜20%を目安に（20代なら+30〜50万円アップが現実的）</p></li><li><p>交渉タイミングは内定後（選考中は避け、内定後に条件交渉）</p></li><li><p>転職エージェントを活用（交渉代行・企業の予算感の把握がしやすい）</p></li></ol>`,
    },
    // ブロック10: リッチテキスト（FAQ）
    {
      fieldId: "richTextBlock",
      richText: `<h2>よくある質問（FAQ）</h2><h3>20代で転職すると年収は下がる？</h3><p>いいえ、約40〜45%の人が年収アップに成功しています。20代は転職市場で需要が高く、特に25〜29歳で転職した人の約46%が年収アップしているデータがあります。ただし、未経験業界へのキャリアチェンジでは一時的に下がることもあります。</p><h3>20代前半と後半、転職に有利なのは？</h3><p>採用企業の需要という観点では、どちらも高いです。20代前半はポテンシャルとして将来性を評価されやすく、20代後半は即戦力として経験・スキルを評価されやすい傾向があります。年収アップ幅は20代後半の方が大きくなりやすいです。</p><h3>第二新卒でも年収アップできる？</h3><p>可能です。第二新卒（新卒入社後1〜3年程度）でも、業界・企業選びによって年収アップは十分可能です。特に、年収水準の低い業界から高い業界（IT、コンサル、金融など）への転職は効果的です。</p><h3>20代で年収500万円は可能？</h3><p>可能です。20代で年収500万円以上の人は全体の約15%程度存在します。コンサル、金融、IT（外資系含む）などの業界、または営業職で成果を出すことで到達可能です。</p><h3>転職回数が多いと年収に影響する？</h3><p>2〜3回程度であれば大きな影響はありません。ただし、短期間（1年未満）での転職を繰り返すと定着しない人材と見なされ、年収交渉で不利になる可能性があります。転職理由をポジティブに説明できることが重要です。</p>`,
    },
  ],
};

// --- 入稿処理 ---

async function postArticle() {
  console.log(`📝 記事を入稿します: "${articleData.title}"`);
  console.log(`   slug: ${articleData.slug}`);
  console.log(`   category: ${articleData.category.join(", ")}`);
  console.log(`   bodyBlocks: ${articleData.bodyBlocks.length} ブロック`);
  console.log("");

  const res = await fetch(`${ENDPOINT}?status=draft`, {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  });

  if (res.ok) {
    const data = await res.json();
    console.log("✅ 入稿成功（下書きとして保存されました）");
    console.log(`   コンテンツID: ${data.id}`);
    console.log(
      `   管理画面: https://tedorisan.microcms.io/apis/articles/${data.id}`
    );
  } else {
    const errorText = await res.text();
    console.error(`❌ 入稿失敗 (HTTP ${res.status})`);
    console.error(`   ${errorText}`);
    process.exit(1);
  }
}

postArticle();
