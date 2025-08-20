"use client";

import { useActionState, useState } from "react";

import { FIELDS } from "@/constants";
import { handleCreateBlog } from "@/actions/blogs";

import InputField from "./InputField";
import Button from "./Button";

import styles from "./form.module.css";
import { redirect } from "next/navigation";
import ImageField from "./ImageField";
import { TextareaField } from "./TextareaField";

export default function FormNewBlog() {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [state, formAction] = useActionState(handleCreateBlog, {
    loading: false,
    errors: null,
    success: false,
  });

  if (state.loading) {
    return <h1> Submitting...</h1>;
  } else if (state.success) {
    redirect("/blogs");
  }

  return (
    <form
      action={formAction}
      className={styles.form}
      onReset={() => setPreviewUrl("")}
    >
      {Object.keys(FIELDS).map((field) => {
        const fieldValue = FIELDS[field];
        if (field === "image") {
          return (
            <ImageField
              key={field}
              field={fieldValue}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          );
        } else if (field === "content") {
          return (
            <TextareaField
              key={field}
              field={fieldValue}
              error={
                state.errors &&
                Object.keys(state.errors).length > 0 &&
                state.errors[field]?.length > 0
                  ? state.errors[field]
                  : ""
              }
            />
          );
        } else if ((field = "title")) {
          return (
            <InputField
              error={
                state.errors &&
                Object.keys(state.errors).length > 0 &&
                state.errors[field]?.length > 0
                  ? state.errors[field]
                  : ""
              }
              key={field}
              field={fieldValue}
            />
          );
        }
      })}
      <div className={styles.cta}>
        <Button type="reset">Reset</Button>
        <Button type="submit">Create new post</Button>
      </div>
    </form>
  );
}
