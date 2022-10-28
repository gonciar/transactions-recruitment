import { useState } from 'react';
import { Transaction } from '../../../types/api';
import { Button } from '../../Button';
import styles from './styles.module.css';

interface TransactionRowProps {
  transaction: Transaction;
  onRemoveTransaction: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TransactionRow({ transaction, onRemoveTransaction }: TransactionRowProps) {
  const [expanded, setExpanded] = useState(false);
  // mapping to date type should definitely be done shortly after fetch
  const date = new Date(transaction.date);
  return (
    <tbody>
      <tr
        onClick={() => setExpanded(true)}
        className={`${styles.row} ${expanded ? styles.hidden : ''}`}
      >
        <td>{date.toLocaleDateString()}</td>
        <td>{transaction.beneficiary}</td>
        <td>{transaction.amount}</td>
        <td className={styles.hideOnMobile}>
          <Button onClick={onRemoveTransaction}>Remove</Button>
        </td>
      </tr>
      <tr
        onClick={() => setExpanded(false)}
        className={`${styles.row} ${!expanded ? styles.hidden : ''}`}
      >
        <td colSpan={4}>
          <div className={styles.rowDetailsWrapper}>
            <div>
              <span className={styles.bold}>Transaction date:</span>{' '}
              <span>
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
              </span>
            </div>
            <div>
              <span className={styles.bold}>Beneficiary name: </span>{' '}
              <span>{transaction.beneficiary}</span>
            </div>
            <div>
              <span className={styles.bold}>Beneficiary account: </span>{' '}
              <span>{transaction.account}</span>
            </div>
            <div>
              <span className={styles.bold}>Address: </span> <span>{transaction.address}</span>
            </div>
            <div>
              <span className={styles.bold}>Amount: </span> <span>{transaction.amount}</span>
            </div>
            <div>
              <span className={styles.bold}>Description: </span>{' '}
              <span>{transaction.description}</span>
            </div>
          </div>
          <div className={styles.alignRight}>
            <Button onClick={onRemoveTransaction}>Remove</Button>
          </div>
        </td>
        <td></td>
      </tr>
    </tbody>
  );
}
