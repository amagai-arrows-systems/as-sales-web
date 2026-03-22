// import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn } from '@storybook/test';
import { EngineerTable } from './EngineerTable';
import { EngineerInfo } from '../types/engineer';

// Using a subset of dummy data directly in the story file for simplicity
const dummyData: EngineerInfo[] = [
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
  },
  {
    "id": 1311,
    "status_label": "就業中",
    "contract_status": "延長見込",
    "name": "田中 美咲",
    "start_date": "2025/07/01",
    "end_date": "2026/01/31",
    "station": "横浜",
    "unit_price": 550000,
    "working_hours": "140-180",
    "sales_rep": "ダミー営業担当B",
    "note": "時短勤務中",
    "department": "S",
    "client": "株式会社エンジニアリング",
    "site": "二子玉川ラボ",
    "budget_progress": 59
  }
];

const meta: Meta<typeof EngineerTable> = {
  title: 'Components/EngineerTable',
  component: EngineerTable,
  tags: ['autodocs'],
  argTypes: {
    onRowClick: { action: 'rowClicked' },
  },
};

export default meta;
type Story = StoryObj<typeof EngineerTable>;

export const Default: Story = {
  // args: {
  //   data: dummyData,
  //   isLoading: false,
  // },
  args: {
    data: dummyData,
    isLoading: false,
    // ✅ Spy（モック関数）に差し替える
    onRowClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const firstRow = await canvas.findByText('佐藤 太郎');
    
    await userEvent.click(firstRow);
    
    // await expect(args.onRowClick).toHaveBeenCalledWith(dummyData[0]);
    // ✅ 完全一致が難しい場合は objectContaining を使うと堅牢
    await expect(args.onRowClick).toHaveBeenCalledWith(expect.objectContaining(dummyData[0]));
  },
};

export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};
