import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

// 型定義
export type ArticleThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type ArticleBodyBlock = {
  fieldId: string;
  richText?: string;
  partType?: string | string[];
  partCategory?: string | string[];
  pointTitle?: string;
  pointBody?: string;
  pointVariant?: string | string[];
  sectionBarTitle?: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string[];
  thumbnail: ArticleThumbnail | null;
  bodyBlocks: ArticleBodyBlock[];
};

// 広告サービス情報（ads API / serviceInfo カスタムフィールド）
export type AdServiceInfo = {
  fieldId: "serviceInfo";
  serviceName: string;
  serviceDescription?: string;
  /** richEditorV2 → HTML文字列 */
  features?: string;
  price?: string;
  /** 数値（1〜5） */
  rating?: number;
  affiliateUrl: string;
  /** セレクトフィールド: "a8" | "accesstrade" | "other" */
  aspName?: string[];
  /** テキストエリア（A8.net等のバナータグ） */
  bannerHtml?: string;
  /** メディアフィールド */
  thumbnailImage?: { url: string; width: number; height: number } | null;
  ctaText?: string;
  subsidyInfo?: string;
  /** カンマ区切り: "it_beginner,programming" 等 */
  targetSituations?: string;
};

// 広告レコード（ads API）
export type Ad = {
  id: string;
  /** セレクトフィールド: "career-change" | "skill-up" | "salary-data" | "salary-basics" */
  categorySlug: string[];
  /** 繰り返しフィールド（serviceInfo カスタムフィールド） */
  services: AdServiceInfo[];
};

// microCMSクライアント初期化
export const client = createClient({
  serviceDomain: "tedorisan",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// 記事一覧取得
export async function getArticles(queries?: MicroCMSQueries) {
  return await client.getList<Article>({
    endpoint: "articles",
    queries,
  });
}

// カテゴリ別記事一覧取得
export async function getArticlesByCategory(
  category: string,
  queries?: MicroCMSQueries
) {
  return await client.getList<Article>({
    endpoint: "articles",
    queries: {
      ...queries,
      filters: `category[contains]${category}`,
    },
  });
}

// 広告一覧取得
export async function getAds(queries?: MicroCMSQueries) {
  return await client.getList<Ad>({
    endpoint: "ads",
    queries,
  });
}

// カテゴリ別広告取得
export async function getAdsByCategory(
  category: string,
  queries?: MicroCMSQueries
) {
  return await client.getList<Ad>({
    endpoint: "ads",
    queries: {
      ...queries,
      filters: `categorySlug[contains]${category}`,
    },
  });
}

// 記事詳細取得（slugでフィルタして1件取得）
export async function getArticleBySlug(slug: string) {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return data.contents[0] ?? null;
}
