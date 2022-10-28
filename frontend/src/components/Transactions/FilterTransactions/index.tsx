import { useCallback } from 'react';
import { Input } from '../../Input';
import style from './FilterTransaction.module.css';

interface FilterTransactionsProps {
  filterString: string;
  setFilter: (newFilter: string) => void;
}

export function FilterTransactions({ filterString, setFilter }: FilterTransactionsProps) {
  const onFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value);
    },
    [setFilter],
  );
  return (
    <div className={style.wrapper}>
      <label className={style.label} htmlFor="filterBeneficiary">
        Filter:
      </label>
      <Input
        name="filterBeneficiary"
        placeholder="Beneficiary"
        value={filterString}
        onChange={onFilterChange}
        className={style.input}
      />
    </div>
  );
}
