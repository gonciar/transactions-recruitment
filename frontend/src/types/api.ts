export interface Transaction {
  id: number;
  amount: number;
  beneficiary: string;
  account: string;
  address: string;
  date: Date;
  description: string;
}

interface RequestInit {
  status: 'init';
}
interface RequestLoading {
  status: 'loading';
}
interface RequestLoaded<T> {
  status: 'loaded';
  payload: T;
}
interface RequestError {
  status: 'error';
  error: Error;
}

export type RequestResult<T> = RequestInit | RequestLoading | RequestLoaded<T> | RequestError;
