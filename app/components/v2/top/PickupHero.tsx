'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/microcms';
import { CATEGORY_LABELS } from '@/lib/articleCategories';
import { formatArticleDate } from '@/lib/dateFormat';

interface PickupHeroProps {
  articles: Article[];
}

/** 自動スクロール間隔（ミリ秒） */
const AUTOPLAY_INTERVAL = 5000;
/** ユーザー操作後の自動スクロール再開待機（ミリ秒） */
const RESUME_DELAY = 8000;

export default function PickupHero({ articles }: PickupHeroProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef(0);

  const total = articles.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /** ユーザー操作時：一時停止 → RESUME_DELAY後に再開 */
  const pauseAndResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  // 自動スクロール
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, next, total]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // タッチイベント
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartRef.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        pauseAndResume();
        if (diff > 0) next();
        else prev();
      }
    },
    [next, prev, pauseAndResume],
  );

  // 単体表示（1件のみ）
  if (total <= 1) {
    const article = articles[0];
    if (!article) return null;
    return <SingleSlide article={article} />;
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-4 md:py-6 lg:py-8">
      {/* カルーセル本体 */}
      <div
        className="relative overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* スライドトラック */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {articles.map((article) => {
            const category = article.category?.[0] ?? 'career-change';
            const href = `/articles/${category}/${article.slug}`;
            return (
              <div key={article.id} className="w-full flex-shrink-0">
                <Link href={href} className="block group">
                  {article.thumbnail ? (
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={article.thumbnail.url}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
                        priority={current === 0}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[16/9] bg-[#f5f5f5]">
                      <Image
                        src="/images/default-thumbnail.png"
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
                      />
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* PC: 左右矢印ボタン */}
        <button
          onClick={() => {
            pauseAndResume();
            prev();
          }}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/90 transition-colors duration-200"
          aria-label="前のスライド"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#3f3f3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => {
            pauseAndResume();
            next();
          }}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/90 transition-colors duration-200"
          aria-label="次のスライド"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="#3f3f3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* テキスト情報（現在のスライド） */}
      <SlideText article={articles[current]} />

      {/* ドットインジケーター */}
      <div className="flex justify-center gap-2 mt-4">
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              pauseAndResume();
              goTo(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
              i === current ? 'bg-[#0a57d1]' : 'bg-gray-300'
            }`}
            aria-label={`スライド${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/** 単体表示（カルーセルなし） */
function SingleSlide({ article }: { article: Article }) {
  const category = article.category?.[0] ?? 'career-change';
  const href = `/articles/${category}/${article.slug}`;

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-4 md:py-6 lg:py-8">
      <Link href={href} className="block group">
        {article.thumbnail ? (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#f5f5f5]">
            <Image
              src="/images/default-thumbnail.png"
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}
      </Link>
      <SlideText article={article} />
    </section>
  );
}

/** スライドのテキスト情報（共通） */
function SlideText({ article }: { article: Article }) {
  const category = article.category?.[0] ?? 'career-change';
  const href = `/articles/${category}/${article.slug}`;

  return (
    <Link href={href} className="block group mt-4">
      {article.category.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {article.category.map((cat) => (
            <span
              key={cat}
              className="font-['Noto_Sans_JP'] text-[10px] text-[#1390c8] bg-[#f0f9ff] px-1.5 py-0.5 rounded"
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </span>
          ))}
        </div>
      )}
      {formatArticleDate(article.publishedAt, article.updatedAt) && (
        <p className="font-['Noto_Sans_JP'] text-xs text-gray-500 mb-1">
          {formatArticleDate(article.publishedAt, article.updatedAt)}
        </p>
      )}
      <h2 className="font-['Noto_Sans_JP'] text-xl md:text-2xl font-bold text-[#3f3f3f] group-hover:text-[#1390c8] transition-colors duration-200">
        {article.title}
      </h2>
      {article.description && (
        <p className="font-['Noto_Sans_JP'] text-sm text-gray-600 mt-2 line-clamp-2">
          {article.description}
        </p>
      )}
    </Link>
  );
}
