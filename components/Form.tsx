"use client";

import { redirect } from "next/navigation";
import { useActionState, useState } from "react";

import { FIELDS } from "@/constants";
import { handleCreateBlog } from "@/actions/blogs";

import InputField from "./InputField";
import Button from "./Button";
import ImageField from "./ImageField";
import TextareaField  from "./TextareaField";

import styles from "./form.module.css";

export default function FormNewBlog() {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [state, formAction] = useActionState(handleCreateBlog, {
    loading: false,
    errors: null,
    success: false,
    payload: null,
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
              error={
                state.errors &&
                Object.keys(state.errors).length > 0 &&
                state.errors[field]?.length > 0
                  ? state.errors[field]
                  : ""
              }
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          );
        } else if (field === "content") {
          return (
            <TextareaField
              defaultValue={(state.payload?.get(`${field}`) as string) || ""}
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
              defaultValue={(state.payload?.get(`${field}`) as string) || ""}
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
