"'use client';"

import React from "react";

import { FieldType } from "@/types";
import styles from "../styles.module.css";

export default function InputField({
  field,
  error,
  defaultValue,
}: {
  field: FieldType;
  error?: string;
  defaultValue?: string
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
        defaultValue={defaultValue}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
