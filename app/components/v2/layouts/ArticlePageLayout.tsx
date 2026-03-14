import React from 'react';
import PageLayout from './PageLayout';
import { HeroSectionText } from '../HeroSectionText';

interface ArticlePageLayoutProps {
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
  /** ヒーロー1行目キャッチコピー */
  catchphrase1?: string;
  /** ヒーロー2行目サブコピー */
  catchphrase2?: string;
}

/**
 * 記事ページ共通レイアウト（it-engineer仕様）。
 * - コンテンツ幅750px
 * - ヒーローセクション（TOP同様）
 * - contentLayout対応コンポーネント用
 */
export default function ArticlePageLayout({
  children,
  className = '',
  catchphrase1,
  catchphrase2,
}: ArticlePageLayoutProps) {
  return (
    <PageLayout maxWidth="content" className={className}>
      {/* ヒーロー（TOPと同様・750px幅で表示） */}
      <div className="-mx-4">
        <HeroSectionText
          catchphrase1={catchphrase1}
          catchphrase2={catchphrase2}
        />
      </div>
      {children}
    </PageLayout>
  );
}
