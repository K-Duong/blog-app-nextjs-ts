'use server';

import { BlogPayload, FormState } from "@/types";
import { FIELDS } from "@/constants";
import { uploadImage } from "@/libs/cloudinary";
import { storeBlog, updateBlog } from "@/libs/blogs";
import { getCurrentUser } from "@/libs/auth";

// helper function to handle the process of blog'validation and upload image to cloudinary
const processCheckingInput = async (formData: FormData) => {
  //get current user id
  const user = await getCurrentUser();
  const errors: Record<string, string> = {};
  let imageUrl: string | null = '';

  // check validation rules
  const fieldsList = Object.keys(FIELDS) as Array<keyof typeof FIELDS>;
  const payload = Object.fromEntries(formData.entries());

  // validation
  fieldsList.forEach((fieldName) => {
    const rules = FIELDS[fieldName].validationRules;
    const value = payload[fieldName];
    if (
      rules.required &&
      (!value || (typeof value === "string" && value?.trim().length === 0)) || // Check for empty string or null
      // (value instanceof File && value?.size === 0) || //check for empty file image
      value === null) {
      errors[fieldName] = `${FIELDS[fieldName].label} is required`;
    }
  });

  try {
    if (!payload.existingImageUrl && payload.image && payload.image instanceof File && payload.image.size === 0) {
      errors['image'] = `Image is required`
    } else if (payload.existingImageUrl && typeof payload.existingImageUrl === 'string' && payload.existingImageUrl.length > 0) {
      if (!payload.image || (payload.image instanceof File && payload.image.size === 0)) {
        // use existing image url
        imageUrl = payload.existingImageUrl;
      } else {
        // upload new image to cloudinary
        imageUrl = await uploadImage(payload.image as File);
      };
    } else {
      // upload image to cloudinary
      imageUrl = await uploadImage(payload.image as File);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: { image: error.message || "Failed to upload image" },
      }
    }
  }

  const newBlogData: BlogPayload = {
    title: payload.title as string,
    content: payload.content as string,
    imageUrl: imageUrl,
    userId: Number(user.id)
  }
  // return values ({errors, payload})
  return {
    errors,
    newBlogData
  }
}

export const handleCreateBlog = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  console.log("create new blog")
  const { errors, newBlogData } = await processCheckingInput(formData);

  if (errors && Object.keys(errors).length > 0) {
    return {
      ...prevState,
      success: false,
      payload: formData,
      errors: { ...prevState.errors, ...errors }
    }
  } else {
    if (!newBlogData) return {
      ...prevState,
      errors: { ...prevState.errors, general: "No data to submit" }
    };

    await storeBlog(newBlogData);
    return {
      ...prevState,
      errors: null,
      success: true,
      payload: formData,
    }
  }
};

export const handleUpdateBlog = async (blogId: number, prevState: FormState, formData: FormData): Promise<FormState> => {
  console.log("update existing blog")
  const { errors, newBlogData } = await processCheckingInput(formData);

  if (errors && Object.keys(errors).length > 0) {
    return {
      ...prevState,
      success: false,
      payload: formData,
      errors: { ...prevState.errors, ...errors }
    }
  } else {
    if (!newBlogData) return {
      ...prevState,
      errors: { ...prevState.errors, general: "No data to submit" }
    };

    await updateBlog(blogId, newBlogData, newBlogData.userId);
    return {
      ...prevState,
      errors: null,
      success: true,
      payload: formData,
    }
  }
}


