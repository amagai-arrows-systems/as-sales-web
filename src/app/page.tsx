'use client';

import { useMemo, useState } from 'react';
import { useEngineerData } from '../hooks/useEngineerData';
import { EngineerTable } from '../components/EngineerTable';
import type { EngineerInfo } from '../types/engineer';

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: keyof EngineerInfo | null;
  direction: SortDirection;
}


export default function Home() {
  const { data, loading, error } = useEngineerData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'ascending' });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(engineer =>
      engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.site.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const handleSort = (key: keyof EngineerInfo) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
        <h2 className="font-bold mb-1">エラーが発生しました</h2>
        <p>{error.message}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">就業状況管理一覧</h1>
          <p className="text-sm text-gray-500 mt-1">
            所属エンジニアの稼働状況および契約条件を管理します。
          </p>
        </header>

        <div className="mb-4">
          <input
            type="text"
            placeholder="氏名、契約先、常駐先で検索..."
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <EngineerTable 
            data={sortedData} 
            isLoading={loading}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </section>

        <footer className="mt-6 text-sm text-gray-400 text-center">
          &copy; 2026 就業状況管理システム
        </footer>
      </div>
    </main>
  );
}
