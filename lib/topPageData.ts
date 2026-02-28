import { IMAGE_PATHS } from '@/app/lib/constants/styles';
import type { CategoryButton, RecommendArticle } from './topPageTypes';

/**
 * 転職カテゴリボタン（8個）
 */
export const transferCategories: CategoryButton[] = [
  {
    id: '20s',
    label: '20代の転職',
    href: '/comparison/20s/',
    icon: '🔵',
  },
  {
    id: '30s',
    label: '30代の転職',
    href: '/comparison/30s/',
    icon: '🔵',
  },
  {
    id: '40s',
    label: '40代の転職',
    href: '/comparison/40s/',
    icon: '🔵',
  },
  {
    id: '50s',
    label: '50代の転職',
    href: '/comparison/50s/',
    icon: '🔵',
  },
  {
    id: 'it-engineer',
    label: 'ITエンジニア',
    href: '/comparison/it-engineer/',
    icon: '🔵',
  },
  {
    id: 'pharmacist',
    label: '薬剤師',
    href: '/comparison/pharmacist/',
    icon: '🔵',
  },
  {
    id: 'sales',
    label: '営業・販売職',
    href: '/comparison/sales/',
    icon: '🔵',
  },
  {
    id: 'high-class',
    label: 'ハイクラス',
    href: '/comparison/high-class/',
    icon: '🔵',
  },
];

/**
 * スキルアップカテゴリボタン（2個）
 */
export const skillupCategories: CategoryButton[] = [
  {
    id: 'programming',
    label: 'プログラミング',
    href: '/comparison/programming/',
    icon: '🔵',
  },
  {
    id: 'video_editing',
    label: '動画編集',
    href: '/comparison/video-editing/',
    icon: '🔵',
  },
];

/**
 * RECOMMEND 記事（6件）
 * 実在する記事ページへのリンク
 */
export const recommendArticles: RecommendArticle[] = [
  {
    id: '1',
    title: 'アラフォーが未経験からのエンジニア転職',
    href: '/qualifications/araforty-engineer/',
    imageUrl: IMAGE_PATHS.heroAraforty,
    category: '転職',
    tags: ['ITエンジニア'],
  },
  {
    id: '2',
    title: '20代ITエンジニアの転職成功事例',
    href: '/magazine/inexperienced/20s',
    imageUrl: IMAGE_PATHS.heroAraforty,
    category: '転職',
    tags: ['20代', 'ITエンジニア'],
  },
  {
    id: '3',
    title: '未経験からエンジニアになるための学習ロードマップ',
    href: '/qualifications/araforty-engineer/',
    imageUrl: IMAGE_PATHS.heroAraforty,
    category: 'スキルアップ',
    tags: ['未経験', 'エンジニア'],
  },
  {
    id: '4',
    title: 'ITエンジニアの年収・手取りを詳しく解説',
    href: '/magazine/job-salary/it-engineer',
    imageUrl: IMAGE_PATHS.heroItEngineer,
    category: '年収',
    tags: ['ITエンジニア', '年収'],
  },
  {
    id: '5',
    title: 'フリーランスエンジニアの年収と働き方',
    href: '/career/high-income',
    imageUrl: IMAGE_PATHS.heroAraforty,
    category: 'キャリア',
    tags: ['フリーランス', '年収'],
  },
  {
    id: '6',
    title: '30代の転職成功事例',
    href: '/magazine/inexperienced/30s',
    imageUrl: IMAGE_PATHS.heroAraforty,
    category: '転職',
    tags: ['30代', '転職'],
  },
];
