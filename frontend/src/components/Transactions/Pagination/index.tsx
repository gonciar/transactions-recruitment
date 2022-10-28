import { Button } from '../../Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pagesCount: number;
  setPage: (page: number) => void;
}

export function Pagination({ pagesCount, setPage, page }: PaginationProps) {
  const buttons = Array.from({ length: pagesCount }, (_, i) => (
    <Button className={styles.button} key={i} selected={i === page} onClick={() => setPage(i)}>
      {i + 1}
    </Button>
  ));
  return <div className={styles.container}>{buttons}</div>;
}
