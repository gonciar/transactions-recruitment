import { useQuery } from '../../hooks/server-communication';
import { Transaction } from '../../types/api';
import { API_URL } from '../../utils/constants';
import { Balance } from './Balance';
import { FilterTransactions } from './FilterTransactions';
import { NewTransactionForm } from './NewTransactionForm';
import { TransactionsList } from './TransactionsList';
import { useTransactionsFilter } from './utils/useTransactions';
import { usePagination } from './utils/usePagination';
import { Pagination } from './Pagination';
import style from './Transactions.module.css';

export function Transactions() {
  const { data, forceRefetch } = useQuery<Transaction[]>({
    url: `${API_URL}/transactions`,
  });
  const { filteredTransactions, filterString, setFilter } = useTransactionsFilter(data);
  const { page, pagesCount, setPage, data: paginatedTransactions } = usePagination<Transaction>(
    filteredTransactions,
  );
  return (
    <>
      <div className={style.transactionsHeaderWrapper}>
        <div className={style.transactionHeaderBalanceFilter}>
          <Balance transactions={paginatedTransactions} />
          <FilterTransactions filterString={filterString} setFilter={setFilter} />
        </div>
        <NewTransactionForm refetchTransactions={forceRefetch} />
      </div>
      <TransactionsList transactions={paginatedTransactions} refetchTransactions={forceRefetch} />
      <Pagination page={page} pagesCount={pagesCount} setPage={setPage} />
    </>
  );
}
