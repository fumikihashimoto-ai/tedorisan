'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { calculateTakeHome } from '@/lib/salaryCalculator';
import { averageIncomeByIndustry, industryOptions, type IndustryType, type AgeGroup } from '@/lib/industryIncomeData';
import CustomSelect, { type CustomSelectOption } from './CustomSelect';
import { Card } from './ui';
import ArticleSectionHeading from './v2/article/ArticleSectionHeading';
import TablesArticle from '@/app/tables/TablesArticle';

const AGE_OPTIONS: CustomSelectOption[] = [
  { value: '20代', label: '20代' },
  { value: '30代', label: '30代' },
  { value: '40代', label: '40代' },
  { value: '50代', label: '50代' },
  { value: '60代以上', label: '60代以上' },
];

type TakeHomeRow = {
  income: number;
  amountInMan: number;
  takeHomeMan: number;
  monthlyTakeHomeMan: number;
};

export default function ComparisonListClient() {
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);

  // 年収200万円から1000万円まで20万円刻み（円）
  const incomeList = useMemo(() => {
    const list: number[] = [];
    for (let i = 200; i <= 1000; i += 20) {
      list.push(i * 10000);
    }
    return list;
  }, []);

  const averageIncome = useMemo(() => {
    if (!ageGroup || !industry) return null;
    return averageIncomeByIndustry[industry as IndustryType]?.[ageGroup as AgeGroup] ?? null;
  }, [ageGroup, industry]);

  // 重い計算（所得税/住民税/社保の内訳含む）は一度だけ作ってキャッシュ
  const takeHomeRows: TakeHomeRow[] = useMemo(() => {
    return incomeList.map((income) => {
      const result = calculateTakeHome(income, 0); // 扶養人数0人
      const amountInMan = income / 10000;
      return {
        income,
        amountInMan,
        takeHomeMan: Math.round(result.takeHome / 10000),
        monthlyTakeHomeMan: Math.round(result.monthlyTakeHome / 10000),
      };
    });
  }, [incomeList]);

  // 条件にマッチする行と上下3件ずつを表示
  const displayedRows = useMemo(() => {
    if (!averageIncome) return [];
    const avgIncomeYen = averageIncome * 10000;
    let centerIndex = takeHomeRows.findIndex(
      (row) => Math.abs(row.income - avgIncomeYen) < 100000
    );
    if (centerIndex === -1) {
      centerIndex = takeHomeRows.reduce(
        (closest, row, i) =>
          Math.abs(row.income - avgIncomeYen) <
          Math.abs(takeHomeRows[closest].income - avgIncomeYen)
            ? i
            : closest,
        0
      );
    }
    const start = Math.max(0, centerIndex - 3);
    const end = Math.min(takeHomeRows.length, centerIndex + 4);
    return takeHomeRows.slice(start, end);
  }, [takeHomeRows, averageIncome]);

  return (
    <div className="font-['Noto_Sans_JP']">
      <p className="text-[14px] leading-[25px] mb-6">
              「手取りが少なくて将来が不安」「自分の年代の平均手取りはどれくらい?」そんな漠然とした疑問や悩みを抱えていませんか?本記事では、新社会人から老後準備期まで、年代別のリアルな手取り額とその背景にある税金や社会保険料の仕組みを徹底解説します。さらに、効率的な節税対策、スキルアップや副業による収入増、NISAやiDeCoを最大限に活用した賢い資産形成術まで、手取りを最大化し、経済的な不安を解消するための具体的な戦略を網羅。この記事を読めば、あなたの年代における手取りの現状と未来が明確になり、豊かな将来設計を描くための具体的な行動指針が見つかるはずです。
            </p>

            <Card variant="flat">
              <ArticleSectionHeading>業種・年代別 手取り一覧表</ArticleSectionHeading>
              <div className="flex flex-wrap md:flex-nowrap gap-4 items-end">
                {/* 業種選択 */}
                <div className="min-w-[140px] flex-1 md:flex-initial">
                  <label className="block font-['Noto_Sans_JP'] text-[14px] leading-[25px] text-gray-600 mb-1">業種を選択</label>
                  <CustomSelect
                    options={industryOptions}
                    value={industry}
                    onChange={(value) => setIndustry(value)}
                    placeholder="業種を選択してください"
                  />
                </div>

                {/* 年代選択 */}
                <div className="min-w-[140px] flex-1 md:flex-initial">
                  <label className="block font-['Noto_Sans_JP'] text-[14px] leading-[25px] text-gray-600 mb-1">年代を選択</label>
                  <CustomSelect
                    options={AGE_OPTIONS}
                    value={ageGroup}
                    onChange={(value) => {
                      setAgeGroup(value);
                      if (industry) {
                        setTimeout(() => {
                          tableRef.current?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }, 100);
                      }
                    }}
                    placeholder="年代を選択してください"
                  />
                </div>
              </div>
            </Card>

        {ageGroup && industry && (
          <>
            {/* 一覧表 */}
            <div className="md:hidden font-['Noto_Sans_JP'] text-[12px] leading-[25px] mb-3">
              ※ 表は横にスクロールできます（左右にスワイプ）
            </div>
            <div id="income-table" ref={tableRef} className="overflow-x-auto md:mt-6">
            <table className="w-full border-collapse font-['Noto_Sans_JP'] text-[14px] leading-[25px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    年収
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    手取り年収
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    手取り月収
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((row) => {
                  const isAverageRow =
                    averageIncome !== null &&
                    Math.abs(row.income - averageIncome * 10000) < 100000;

                  return (
                    <tr
                      key={row.income}
                      className={isAverageRow ? 'font-bold bg-amber-50' : ''}
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {isAverageRow && <span className="mr-2 text-lg">※</span>}
                        {row.amountInMan}万円
                      </td>
                      <td className="tabular-nums border border-gray-300 px-4 py-2 text-right">
                        {row.takeHomeMan}万円
                      </td>
                      <td className="tabular-nums border border-gray-300 px-4 py-2 text-right">
                        {row.monthlyTakeHomeMan}万円
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

            {/* CTAセクション */}
            <div className="mt-8 text-center">
              <p className="text-[14px] font-semibold text-gray-800 mb-4">
                あなたの詳細な手取り額を計算
              </p>
              <Link href="/" className="btn-primary-inline">
                手取りのミカタを使う
              </Link>
            </div>
          </>
        )}

            {/* 記事本文 */}
            <TablesArticle />

            {/* ページ下部CTA */}
            <div className="mt-8 text-center">
              <p className="text-[14px] font-semibold text-gray-800 mb-4">
                あなたの詳細な手取り額を計算
              </p>
              <Link href="/" className="btn-primary-inline">
                手取りのミカタを使う
              </Link>
            </div>
    </div>
  );
}
