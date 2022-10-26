import { useTransactions } from './useTransactions';

export const TransactionsList = () => {
  const transactions = useTransactions();
  switch (transactions.status) {
    case 'loading':
      return <div>loading</div>;
    case 'loaded':
      return (
        <>
          {transactions.payload.map((transaction) => (
            <ul key={transaction.id}>
              <li>{transaction.id}</li>
              <li>{transaction.account}</li>
              <li>{transaction.amount}</li>
              <li>{transaction.beneficiary}</li>
              <li>{transaction.address}</li>
            </ul>
          ))}
        </>
      );
  }
  return <div />;
};
