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
  partType?: string;
  partCategory?: string;
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
