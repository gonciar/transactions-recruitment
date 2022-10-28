import styles from './Button.module.css';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  selected?: boolean;
}

export function Button({ children, selected, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button}${selected ? ' ' + styles.selected : ''}${
        className ? ' ' + className : ''
      }`}
    >
      {children}
    </button>
  );
}
