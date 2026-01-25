import type { Metadata } from 'next';
import FreshGraduateClient from '../components/FreshGraduateClient';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '新卒手取り計算 - 内定先年収シミュレーター｜テドリさん',
  description:
    '内定先の年収から手取り額を計算。新卒の平均年収との比較も表示。生活費シミュレーション付きで一人暮らしの判断も可能。就活生・新社会人向けの給与計算ツール。完全無料。',
  keywords: ['新卒 手取り', '新卒 年収', '新卒 手取り 平均', '新卒 手取り 計算', '就活 年収', '内定 手取り', '新社会人 給料'],
  canonicalPath: '/fresh-graduate',
  openGraphTitle: '新卒手取り計算 - 内定先年収シミュレーター',
  openGraphDescription: '内定先の年収から手取り額を計算',
  openGraphType: 'website',
});

export default function FreshGraduatePage() {
  return <FreshGraduateClient />;
}
