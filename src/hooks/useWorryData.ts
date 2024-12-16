import { useState, useEffect } from 'react';

export interface WorryData {
  id: string;
  content: string;
  timestamp: number;
  userId: string;
}

export interface UseWorryManager {
  worries: WorryData[];
  loading: boolean;
  error: Error | null;
  saveWorry: (worry: Omit<WorryData, 'id'>) => Promise<void>;
  deleteWorry: (id: string) => Promise<void>;
}

export const useWorryData = (): UseWorryManager => {
  const [worries, setWorries] = useState<WorryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const saveWorry = async (worry: Omit<WorryData, 'id'>) => {
    try {
      const newWorry: WorryData = {
        ...worry,
        id: Date.now().toString(), // 임시 ID 생성
      };
      setWorries(prev => [...prev, newWorry]);
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteWorry = async (id: string) => {
    try {
      setWorries(prev => prev.filter(worry => worry.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    const fetchWorries = async () => {
      try {
        setLoading(true);
        // 여기에 실제 데이터 fetching 로직 구현
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchWorries();
  }, []);

  return {
    worries,
    loading,
    error,
    saveWorry,
    deleteWorry,
  };
};
