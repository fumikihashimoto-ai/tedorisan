import type { Metadata } from 'next';
import SideBusinessClient from '../../components/SideBusinessClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '副業税金シミュレーター - 確定申告判定ツール｜テドリさん',
  description:
    '副業収入の税金を自動計算。確定申告が必要か判定します。20万円ルールもわかりやすく解説。本業+副業の手取り額を計算。経費計上や青色申告の効果も比較。完全無料。',
  keywords: [
    '副業 税金',
    '副業 税金 計算',
    '副業 確定申告',
    '副業 税金 いくらから',
    '副業 手取り',
    '副業 税金シミュレーション',
    '確定申告 いくらから',
  ],
  canonicalPath: '/tools/side-business',
  openGraphTitle: '副業税金シミュレーター - 確定申告判定ツール',
  openGraphDescription: '副業収入の税金を自動計算',
  openGraphType: 'website',
});

export default function SideBusinessPage() {
  return <SideBusinessClient />;
}
