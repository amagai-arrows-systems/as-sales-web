export type ContractStatus = '終了確定' | '延長見込' | '就業確定' | '延長確定';

export interface EngineerInfo {
  id: number;
  status_label: string;      // 就業状況 (ラベル)
  contract_status: ContractStatus; // ステータス (セレクトボックス)
  department: string;        // 部 (例: "S")
  name: string;              // 氏名
  start_date: string;        // 期間(開始) (YYYY/MM/DD)
  end_date: string;          // 期間(終了) (YYYY/MM/DD)
  client: string;            // 契約先
  site: string;              // 常駐先
  station: string;           // 常駐先最寄駅
  unit_price: number | string; // 単価 (#) (月額単価 or 時給)
  budget_progress: number;   // 予算消化率 (%)
  working_hours: string;     // 基準時間 (精算幅 or "時給")
  sales_rep: string;         // 担当営業
  note: string;              // 備考
}
