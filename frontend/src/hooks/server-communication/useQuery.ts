import { useEffect, useState } from 'react';
import { RequestResult } from '../../types/api';
import { fetchTS } from '../../utils/fetchTS';

interface UseQueryProps {
  url: string;
}

export function useQuery<T>({ url }: UseQueryProps) {
  const [data, setData] = useState<RequestResult<T>>({ status: 'init' });

  async function fetchData(url: string) {
    setData({ status: 'loading' });
    try {
      const data = await fetchTS<T>(url);
      console.log(data);
      setData({ status: 'loaded', payload: data });
    } catch (error) {
      if (error instanceof Response) {
        const err = new Error(`Unknown server error occurred: ${error.statusText}`);
        setData({ status: 'error', error: err });
      }

      const err = new Error(`Something went wrong`);
      setData({ status: 'error', error: err });
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return data;
}
