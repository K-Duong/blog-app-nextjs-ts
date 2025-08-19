'use client'
import { useState } from "react";

import { FieldType } from "@/constants/types";

import styles from "./inputField.module.css";
import Image from "next/image";


export default function ImageField({
  field,
}: {
  field: FieldType;
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const isValidType = file?.type === "image/png" || file?.type === "image/jpeg";

    if (isValidType === false) {
      setErrorMessage("Invalid file type. Only PNG and JPEG are allowed.");
      e.target.value = "";
      return
    }else if (file && file.size > 1024 * 1024) {
      // 1MB limit
      setErrorMessage("Image is too large. Max size is 1MB");
      e.target.value = "";
      return;
    } 

    setErrorMessage("");
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
      {errorMessage.length > 0 && (<span className={styles.errorText}>{ errorMessage}</span>)}

    </>
  );
}
