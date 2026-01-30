'use client';

/**
 * 3カラムの計算結果テーブル（項目/年収/月収）
 * スマホで横スクロールなしで表示される
 */
export interface ResultTableAnnualMonthlyItem {
  label: string;
  annual: string;
  monthly: string;
  highlight?: boolean;
}

export interface ResultTableAnnualMonthlyProps {
  items: ResultTableAnnualMonthlyItem[];
  className?: string;
}

export default function ResultTableAnnualMonthly({
  items,
  className = '',
}: ResultTableAnnualMonthlyProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-[35%] border border-gray-300 px-4 py-2 text-center">
              項目
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              年収
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              月収
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr
              key={i}
              className={item.highlight ? 'font-bold bg-amber-50' : ''}
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item.label}
              </td>
              <td className="tabular-nums border border-gray-300 px-4 py-2 text-right">
                {item.annual}
              </td>
              <td className="tabular-nums border border-gray-300 px-4 py-2 text-right">
                {item.monthly}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
