"use client";
import { useEffect, useState } from "react";

import { FieldType } from "@/types";
import { LIMITSIZE } from "@/constants";
import ImagePreview from "../../../imagePreview";

import styles from "../styles.module.css";

export default function ImageField({
  defaultValue,
  field,
  error,
  previewUrl,
  setPreviewUrl,
}: {
  defaultValue: string;
  field: FieldType;
  error?: string;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const isValidType =
      file?.type === "image/png" || file?.type === "image/jpeg";

    if (isValidType === false) {
      setErrorMessage("Invalid file type. Only PNG and JPEG are allowed.");
      setPreviewUrl("");
      e.target.value = "";
      return;
    } else if (file && file.size > LIMITSIZE * 1024 * 1024) {
      // 1MB limit
      setErrorMessage(`Image is too large. Max size is ${LIMITSIZE}MB`);
      setPreviewUrl("");
      e.target.value = "";
      return;
    } else {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setErrorMessage("");
    }
  };
  return (
    <>
      <input
        type={field.type}
        accept="image/png, image/jpeg"
        id={field.id}
        name={field.name}
        onChange={handleImageChange}
      />
      {defaultValue && (
        <input type="hidden" name="existingImageUrl" value={defaultValue} />
      )}
      {errorMessage.length > 0 && (
        <span className={styles.errorText}>{errorMessage}</span>
      )}
      {previewUrl && <ImagePreview imageUrl={previewUrl} />}
    </>
  );
}
