import { useCallback, useEffect, useState } from 'react';
import { RequestResult } from '../../types/api';
import { fetchTS } from '../../utils/fetchTS';

interface UseQueryProps {
  url: string;
}

export function useQuery<T>({ url }: UseQueryProps) {
  const [data, setData] = useState<RequestResult<T>>({ status: 'init' });

  const fetchData = useCallback(async () => {
    setData({ status: 'loading' });
    try {
      const data = await fetchTS<T>(url);
      setData({ status: 'loaded', payload: data });
    } catch (error) {
      if (error instanceof Response) {
        const err = new Error(`Unknown server error occurred: ${error.statusText}`);
        setData({ status: 'error', error: err });
      } else {
        const err = new Error('Something went wrong');
        setData({ status: 'error', error: err });
      }
    }
  }, [url, setData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, forceRefetch: fetchData };
}
