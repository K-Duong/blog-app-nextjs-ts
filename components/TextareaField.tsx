import { FieldType } from "@/constants/types";
import styles from "./inputField.module.css";

export default function TextareaField({
  field,
  error,
  defaultValue,
}: {
  field: FieldType;
  error: string;
  defaultValue: string,
}) {
  return (
    <div key={field.id} className={styles.input}>
      <label htmlFor={field.name}>{field.label}</label>
      <textarea
        className={
          error.length > 0 ? `${styles.input} ${styles.error}` : undefined
        }
        id={field.id}
        name={field.name}
        defaultValue={defaultValue}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
