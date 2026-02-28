export interface SalaryTableRow {
  /** 年代 */
  ageGroup: string;
  /** 経験年数目安 */
  experience: string;
  /** 平均年収目安 */
  salary: string;
  /** 主な役割・求められるスキル */
  role: string;
}

export interface SalaryTableData {
  /** 表のタイトル */
  title?: string;
  /** テーブルのデータ */
  rows: SalaryTableRow[];
}
