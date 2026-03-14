import type { AdService, AdCreative } from './microcms';

/** microCMSセレクトフィールドは配列で返る場合がある。先頭の値を文字列として取得する */
function resolveField(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return (value[0] ?? '').trim().toLowerCase();
  return (value ?? '').trim().toLowerCase();
}

/**
 * 記事カテゴリに対応する広告サービスカテゴリの一覧を返す
 * salary-basics → 自カテゴリ + tax-saving
 * salary-data   → 自カテゴリ + career-change
 */
function getServiceCategories(articleCategory: string): string[] {
  const categoryExtensions: Record<string, string[]> = {
    'salary-basics': ['salary-basics', 'tax-saving'],
    'salary-data': ['salary-data', 'career-change'],
  };
  return categoryExtensions[articleCategory] ?? [articleCategory];
}

/**
 * 記事に合致する広告サービスを取得する
 *
 * マッチングルール:
 * 1. is_active = true のもののみ
 * 2. カテゴリマッチ: 記事の category と service_category が一致
 *    （salary-basics は tax-saving も、salary-data は career-change も対象）
 * 3. 職種マッチ:
 *    - 記事が unspecified → 同カテゴリの全サービスを表示
 *    - 記事が特定職種 → occupation_tags にその職種 or unspecified を含むサービス
 * 4. 職種が完全一致するサービスを優先し、priority 昇順でソート
 */
export function matchAdServices(
  services: AdService[],
  articleCategory: string,
  targetOccupation?: string | string[],
): AdService[] {
  const serviceCategories = getServiceCategories(articleCategory);

  const active = services.filter(
    (s) => s.is_active && serviceCategories.includes(resolveField(s.service_category)),
  );

  const resolvedOccupation = resolveField(targetOccupation);
  const isUnspecified = !resolvedOccupation || resolvedOccupation === 'unspecified';

  let matched: AdService[];

  if (isUnspecified) {
    // 記事が unspecified → 同カテゴリの全サービスを表示対象
    matched = active;
  } else {
    // 記事が特定職種 → occupation_tags にその職種 or "unspecified" を含むサービス
    matched = active.filter(
      (s) =>
        s.occupation_tags.includes(resolvedOccupation) ||
        s.occupation_tags.includes('unspecified'),
    );
  }

  // 職種が完全一致するものを優先し、priority 昇順
  const exactMatch: AdService[] = [];
  const otherMatch: AdService[] = [];

  for (const s of matched) {
    if (!isUnspecified && s.occupation_tags.includes(resolvedOccupation)) {
      exactMatch.push(s);
    } else {
      otherMatch.push(s);
    }
  }

  const byPriority = (a: AdService, b: AdService) =>
    a.priority - b.priority;

  return [
    ...exactMatch.sort(byPriority),
    ...otherMatch.sort(byPriority),
  ];
}

/**
 * 広告HTMLの<a>タグに target="_blank" と rel="noopener noreferrer nofollow" を付与する
 */
export function sanitizeAdHtml(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (_match, attrs: string) => {
    // 既存の target / rel 属性を除去
    let cleaned = attrs
      .replace(/\s*target\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\s*rel\s*=\s*["'][^"']*["']/gi, '');
    return `<a${cleaned} target="_blank" rel="noopener noreferrer nofollow">`;
  });
}

/**
 * マッチしたサービスに紐づくテキスト広告（format = "text"）を1件返す
 * priority順で最も高いサービスのものを優先
 */
export function getTextAd(
  creatives: AdCreative[],
  serviceIds: string[],
): AdCreative | null {
  return findCreative(creatives, serviceIds, 'text');
}

/**
 * マッチしたサービスに紐づく広告素材を format で絞り込み、1件返す
 */
export function findCreative(
  creatives: AdCreative[],
  serviceIds: string[],
  format: string,
): AdCreative | null {
  for (const id of serviceIds) {
    const found = creatives.find(
      (c) =>
        c.is_active &&
        c.service?.id === id &&
        resolveField(c.format) === format,
    );
    if (found) return found;
  }
  return null;
}

/**
 * マッチしたサービスに紐づく広告素材を format で絞り込み、全件返す
 * priority順（serviceIds の順序）で並ぶ
 */
export function findCreatives(
  creatives: AdCreative[],
  serviceIds: string[],
  format: string,
): AdCreative[] {
  const results: AdCreative[] = [];
  const usedIds = new Set<string>();
  for (const id of serviceIds) {
    const found = creatives.filter(
      (c) =>
        c.is_active &&
        c.service?.id === id &&
        resolveField(c.format) === format &&
        !usedIds.has(c.id),
    );
    for (const c of found) {
      results.push(c);
      usedIds.add(c.id);
    }
  }
  return results;
}
