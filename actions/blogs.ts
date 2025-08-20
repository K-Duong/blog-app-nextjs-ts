'use server';

import { FormState } from "@/constants/types";
import { FIELDS } from "@/constants";
import { uploadImage } from "@/libs/cloudinary";
import { storeBlog } from "@/libs/blogs";

export const handleCreateBlog = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const getInputValue = (fieldName: keyof typeof FIELDS, formData: FormData): FormDataEntryValue | null =>
    formData.get(FIELDS[fieldName].name);

  const fieldsList = Object.keys(FIELDS) as Array<keyof typeof FIELDS>;
  const data = fieldsList.reduce((acc, fieldName) => {
    acc[fieldName] = getInputValue(fieldName, formData);
    return acc;
  }, {} as Record<keyof typeof FIELDS, FormDataEntryValue | null>);

  // validation
  const errors: Record<string, string> = {};
  let imageUrl: string | null = null;

  fieldsList.forEach((fieldName) => {
    const rules = FIELDS[fieldName].validationRules;
    const value = data[fieldName];
    if (
      rules.required &&
      (!value || (typeof value === "string" && value?.trim().length === 0)) || // Check for empty string or null
      (value instanceof File && value?.size === 0) || //check for empty file image
      value === null) {
      errors[fieldName] = `${FIELDS[fieldName].label} is required`;
    }
  });


  try {
    imageUrl = await uploadImage(data.image as File);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        ...prevState,
        errors: { ...prevState.errors, image: error.message || "Failed to upload image" },
      }
    }
  }
  
  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors);
    return {
      ...prevState,
      errors: errors
    }
  } else if (data && imageUrl && imageUrl.length > 0) {
    // TODO: send data to the server
    const newData = {
      title: data.title as string,
      content: data.content as string,
      imageUrl: imageUrl,
      userId: 1, // Assuming userId is 1 for now
    }
    console.log("form data:", newData);
    await storeBlog(newData);
    return {
      ...prevState,
      errors: null,
      success: true,
    }
    // Simulate a loading state
  } else {
    console.log("No data to submit");
  }
};