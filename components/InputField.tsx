import { FieldType } from "./Form";
import styles from "./inputField.module.css";

export default function InputField({
  field,
  error,
}: {
  field: FieldType;
  error: string;
}) {
  let input: React.ReactNode;
  if (field.name === "content") {
    input = (
      <textarea
        className={
          error.length > 0 ? `${styles.input} ${styles.error}` : undefined
        }
        id={field.id}
        name={field.name}
      />
    );
  } else if (field.name === "image") {
    input = (
      <input
        className={
          error.length > 0 ? `${styles.input} ${styles.error}` : undefined
        }
        type={field.type}
        accept="image/png, image/jpeg"
        id={field.id}
        name={field.name}
      />
    );
  } else {
    input = (
      <input
        className={
          error.length > 0 ? `${styles.input} ${styles.error}` : undefined
        }
        type={field.type}
        id={field.id}
        name={field.name}
      />
    );
  }
  return (
    <div key={field.id} className={styles.input}>
      <label htmlFor={field.name}>{field.label}</label>
      {input}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
