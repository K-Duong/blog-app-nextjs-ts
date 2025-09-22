"use client";

import { FieldType } from "@/types";
import styles from "./styles.module.css";

interface SelectedItem {
  label: string;
  name: string;
  value: string;
}

export default function SelectField({
  items,
  field,
  defaultValue,
  handleChange,
}: {
  items: SelectedItem[];
  defaultValue: string;
  field: FieldType;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className={styles.selectField}>
      <label htmlFor={field.name}>{field.label}: </label>
      <select
        defaultValue={defaultValue}
        name={field.name}
        id={field.name}
        onChange={handleChange}
      >
        {items.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
