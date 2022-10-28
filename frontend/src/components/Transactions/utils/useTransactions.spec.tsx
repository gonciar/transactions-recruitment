import { renderHook } from '@testing-library/react';
import { RequestResult, Transaction } from '../../../types/api';
import { filterTransactions, useTransactionsFilter } from './useTransactions';

describe('filterTransactions', () => {
  let martinTransaction: Transaction;

  beforeEach(() => {
    martinTransaction = {
      id: 0,
      account: '',
      beneficiary: 'martin',
      address: '',
      amount: 0,
      date: new Date(),
      description: '',
    };
  });

  it('filter transaction does not crash on empty input', () => {
    const transactions: Transaction[] = [];
    const filterString = '';
    expect(filterTransactions(transactions, filterString)).toEqual([]);
  });

  it('filter transaction does not crash on empty string', () => {
    martinTransaction.beneficiary = '';
    const filterString = '';
    expect(filterTransactions([martinTransaction], filterString)).toEqual([]);
  });

  it('filter matches full words', () => {
    const filterString = 'teresa';

    const teresaTransaction: Transaction = { ...martinTransaction, beneficiary: filterString };
    const transactions: Transaction[] = [teresaTransaction, martinTransaction];

    expect(filterTransactions(transactions, filterString)).toEqual([teresaTransaction]);
  });

  it('filter matches parts of words', () => {
    const filterString = 'er';

    const transactions: Transaction[] = [
      martinTransaction,
      { ...martinTransaction, beneficiary: `${filterString}yk` },
      { ...martinTransaction, beneficiary: `t${filterString}esa` },
      { ...martinTransaction, beneficiary: `${filterString}${filterString}${filterString}` },
    ];

    expect(filterTransactions(transactions, filterString)).toHaveLength(3);
  });

  it('filter is case insensitive', () => {
    const filterString = 'er';

    let transactions: Transaction[] = [
      martinTransaction,
      { ...martinTransaction, beneficiary: `${filterString}yk`.toUpperCase() },
      { ...martinTransaction, beneficiary: `t${filterString}esa`.toUpperCase() },
    ];

    expect(filterTransactions(transactions, filterString)).toHaveLength(2);

    transactions = [
      martinTransaction,
      { ...martinTransaction, beneficiary: `${filterString}yk` },
      { ...martinTransaction, beneficiary: `t${filterString}esa` },
    ];

    expect(filterTransactions(transactions, filterString.toUpperCase())).toHaveLength(2);
  });
});

describe('filter transaction', () => {
  let container: Element | null = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    if (container === null) return;
    container.remove();
    container = null;
  });

  it('returns empty array for failed', () => {
    const res: RequestResult<Transaction[]> = { status: 'error', error: new Error() };
    const { result } = renderHook(() => useTransactionsFilter(res));
    expect(result.current.filteredTransactions.length).toBe(0);
  });

  it('returns empty array for loading', () => {
    const res: RequestResult<Transaction[]> = { status: 'loading' };
    const { result } = renderHook(() => useTransactionsFilter(res));
    expect(result.current.filteredTransactions.length).toBe(0);
  });

  it('returns array for loaded', () => {
    const martinTransaction: Transaction = {
      id: 0,
      account: '',
      beneficiary: 'martin',
      address: '',
      amount: 0,
      date: new Date(),
      description: '',
    };

    const filterString = 'er';

    const transactions: Transaction[] = [
      martinTransaction,
      { ...martinTransaction, beneficiary: `${filterString}yk` },
      { ...martinTransaction, beneficiary: `t${filterString}esa` },
    ];

    const res: RequestResult<Transaction[]> = { status: 'loaded', payload: transactions };

    const { result } = renderHook(() => useTransactionsFilter(res));
    expect(result.current.filteredTransactions.length).toBe(3);
  });
});
