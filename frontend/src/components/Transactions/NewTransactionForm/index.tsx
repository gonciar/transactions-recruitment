import React, { useCallback, useState } from 'react';
import {
  submitForm,
  validateTransactionData,
  TransactionDataValidationError,
} from '../requests/submitForm';
import { FormField } from './FormField';
import styles from './NewTransactionForm.module.css';
import { Result } from './Result';

const initialValues = {
  amount: '0',
  account: '',
  address: '',
  description: '',
  beneficiary: '',
};

interface NewTransactionFormProps {
  refetchTransactions: () => void;
}

export function NewTransactionForm({ refetchTransactions }: NewTransactionFormProps) {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState<TransactionDataValidationError>({});
  const [creationResult, setResult] = useState<'SUCCESS' | 'ERROR' | null>(null);

  const setInput = useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
      setInputs((state) => ({ ...state, [name]: value })),
    [setInputs],
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    const validationErrors = validateTransactionData(inputs);
    setErrors(validationErrors);
    if (Object.values(validationErrors).length > 0) {
      return;
    }
    const result = await submitForm(inputs);
    if (result.status === 'loaded') {
      setInputs(initialValues);
      setResult('SUCCESS');
      refetchTransactions();
    } else if (result.status === 'error') {
      setResult('ERROR');
      console.log(`Error: ${result.error.message}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Create new transfer</h2>
      <form onSubmit={onSubmit}>
        <div className={styles.formWrapper}>
          <FormField
            name="beneficiary"
            setInput={setInput}
            label="Beneficiary Name: "
            value={inputs.beneficiary}
          />
          <FormField
            name="account"
            setInput={setInput}
            label="Target Account: "
            value={inputs.account}
            error={errors.account}
          />
          <FormField name="address" setInput={setInput} label="Address:  " value={inputs.address} />
          <FormField
            name="amount"
            setInput={setInput}
            label="Amount: "
            value={inputs.amount}
            error={errors.amount}
          />
          <FormField
            name="description"
            setInput={setInput}
            label="Description: "
            value={inputs.description}
          />
        </div>
        <div className={styles.submitWrapper}>
          <input className={styles.submitButton} type="submit" value="Submit" />
          <Result result={creationResult} />
        </div>
      </form>
    </div>
  );
}
