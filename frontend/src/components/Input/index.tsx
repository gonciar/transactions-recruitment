import styles from './Input.module.css';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input({ className, ...props }: InputProps) {
  return <input {...props} className={`${styles.input}${className ? ' ' + className : ''}`} />;
}
