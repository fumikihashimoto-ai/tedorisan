'use client';

/**
 * 2カラムの計算結果テーブル（項目/金額）
 * スマホで横スクロールなしで表示される
 */
export interface ResultTableItem {
  label: string;
  value: string;
  highlight?: boolean;
  /** ラベル前に表示する接頭辞（例: "-"） */
  labelPrefix?: string;
  /** 合計行として表示（ラベルセル空、valueに「= 手取り」等を表示） */
  isTotalRow?: boolean;
}

export interface ResultTableProps {
  items: ResultTableItem[];
  valueHeader?: string;
  /** ヘッダーを非表示（詳細内訳用） */
  hideHeader?: boolean;
  /** 詳細内訳スタイル（border、padding調整） */
  variant?: 'default' | 'breakdown';
  className?: string;
}

export default function ResultTable({
  items,
  valueHeader = '金額（年間概算）',
  hideHeader = false,
  variant = 'default',
  className = '',
}: ResultTableProps) {
  const isBreakdown = variant === 'breakdown';

  return (
    <div
      className={`overflow-x-auto w-full ${isBreakdown ? '' : '-mx-4 px-4 sm:mx-0 sm:px-0'} ${className}`}
    >
      <table className={`w-full border-collapse text-sm sm:text-base leading-[1.5] ${!isBreakdown ? 'my-5' : ''}`}>
        {!hideHeader && (
          <thead>
            <tr>
              <th className="w-[45%] bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">
                項目
              </th>
              <th className="bg-gray-50 text-gray-700 p-3 text-right font-semibold border-b border-gray-100">
                {valueHeader}
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {items.map((item, i) => {
            if (item.isTotalRow) {
              return (
                <tr key={i} className="bg-white">
                  <td className="py-3" />
                  <td className="py-3 text-right pr-4">
                    <span className="font-bold text-gray-800 text-base">
                      = 手取り
                      <span className="ml-3 text-[#0a57d1] text-xl">
                        {item.value}
                      </span>
                    </span>
                  </td>
                </tr>
              );
            }
            return (
              <tr
                key={i}
                className={
                  item.highlight
                    ? 'bg-amber-100'
                    : isBreakdown
                      ? 'border-b bg-white'
                      : 'even:bg-gray-50'
                }
              >
                <td
                  className={`${isBreakdown ? `py-3 ${item.labelPrefix ? 'pl-6 text-sm' : 'font-semibold'}` : 'p-3 border-b border-gray-100'} ${
                    item.highlight ? 'font-bold' : ''
                  }`}
                >
                  {item.labelPrefix && (
                    <span className="mr-2">{item.labelPrefix}</span>
                  )}
                  {item.label}
                </td>
                <td
                  className={`tabular-nums text-right font-medium text-gray-900 ${
                    isBreakdown
                      ? 'py-3 text-[#333333] pr-4'
                      : 'p-3 border-b border-gray-100'
                  } ${item.highlight ? 'font-bold' : ''}`}
                >
                  {item.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
