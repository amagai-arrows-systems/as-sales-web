
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EngineerTable } from './EngineerTable';
import { EngineerInfo } from '../types/engineer';

const mockData: EngineerInfo[] = [
  {
    "id": 1301,
    "status_label": "就業中",
    "contract_status": "終了確定",
    "name": "佐藤 太郎",
    "start_date": "2025/10/01",
    "end_date": "2026/03/31",
    "station": "日比谷",
    "unit_price": 600000,
    "working_hours": "140-180",
    "sales_rep": "ダミー営業担当A",
    "note": "",
    "department": "A",
    "client": "デモシステムズ",
    "site": "渋谷サテライト",
    "budget_progress": 19
  },
  {
    "id": 1310,
    "status_label": "就業中",
    "contract_status": "延長確定",
    "name": "林 裕太",
    "start_date": "2025/11/01",
    "end_date": "2026/04/30",
    "station": "二子玉川",
    "unit_price": "6700円/h",
    "working_hours": "時給",
    "sales_rep": "ダミー営業担当O",
    "note": "2026/4より単価アップ",
    "department": "B",
    "client": "デモシステムズ",
    "site": "品川オフィス",
    "budget_progress": 83
  }
];

describe('EngineerTable', () => {
  it('renders the table with data', () => {
    render(<EngineerTable data={mockData} />);
    
    // Check if names are present
    expect(screen.getByText('佐藤 太郎')).toBeInTheDocument();
    expect(screen.getByText('林 裕太')).toBeInTheDocument();

    // Check number of data rows (add 1 for the header row)
    expect(screen.getAllByRole('row')).toHaveLength(mockData.length + 1);
  });

  it('calls onRowClick when a row is clicked', () => {
    const mockOnRowClick = jest.fn();
    render(<EngineerTable data={mockData} onRowClick={mockOnRowClick} />);

    // Click on the row containing "佐藤 太郎"
    fireEvent.click(screen.getByText('佐藤 太郎'));

    // Check if the mock function was called
    expect(mockOnRowClick).toHaveBeenCalledTimes(1);
    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('renders the empty message when no data is provided', () => {
    render(<EngineerTable data={[]} />);

    expect(screen.getByText('表示するデータがありません。')).toBeInTheDocument();
  });

  it('renders the loading skeleton when isLoading is true', () => {
    render(<EngineerTable data={[]} isLoading={true} />);

    // Check for the presence of skeleton rows (we render 10)
    // The role of a skeleton row might not be 'row'. A more robust way is to check for a test-id or a class.
    // Here, we check based on the animation class as a proxy.
    const rows = screen.getAllByRole('row');
    // The first row is the header, the rest should be skeletons
    expect(rows.length).toBe(1 + 10);
    expect(rows[1].className).toContain('animate-pulse');
  });
});
