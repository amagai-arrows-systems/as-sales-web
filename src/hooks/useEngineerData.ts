import { useState, useEffect } from 'react';
import { EngineerInfo } from '../types/engineer';

export const useEngineerData = () => {
  const [data, setData] = useState<EngineerInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/dummy_sales_engineer.json');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('不明なエラーが発生しました'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
