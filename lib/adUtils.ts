import type { AdService, AdCreative } from './microcms';

/** microCMSセレクトフィールドは配列で返る場合がある。先頭の値を文字列として取得する */
function resolveField(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return (value[0] ?? '').trim().toLowerCase();
  return (value ?? '').trim().toLowerCase();
}

/**
 * 記事に合致する広告サービスを取得する
 *
 * マッチング優先順位:
 * 1. is_active = true のもののみ
 * 2. 記事の category と service_category が一致
 * 3. 記事の target_occupation が occupation_tags に含まれるサービスを優先
 * 4. priority 昇順でソート
 */
export function matchAdServices(
  services: AdService[],
  articleCategory: string,
  targetOccupation?: string | string[],
): AdService[] {
  // カテゴリマッピング: 記事カテゴリ → 広告サービスカテゴリ
  const categoryMap: Record<string, string> = {
    'career-change': 'career-change',
    'skill-up': 'skill-up',
    'salary-data': 'career-change',
    'salary-basics': 'tax-saving',
  };

  const serviceCategory = categoryMap[articleCategory] ?? articleCategory;

  const active = services.filter(
    (s) => s.is_active && resolveField(s.service_category) === serviceCategory,
  );

  // occupation マッチするものを先頭に、その中で priority 昇順
  const withOccupation: AdService[] = [];
  const withoutOccupation: AdService[] = [];

  const resolvedOccupation = resolveField(targetOccupation);

  for (const s of active) {
    if (
      resolvedOccupation &&
      s.occupation_tags.includes(resolvedOccupation)
    ) {
      withOccupation.push(s);
    } else {
      withoutOccupation.push(s);
    }
  }

  const byPriority = (a: AdService, b: AdService) =>
    a.priority - b.priority;

  return [
    ...withOccupation.sort(byPriority),
    ...withoutOccupation.sort(byPriority),
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
 * マッチしたサービスに紐づく広告素材を format で絞り込む
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
