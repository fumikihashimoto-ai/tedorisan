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
  /** 対象職種（v4広告マッチング用・microCMSセレクトフィールド: 配列で返る場合あり） */
  target_occupation?: string | string[];
  /** 300×250バナー広告を表示するか */
  show_ad_300x250?: boolean;
  /** 固定広告素材（複数コンテンツ参照: ad_creatives）— 設定時は通常マッチングをスキップ */
  fixed_ad_creative?: AdCreative[];
  /** microCMS自動付与: 公開日時（ISO 8601） */
  publishedAt?: string;
  /** microCMS自動付与: 更新日時（ISO 8601） */
  updatedAt?: string;
};

// v4広告サービス（ad-services API）
export type AdService = {
  id: string;
  name: string;
  /** "career-change" | "skill-up" | "side-job" | "tax-saving"（microCMSセレクトフィールド: 配列で返る場合あり） */
  service_category: string | string[];
  /** 対象職種タグ */
  occupation_tags: string[];
  /** "a8" | "accesstrade" | "afb" */
  asp: string;
  /** 優先順位（小さいほど優先） */
  priority: number;
  is_active: boolean;
};

// v4広告素材（ad-creatives API）
export type AdCreative = {
  id: string;
  /** コンテンツ参照: ad-services */
  service: AdService;
  /** "text" | "banner_300x250" | "banner_320x50"（microCMSセレクトフィールド: 配列で返る場合あり） */
  format: string | string[];
  /** 広告HTMLコード */
  raw_html: string;
  is_active: boolean;
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

// v4広告サービス一覧取得
export async function getAdServices(queries?: MicroCMSQueries) {
  return await client.getList<AdService>({
    endpoint: "ad-services",
    queries,
  });
}

// v4広告素材一覧取得
export async function getAdCreatives(queries?: MicroCMSQueries) {
  return await client.getList<AdCreative>({
    endpoint: "ad-creatives",
    queries,
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
