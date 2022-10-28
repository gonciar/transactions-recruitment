import React, { useMemo, useState } from 'react';
import { RequestResult, Transaction } from '../../../types/api';

export function filterTransactions(transactions: Transaction[], filterString: string) {
  return transactions.filter(
    (transaction) =>
      transaction.beneficiary &&
      transaction.beneficiary.toLowerCase().includes(filterString.toLowerCase()),
  );
}

export function useTransactionsFilter(
  transactions: RequestResult<Transaction[]>,
): {
  filterString: string;
  filteredTransactions: Transaction[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
} {
  const [filterString, setFilter] = useState('');

  const filteredTransactionsList = useMemo(() => {
    const transactionsList: Transaction[] =
      transactions.status === 'loaded' ? transactions.payload : [];
    if (filterString === '') {
      return transactionsList;
    }
    return filterTransactions(transactionsList, filterString);
  }, [transactions, filterString]);

  return { filteredTransactions: filteredTransactionsList, setFilter, filterString };
}
