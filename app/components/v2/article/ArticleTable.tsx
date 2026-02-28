'use client';

interface ArticleTableProps {
  /** テーブルのヘッダー行（配列） */
  headers: string[];
  /** テーブルのデータ行（2次元配列） */
  data: string[][];
  /** ヘッダーセルの配置（デフォルト: center） */
  headerAlign?: 'left' | 'center' | 'right';
  /** データセルの配置（デフォルト: center） */
  dataAlign?: 'left' | 'center' | 'right';
  /** 追加のクラス名 */
  className?: string;
  /** 余白なし（デフォルト: false） */
  noMargin?: boolean;
  /** コンテンツ幅750pxレイアウト（TOP仕様） */
  contentLayout?: boolean;
}

export default function ArticleTable({
  headers,
  data,
  headerAlign = 'center',
  dataAlign = 'center',
  className = '',
  noMargin = false,
  contentLayout = false,
}: ArticleTableProps) {
  const fullBleedClass = contentLayout ? '-mx-4 px-4' : '-mx-[10px] px-[10px]';
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const headerAlignClass = alignClasses[headerAlign];
  const dataAlignClass = alignClasses[dataAlign];

  return (
    <div
      className={`table-scroll-x ${fullBleedClass} ${noMargin ? 'mb-0' : 'mb-6'} ${className}`}
    >
      <table className="min-w-[600px] w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-[var(--color-v2-primary)] text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className={`border border-gray-300 px-4 py-2 ${headerAlignClass}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border border-gray-300 px-4 py-2 ${dataAlignClass}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
