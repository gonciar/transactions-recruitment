import React from 'react';
import { Transaction } from '../../../types/api';
import { removeTransaction } from '../requests/removeTransaction';
import { TransactionRow } from './TransactionRow';
import styles from './styles.module.css';

interface TransactionsListProps {
  transactions: Transaction[];
  refetchTransactions: () => void;
}

export const TransactionsList = ({ transactions, refetchTransactions }: TransactionsListProps) => {
  const onRemoveTransaction = (id: number) => async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    const result = await removeTransaction(id);
    if (result.status === 'loaded') {
      refetchTransactions();
    } else if (result.status === 'error') {
      alert(`Error: ${result.error.message}`);
    }
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Beneficiary</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            onRemoveTransaction={onRemoveTransaction(transaction.id)}
          />
        ))}
      </table>
    </div>
  );
};
