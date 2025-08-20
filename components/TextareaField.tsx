import { FieldType } from "@/constants/types";
import styles from "./inputField.module.css";

export function TextareaField({
  field,
  error,
}: {
  field: FieldType;
  error: string;
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
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
