import type { SalaryTableData } from '@/app/lib/types/salaryData';

interface SalaryTableProps {
  /** 表のデータ */
  data: SalaryTableData;
  /** タイトルを表示するか（デフォルト: true） */
  showTitle?: boolean;
}

export default function SalaryTable({
  data,
  showTitle = true,
}: SalaryTableProps) {
  return (
    <div className="mb-6">
      {/* タイトル */}
      {showTitle && data.title && (
        <h3 className="font-['Noto_Sans_JP'] font-bold text-[14px] text-black mb-3 mt-6 relative pb-1">
          {data.title}
          <div className="absolute bottom-0 left-0 w-[75px] h-[1px] bg-[var(--color-v2-primary)]" />
        </h3>
      )}

      {/* 表組 */}
      <div className="table-scroll-x -mx-[10px] px-[10px]">
        <div className="bg-white border border-[var(--color-v2-border)] rounded overflow-hidden min-w-[600px]">
          {/* ヘッダー */}
          <div className="grid grid-cols-4 bg-[var(--color-v2-primary)] text-white text-xs font-medium items-center">
            <div className="py-[5px] px-2 border-r border-[var(--color-v2-border)] text-center flex items-center justify-center">
              年代
            </div>
            <div className="py-[5px] px-2 border-r border-[var(--color-v2-border)] text-center flex items-center justify-center">
              経験年数目安
            </div>
            <div className="py-[5px] px-2 border-r border-[var(--color-v2-border)] text-center flex items-center justify-center">
              平均年収目安
            </div>
            <div className="py-[5px] px-2 text-center flex items-center justify-center">
              主な役割・求められるスキル
            </div>
          </div>

          {/* データ行 */}
          {data.rows.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-4 border-t border-[var(--color-v2-border)]"
            >
              <div className="p-[5px] border-r border-[var(--color-v2-border)] text-[12px] text-[var(--color-v2-text)] leading-tight flex items-center">
                {row.ageGroup}
              </div>
              <div className="p-[5px] border-r border-[var(--color-v2-border)] text-[12px] text-[var(--color-v2-text)] leading-tight flex items-center">
                {row.experience}
              </div>
              <div className="p-[5px] border-r border-[var(--color-v2-border)] text-[12px] text-[var(--color-v2-text)] leading-tight flex items-center">
                {row.salary}
              </div>
              <div className="p-[5px] text-[12px] text-[var(--color-v2-text)] leading-tight flex items-center">
                {row.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
