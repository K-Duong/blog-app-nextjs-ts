import React from 'react';
import styles from './button.module.css'
type ButtonProps= React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonPropsWithChildren = React.PropsWithChildren<ButtonProps>

export default function Button(props : ButtonPropsWithChildren) {
  return <button {...props} className={styles.button}>{props.children}</button>;
}
