/**
 * microCMS 広告設定（ads）入稿スクリプト
 *
 * 使い方:
 *   npx tsx scripts/post-ads.ts
 *
 * 前提:
 *   .env.local に MICROCMS_API_KEY が設定されていること
 *
 * 処理内容:
 *   1. lib/comparisonData.ts の affiliateServices を読み込む
 *   2. targetSituation に基づいてカテゴリ（skill-up / career-change）にグルーピング
 *   3. カテゴリごとに1レコードとして microCMS の ads API に下書きPOST
 *
 * 注意:
 *   - 下書きとして保存される（公開はされない）
 *   - 重複入稿に注意（1回だけ実行すること）
 *   - gitにコミットしない（使い捨てスクリプト）
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// ============================================================
// .env.local 読み込み
// ============================================================
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed
      .slice(eqIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
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

const ENDPOINT = "https://tedorisan.microcms.io/api/v1/ads";

// ============================================================
// カテゴリマッピング
// ============================================================
type Category = "skill-up" | "career-change";

/** targetSituation → カテゴリのマッピング */
const SITUATION_TO_CATEGORY: Record<string, Category> = {
  it_beginner: "skill-up",
  it_experienced: "skill-up",
  programming: "skill-up",
  pharmacist: "skill-up",
  video_editing: "skill-up",
  second_graduate: "career-change",
};

/** デフォルトカテゴリ（マッピングにないもの） */
const DEFAULT_CATEGORY: Category = "career-change";

// ============================================================
// ASP判定
// ============================================================
function detectAspName(url: string): string {
  if (url.includes("a8.net") || url.includes("a8mat")) return "a8";
  if (url.includes("accesstrade.net")) return "accesstrade";
  return "unknown";
}

// ============================================================
// サービスペイロード型（microCMS スキーマ準拠）
// ============================================================
// フィールド種別:
//   serviceName      : text (required)
//   serviceDescription: text
//   features         : richEditorV2  → HTML文字列
//   price            : text
//   rating           : number
//   affiliateUrl     : text (required)
//   aspName          : select (single) → ["a8"] 形式
//   bannerHtml       : textArea
//   thumbnailImage   : media          → 省略
//   ctaText          : text
//   subsidyInfo      : text
//   targetSituations : text
type ServicePayload = {
  fieldId: "serviceInfo";
  serviceName: string;          // required
  affiliateUrl: string;         // required
  serviceDescription?: string;
  features?: string;            // richEditorV2 → HTML
  price?: string;
  rating?: number;
  aspName?: string[];           // select → 配列
  bannerHtml?: string;          // textArea
  ctaText?: string;
  subsidyInfo?: string;
  targetSituations?: string;
};

/** サービスが属するカテゴリ一覧を返す（重複なし） */
function getCategories(situations: string[]): Category[] {
  const categories = new Set<Category>();
  for (const sit of situations) {
    categories.add(SITUATION_TO_CATEGORY[sit] ?? DEFAULT_CATEGORY);
  }
  return [...categories];
}

// ============================================================
// メイン処理
// ============================================================
async function main() {
  // comparisonData を動的import
  const { affiliateServices } = await import("../lib/comparisonData");

  /** features 配列を richEditorV2 用のHTML文字列に変換 */
  function featuresToHtml(features: string[]): string {
    const items = features.map((f) => `<li>${f}</li>`).join("");
    return `<ul>${items}</ul>`;
  }

  /** 1つのサービスを microCMS 用のペイロードに変換 */
  function toServicePayload(
    service: (typeof affiliateServices)[number]
  ): ServicePayload {
    const asp = detectAspName(service.affiliateUrl);

    // 必須フィールドのみで初期化
    const payload: ServicePayload = {
      fieldId: "serviceInfo",
      serviceName: service.name,
      affiliateUrl: service.affiliateUrl,
    };

    // オプショナルフィールド（値がある場合のみ設定）
    if (service.description) {
      payload.serviceDescription = service.description;
    }
    if (service.features?.length) {
      payload.features = featuresToHtml(service.features);
    }
    if (service.rating != null) {
      payload.rating = service.rating;
    }
    if (asp !== "unknown") {
      payload.aspName = [asp]; // select フィールド → 配列
    }
    if (service.bannerHtml) {
      payload.bannerHtml = service.bannerHtml;
    }
    if (service.targetSituation?.length) {
      payload.targetSituations = service.targetSituation.join(",");
    }
    // price, ctaText, subsidyInfo は comparisonData に存在しないため省略
    // thumbnailImage (media) は使用しないため省略

    return payload;
  }

  // カテゴリ → サービスペイロード[] のマップを構築
  const categoryMap = new Map<Category, ServicePayload[]>();

  for (const service of affiliateServices) {
    const cats = getCategories(service.targetSituation);
    const payload = toServicePayload(service);

    for (const cat of cats) {
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
      }
      categoryMap.get(cat)!.push(payload);
    }
  }

  // ログ出力
  console.log("=".repeat(60));
  console.log("📢 microCMS 広告設定（ads）入稿スクリプト");
  console.log("=".repeat(60));
  console.log(`   エンドポイント: ${ENDPOINT}`);
  console.log(`   カテゴリ数: ${categoryMap.size}`);
  console.log(`   総サービス数: ${affiliateServices.length}`);
  console.log("");

  // グルーピング内容を表示
  for (const [cat, services] of categoryMap) {
    console.log(`📁 ${cat} (${services.length}件)`);
    for (const s of services) {
      console.log(
        `   - ${s.serviceName} [${s.aspName?.[0] ?? "?"}] (${s.targetSituations ?? ""})`
      );
    }
  }
  console.log("");

  // カテゴリごとにPOST
  let successCount = 0;
  let failCount = 0;

  for (const [category, services] of categoryMap) {
    const body = {
      categorySlug: [category], // microCMS セレクトフィールドは配列で送る
      services,
    };

    console.log(
      `📝 POSTします: カテゴリ「${category}」（${services.length}件のサービス）`
    );

    try {
      const res = await fetch(`${ENDPOINT}?status=draft`, {
        method: "POST",
        headers: {
          "X-MICROCMS-API-KEY": API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`   ✅ 成功（下書き保存）`);
        console.log(`      コンテンツID: ${data.id}`);
        console.log(
          `      管理画面: https://tedorisan.microcms.io/apis/ads/${data.id}`
        );
        successCount++;
      } else {
        const errorText = await res.text();
        console.error(`   ❌ 失敗 (HTTP ${res.status})`);
        console.error(`      ${errorText}`);
        failCount++;
      }
    } catch (err) {
      console.error(`   ❌ 通信エラー: ${err}`);
      failCount++;
    }

    console.log("");
  }

  // 結果サマリー
  console.log("=".repeat(60));
  console.log("📊 結果サマリー");
  console.log(`   成功: ${successCount}件`);
  console.log(`   失敗: ${failCount}件`);
  console.log("=".repeat(60));

  if (failCount > 0) {
    process.exit(1);
  }
}

main();
