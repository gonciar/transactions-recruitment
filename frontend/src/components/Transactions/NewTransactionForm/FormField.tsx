import { Input } from '../../Input';
import styles from './NewTransactionForm.module.css';

interface FormFieldProps {
  setInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  label: string;
  error?: string;
}

export function FormField({ label, name, value, setInput, error }: FormFieldProps) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name}>{label}</label>
      <Input onChange={setInput} value={value} name={name} autoComplete="false" />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
