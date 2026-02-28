import React from 'react';
import Link from 'next/link';
import PageLayout from './PageLayout';
import SectionTitle from '../common/SectionTitle';
import { COLORS } from '@/app/lib/constants/styles';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  publishedDate?: string;
  updatedDate?: string;
  author?: string;
  category?: string;
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'wide';
}

export default function ArticleLayout({
  children,
  title,
  description,
  breadcrumbs = [],
  publishedDate,
  updatedDate,
  author = '手取りのミカタ編集部',
  category,
  maxWidth = 'desktop',
}: ArticleLayoutProps) {
  return (
    <PageLayout maxWidth={maxWidth}>
      {/* パンくずリスト */}
      {breadcrumbs.length > 0 && (
        <nav className="py-3 mb-4" aria-label="パンくずリスト">
          <ol
            className="flex items-center gap-2 text-sm flex-wrap"
            style={{ color: COLORS.textSecondary }}
          >
            <li>
              <Link
                href="/"
                className="transition hover:opacity-80"
                style={{ color: COLORS.primary }}
              >
                ホーム
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                <span style={{ color: COLORS.textInactive }}>›</span>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition hover:opacity-80"
                    style={{ color: COLORS.primary }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium"
                    style={{ color: COLORS.textPrimary }}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* カテゴリバッジ */}
      {category && (
        <div className="mb-3">
          <span
            className="inline-block text-white text-xs font-bold py-1 px-3 rounded-sm"
            style={{ backgroundColor: COLORS.primaryLight }}
          >
            {category}
          </span>
        </div>
      )}

      {/* 記事タイトル */}
      <header className="mb-6">
        <SectionTitle level="h1" color="dark" className="mb-3">
          {title}
        </SectionTitle>

        {description && (
          <p
            className="text-base leading-relaxed"
            style={{ color: COLORS.textSecondary }}
          >
            {description}
          </p>
        )}

        {/* メタ情報 */}
        <div
          className="flex flex-wrap items-center gap-4 mt-4 text-sm"
          style={{ color: COLORS.textSecondary }}
        >
          {publishedDate && (
            <div className="flex items-center gap-1">
              <span className="font-medium">公開日:</span>
              <time dateTime={publishedDate}>
                {new Date(publishedDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          )}

          {updatedDate && (
            <div className="flex items-center gap-1">
              <span className="font-medium">更新日:</span>
              <time dateTime={updatedDate}>
                {new Date(updatedDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          )}

          {author && (
            <div className="flex items-center gap-1">
              <span className="font-medium">著者:</span>
              <span>{author}</span>
            </div>
          )}
        </div>
      </header>

      {/* 記事本文 */}
      <article className="prose prose-sm md:prose-base max-w-none mb-8">
        {children}
      </article>
    </PageLayout>
  );
}
