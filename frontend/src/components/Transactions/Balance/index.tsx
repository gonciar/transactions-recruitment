import { Transaction } from '../../../types/api';
import style from './Balance.module.css';

interface BalanceProps {
  transactions: Transaction[];
}

function sumTransactions(transactions: Transaction[]) {
  // displaying 0 as balance when there are no transactions might be misleading
  if (transactions.length < 1) return '-';
  // JS should not be trusted when adding floating point numbers,
  // for production use libraries such as currency.js or similar can be used
  const sum = transactions.reduce((acc, curr) => {
    const { amount } = curr;
    if (typeof amount === 'string') {
      return acc + parseFloat(amount);
    }
    return acc + amount;
  }, 0.0);
  return Math.round(sum * 100) / 100;
}

export function Balance({ transactions }: BalanceProps) {
  // Since not specified otherwise balance is shown as a sum of visible transactions.
  // idea taken from my banks interface. The total account balance should definitely be
  // calculated on the backend side, for multiple reasons.

  const balance = sumTransactions(transactions);
  return (
    <div className={style.balanceContainer}>
      <span className={style.text}>Balance:</span>
      <br />
      <span className={style.amount}>{balance} $</span>
    </div>
  );
}
