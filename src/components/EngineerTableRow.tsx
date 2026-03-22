import { EngineerInfo } from '../types/engineer';

interface Props {
  engineer: EngineerInfo;
  onRowClick?: (engineer: EngineerInfo) => void;
}

export const EngineerTableRow = ({ engineer, onRowClick }: Props) => {
  // ステータスに応じたスタイル
  const getStatusStyles = (status: EngineerInfo['contract_status']) => {
    switch (status) {
      case '終了確定':
        return 'bg-blue-100 text-blue-800';
      case '延長見込':
        return 'bg-cyan-100 text-cyan-800';
      case '就業確定':
        return 'bg-cyan-200 text-cyan-900';
      case '延長確定':
        return 'bg-blue-200 text-blue-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 最寄駅に応じたスタイル
  const getStationStyles = (station: string) => {
    if (station.includes('横浜')) return 'text-pink-600 font-medium';
    if (station.includes('日比谷')) return 'text-red-600 font-medium';
    return 'text-gray-700';
  };

  return (
    <tr
      className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
      onClick={() => onRowClick && onRowClick(engineer)}
    >
      <td className="p-3 text-center text-sm text-gray-500">{engineer.id}</td>
      <td className="p-3 text-center">
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
          {engineer.status_label}
        </span>
      </td>
      <td className="p-3 text-center">
        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusStyles(engineer.contract_status)}`}>
          {engineer.contract_status}
        </span>
      </td>
      <td className="p-3 text-center text-sm font-bold text-gray-700">{engineer.department}</td>
      {/* 氏名列: Sticky Column */}
      <td className="p-3 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
        {engineer.name}
      </td>
      <td className="p-3 text-xs text-gray-600">
        {engineer.start_date}<br />
        <span className="text-gray-400">〜</span><br />
        {engineer.end_date}
      </td>
      <td className="p-3 text-xs">
        <div className="font-medium text-gray-800">{engineer.client}</div>
        <div className="text-gray-500">{engineer.site}</div>
      </td>
      <td className={`p-3 text-sm ${getStationStyles(engineer.station)}`}>
        {engineer.station}
      </td>
      <td className="p-3 text-sm text-right">
        <div className="font-mono">
          {typeof engineer.unit_price === 'number' 
            ? engineer.unit_price.toLocaleString() 
            : engineer.unit_price}
        </div>
        <div className="text-[10px] text-gray-400">予算消化: {engineer.budget_progress}%</div>
      </td>
      <td className="p-3 text-sm text-gray-600">{engineer.working_hours}</td>
      <td className="p-3 text-sm text-gray-600">{engineer.sales_rep}</td>
      <td className="p-3 text-xs text-gray-500 max-w-xs truncate" title={engineer.note}>
        {engineer.note}
      </td>
    </tr>
  );
};
