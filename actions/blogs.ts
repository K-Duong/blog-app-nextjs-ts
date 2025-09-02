'use server';

import { FormState } from "@/constants/types";
import { FIELDS } from "@/constants";
import { uploadImage } from "@/libs/cloudinary";
import { getBlogById, storeBlog } from "@/libs/blogs";

export const handleCreateBlog = async (prevState: FormState, formData: FormData): Promise<FormState> => {

  const fieldsList = Object.keys(FIELDS) as Array<keyof typeof FIELDS>;
  const payload = Object.fromEntries(formData.entries());

  // validation
  const errors: Record<string, string> = {};
  let imageUrl: string | null = null;

  fieldsList.forEach((fieldName) => {
    const rules = FIELDS[fieldName].validationRules;
    const value = payload[fieldName];
    if (
      rules.required &&
      (!value || (typeof value === "string" && value?.trim().length === 0)) || // Check for empty string or null
      (value instanceof File && value?.size === 0) || //check for empty file image
      value === null) {
      errors[fieldName] = `${FIELDS[fieldName].label} is required`;
    }
  });


  try {
    imageUrl = await uploadImage(payload.image as File);
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
      payload: formData,
      errors: errors
    }
  } else if (payload && imageUrl && imageUrl.length > 0) {
    const newData = {
      title: payload.title as string,
      content: payload.content as string,
      imageUrl: imageUrl,
      userId: 1, // Assuming userId is 1 for now
    }
    // console.log("form data:", newData);
    await storeBlog(newData);
    return {
      ...prevState,
      errors: null,
      success: true,
      payload: formData,
    }
    // Simulate a loading state
  } else {
    console.log("No data to submit");
    return {
      // FIXME: handle this error 
      ...prevState,
      errors: { ...prevState.errors, general: "No data to submit" },
      success: false,
      payload: formData,
    };
  }
};

export const getBlogByIdAction = async (blogId: number) => {
  const result = await getBlogById(blogId);
  if (result) {
    return result;
  } else {
    throw new Error('Blog not found');
  }
}