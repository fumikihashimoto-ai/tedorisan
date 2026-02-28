/**
 * Google Analytics 4 (gtag.js) の型定義
 * window.gtag は Google Analytics スクリプト読み込み後に注入される
 */
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      eventNameOrTargetId: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

export {};
