import type { ReactNode } from 'react';

import AdPlaceholder from './AdPlaceholder';

interface CtaCardProps {
  title: string; // 見出しテキスト
  adWidth?: number; // 広告の横幅（デフォルト: 300）
  adHeight?: number; // 広告の高さ（デフォルト: 250）
  children?: ReactNode; // 広告部分をカスタマイズ可能に
}

export default function CtaCard({ title, adWidth = 300, adHeight = 250, children }: CtaCardProps) {
  return (
    <div className="mb-6">
      <div className="font-bold text-[#1E293B] text-base mb-3">{title}</div>
      <div className="mx-auto w-fit">
        {children ?? <AdPlaceholder width={adWidth} height={adHeight} />}
      </div>
    </div>
  );
}

