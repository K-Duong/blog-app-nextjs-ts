"use client";

import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { FIELDS } from "@/constants";
import { BlogType } from "@/types";
import { handleCreateBlog, handleUpdateBlog } from "@/actions/blogs";

import { InputField, ImageField, TextareaField } from "../formFields";
import Button from "../../buttons/ButtonWrapper";

import styles from "./styles.module.css";

export default function FormNewBlog({ blog }: { blog?: BlogType }) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [defaultValues, setDefaultValues] = useState<FormData>(() => {
    const formData = new FormData();
    formData.set("title", blog?.title || "");
    formData.set("content", blog?.content || "");
    formData.set("image", blog?.imageUrl || "");
    return formData;
  });
  useEffect(() => {
    if (blog && Object.keys(blog).length > 0) {
      console.log("set default values for update blog form");
      const formData = new FormData();
      formData.set("title", blog.title);
      formData.set("content", blog.content);
      formData.set("image", blog.imageUrl);
      setDefaultValues(formData);
      setPreviewUrl(blog.imageUrl);
    }
  }, [blog]);

  const [state, formAction] = useActionState(
    blog && blog.id > 0
      ? handleUpdateBlog.bind(null, blog?.id)
      : handleCreateBlog,
    {
      loading: false,
      errors: null,
      success: false,
      payload: defaultValues,
    }
  );

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
          console.log(state);
          return (
            <ImageField
              defaultValue={(state.payload?.get(`image`) as string) || ""}
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
        <Button type="submit">
          {blog && blog.id > 0 ? "Update blog" : "Create new post"}
        </Button>
        {blog && blog.id > 0 ? (
          <Button type="button" onClick={() => redirect(`/blogs`)}>
            {" "}
            Cancel{" "}
          </Button>
        ) : (
          <Button type="reset">Reset</Button>
        )}
      </div>
    </form>
  );
}
