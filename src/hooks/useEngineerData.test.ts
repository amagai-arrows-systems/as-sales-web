import { renderHook, waitFor } from '@testing-library/react';
import { useEngineerData } from './useEngineerData';

// fetch のモック
global.fetch = jest.fn();

describe('useEngineerData', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('初期状態は loading が true であること', async () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: async () => [],
      }), 100))
    );

    const { result } = renderHook(() => useEngineerData());
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it('データの取得に成功した場合、data がセットされ loading が false になること', async () => {
    const mockData = [
      { id: 1301, name: '佐藤 太郎', status_label: '就業中' }
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useEngineerData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('データの取得に失敗した場合、error がセットされ loading が false になること', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useEngineerData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('データの取得に失敗しました');
    expect(result.current.data).toEqual([]);
  });
});
