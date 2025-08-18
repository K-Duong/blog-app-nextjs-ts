'use server';
import { FormState } from "@/constants/types";
import { FIELDS } from "@/constants";

export const handleCreateBlog = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const getInputValue = (fieldName: string, formData: FormData) =>
    formData.get(FIELDS[fieldName].name);

  const fieldsList = Object.keys(FIELDS) as Array<keyof typeof FIELDS>;
  const data = fieldsList.reduce((acc, fieldName) => {
    acc[fieldName] = getInputValue(fieldName, formData);
    return acc;
  }, {} as Record<keyof typeof FIELDS, FormDataEntryValue | null>);

  console.log("form data:", data);

  // validation
  const errors: Record<string, string> = {};

  fieldsList.forEach((fieldName) => {
    const rules = FIELDS[fieldName].validationRules;
    const value = data[fieldName];
    if (
      rules.required &&
      (!value || (typeof value === "string" && value?.trim().length === 0))
    ) {
      errors[fieldName] = `${FIELDS[fieldName].label} is required`;
    }
  });

  if (Object.keys(errors).length > 0) {
    console.log("Validation errors:", errors);

    return {
      loading: false,
      errors,
      success: false,
    };
  } else {
    // Simulate a successful form submission
    console.log("Form submitted successfully with data:", data);
    return {
      loading: false,
      errors: null,
      success: true,
    };
  }
  // Simulate a loading state
};