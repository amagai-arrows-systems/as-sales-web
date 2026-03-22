import { EngineerInfo } from '../types/engineer';
import { EngineerTableRow } from './EngineerTableRow';

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: keyof EngineerInfo | null;
  direction: SortDirection;
}

interface Props {
  data: EngineerInfo[];
  onRowClick?: (engineer: EngineerInfo) => void;
  isLoading?: boolean;
  sortConfig?: SortConfig;
  onSort?: (key: keyof EngineerInfo) => void;
}

const SortableHeader = ({
  title,
  sortKey,
  sortConfig,
  onSort,
}: {
  title: string;
  sortKey: keyof EngineerInfo;
  sortConfig?: SortConfig;
  onSort?: (key: keyof EngineerInfo) => void;
}) => {
  const isSorted = sortConfig?.key === sortKey;
  const directionIcon =
    sortConfig?.direction === 'ascending' ? '▲' : '▼';

  return (
    <th
      className="p-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b cursor-pointer"
      onClick={() => onSort && onSort(sortKey)}
    >
      {title}
      {isSorted && <span className="ml-1">{directionIcon}</span>}
    </th>
  );
};


const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3 sticky left-0 bg-gray-50 z-10 border-r"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
    <td className="p-3"><div className="h-4 bg-gray-200 rounded"></div></td>
  </tr>
);

export const EngineerTable = ({ data, onRowClick, isLoading = false, sortConfig, onSort }: Props) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full table-auto border-collapse bg-white">
        <thead className="bg-gray-100">
          <tr>
            <SortableHeader title="No" sortKey="id" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="就業状況" sortKey="status_label" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="ステータス" sortKey="contract_status" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="部" sortKey="department" sortConfig={sortConfig} onSort={onSort} />
            <th className="p-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b sticky left-0 bg-gray-100 z-20 border-r border-gray-200">
              氏名
            </th>
            <SortableHeader title="開始/終了" sortKey="start_date" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="契約先/常駐先" sortKey="client" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="最寄駅" sortKey="station" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="単価/予算" sortKey="unit_price" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="基準時間" sortKey="working_hours" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="担当" sortKey="sales_rep" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader title="備考" sortKey="note" sortConfig={sortConfig} onSort={onSort} />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
          ) : data.length > 0 ? (
            data.map((engineer) => (
              <EngineerTableRow
                key={engineer.id}
                engineer={engineer}
                onRowClick={onRowClick}
              />
            ))
          ) : (
            <tr>
              <td colSpan={13} className="text-center p-4 text-gray-500">
                表示するデータがありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
