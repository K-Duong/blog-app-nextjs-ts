"use client";
import { useActionState } from "react";

import { FormState, FieldType } from "./Form";
import InputField from "./InputField";

import styles from "./postBlog.module.css";

export default function PostBlog({
  action,
  fields,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  fields: Record<string, FieldType>;
}) {
  const [state, formAction] = useActionState(action, {
    loading: false,
    errors: null,
    success: false,
  });

  console.log("PostBlog state:", state);

  return (
    <form action={formAction} className={styles.form}>
      {Object.keys(fields).map((field) => (
        <InputField
          error={
            state.errors &&
            Object.keys(state.errors).length > 0 && 
            state.errors[field]?.length > 0 ?
            state.errors[field] : ""
          }
          key={fields[field].id}
          field={fields[field]}
        />
      ))}
      <div className={styles.cta}>
        <button type="reset">Reset</button>
        <button type="submit">Create Post</button>
      </div>
    </form>
  );
}
