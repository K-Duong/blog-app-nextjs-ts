// 'use client'

import { FieldType } from "@/constants/types";
// import Button from "./Button";
import InputField from "./InputField";

import styles from "./formContainer.module.css";

export default function FormContainer({
  fields,
  header,
  handleSubmit,
  errorMessage,
  children,
}: {
  fields: Record<string, FieldType>;
  header: string,
  handleSubmit: React.FormEventHandler<HTMLFormElement>, 
  errorMessage: string,
  children: React.ReactNode
}) {
  return (
    <main className={styles.main}>
      <h1>{header}</h1>
      {errorMessage.length > 0 && <p className={styles.error}>{errorMessage}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        {Object.keys(fields).map((field) => {
          const fieldValue = fields[field];
          return <InputField key={field} field={fieldValue} />;
        })}
        {children}
      </form>
    </main>
  );
}
