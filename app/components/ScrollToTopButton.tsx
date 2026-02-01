'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`
        fixed left-0 right-0 z-40
        pointer-events-none
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ bottom: 'calc(76px + 16px)' }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-end">
        <button
          onClick={scrollToTop}
          className={`
            ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}
            w-12 h-12 
            text-white 
            rounded-full 
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-shadow duration-200
            hover:brightness-110
          `}
          style={{ background: '#2563EB' }}
          aria-label="ページの先頭に戻る"
        >
          {/* 上矢印アイコン */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
