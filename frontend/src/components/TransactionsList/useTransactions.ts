import { useQuery } from '../../hooks/server-communication';
import { Transaction } from '../../types/api';

const API_URL = 'http://localhost:3000';

export function useTransactions() {
  const transactions = useQuery<Transaction[]>({ url: `${API_URL}/transactions` });
  return transactions;
}
