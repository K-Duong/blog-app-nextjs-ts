'use client'

import { useActionState } from "react";

import { FIELDS } from "@/constants";
import { handleCreateBlog } from "@/actions/blogs";

import InputField from "./InputField";
import Button from "./Button";

import styles from "./form.module.css";


export default function FormNewBlog() {
    const [state, formAction] = useActionState(handleCreateBlog, {
      loading: false,
      errors: null,
      success: false,
    });

  return <form action={formAction} className={styles.form}>
      {Object.keys(FIELDS).map((field) => (
        <InputField
          error={
            state.errors &&
            Object.keys(state.errors).length > 0 && 
            state.errors[field]?.length > 0 ?
            state.errors[field] : ""
          }
          key={FIELDS[field].id}
          field={FIELDS[field]}
        />
      ))}
      <div className={styles.cta}>
        <Button type='reset'>Reset</Button>
        <Button type='submit'>Create new post</Button>
      </div>
    </form>;
}
