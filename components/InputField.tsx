"'use client';"

import React from "react";

import { FieldType } from "@/constants/types";
import styles from "./inputField.module.css";
// import ImageField from "./ImageField";

export default function InputField({
  field,
  error,
}: {
  field: FieldType;
  error?: string;
}) {
 
 
  return (
    <div key={field.id} className={styles.input}>
      <label htmlFor={field.name}>{field.label}</label>
      <input
        className={ error &&
          error.length > 0 ? `${styles.input} ${styles.error}` : undefined
        }
        type={field.type}
        id={field.id}
        name={field.name}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
