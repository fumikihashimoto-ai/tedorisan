'use client';

import { useState } from 'react';
import type { DiagnosisResult as DiagnosisResultType } from '@/lib/diagnosisLogic';
import { DiagnosisSection } from './DiagnosisSection';
import { DiagnosisResult } from './DiagnosisResult';
import HomeClient from './HomeClient';
import TopPageSidebar from './TopPageSidebar';

export function HomePageClient() {
  const [diagnosisResult, setDiagnosisResult] =
    useState<DiagnosisResultType | null>(null);

  const handleDiagnosisComplete = (result: DiagnosisResultType) => {
    setDiagnosisResult(result);
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
      <div className="lg:flex lg:gap-10 xl:gap-12 lg:items-start overflow-visible">
        <main className="w-full lg:flex-1 lg:max-w-[800px] xl:max-w-[900px] min-w-0">
          {/* セクション1: 診断ツール */}
          <section className="mb-10">
            <DiagnosisSection onComplete={handleDiagnosisComplete} />
          </section>

          {/* セクション2: 診断結果 */}
          <section id="result" className="mb-12" aria-label="診断結果">
            {diagnosisResult && (
              <DiagnosisResult result={diagnosisResult} />
            )}
          </section>

          {/* セクション3: 手取り計算ツール */}
          <section className="mb-10">
            <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-[#1E293B] mb-3">
              年収から手取りを詳しく計算
            </h2>
            <p className="text-[#64748B] text-base mb-6">
              転職後の年収、資格取得後の年収など、将来の手取り額をシミュレーションできます
            </p>
            <HomeClient />
          </section>
        </main>

        <TopPageSidebar />
      </div>
    </div>
  );
}
