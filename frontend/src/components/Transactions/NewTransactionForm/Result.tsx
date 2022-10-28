import styles from './NewTransactionForm.module.css';

interface ResultProps {
  result: 'SUCCESS' | 'ERROR' | null;
}

export function Result({ result }: ResultProps) {
  if (result === null) return null;
  if (result === 'ERROR') return <span className={styles.resultError}>ERROR</span>;
  return <span className={styles.resultSuccess}>SUCCESS</span>;
}
