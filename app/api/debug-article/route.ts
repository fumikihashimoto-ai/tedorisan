import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/microcms';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') ?? 'high-school-career';

  const article = await getArticleBySlug(slug);

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  // bodyBlocksの生データを詳細に出力
  const blockDetails = article.bodyBlocks.map((block, i) => ({
    index: i,
    fieldId: block.fieldId,
    fieldIdType: typeof block.fieldId,
    fieldIdCharCodes: Array.from(block.fieldId).map((c) => c.charCodeAt(0)),
    hasRichText: !!block.richText,
    partType: block.partType,
    partTypeType: typeof block.partType,
    partTypeCharCodes: block.partType
      ? Array.from(block.partType).map((c) => c.charCodeAt(0))
      : null,
    partCategory: block.partCategory,
    rawBlock: block,
  }));

  return NextResponse.json({
    slug: article.slug,
    title: article.title,
    blockCount: article.bodyBlocks.length,
    blockDetails,
  });
}
