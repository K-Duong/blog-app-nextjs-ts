import PostBlog from "./PostBlog";

export interface ValidationRulesType {
  required?: boolean;
}
export interface FieldType {
  id: string;
  label: string;
  type: string;
  name: string;
  validationRules: ValidationRulesType;
}
export interface FormState {
  loading: boolean;
  errors: Record<string, string> | null;
  success: boolean;
}
const fields: Record<string, FieldType> = {
  title: {
    id: "title",
    label: "Title",
    type: "text",
    name: "title",
    validationRules: {
      required: true,
    },
  },
  image: {
    id: "image",
    label: "Image URL",
    type: "file",
    name: "image",
    validationRules: {},
  },
  content: {
    id: "content",
    label: "Content",
    type: "text",
    name: "content",
    validationRules: {
      required: true,
    },
  },
};

export default function FormNewBlog() {
  const handleCreateBlog = async (prevState: FormState, formData: FormData) : Promise<FormState>=> {
    "use server";
    const getInputValue = (fieldName: string, formData: FormData) =>
      formData.get(fields[fieldName].name);

    const fieldsList = Object.keys(fields) as Array<keyof typeof fields>;
    const data = fieldsList.reduce((acc, fieldName) => {
      acc[fieldName] = getInputValue(fieldName, formData);
      return acc;
    }, {} as Record<keyof typeof fields, FormDataEntryValue | null>);

    console.log("form data:", data);

    // validation
    const errors: Record<string, string> = {};

    fieldsList.forEach((fieldName) => {
      const rules = fields[fieldName].validationRules;
      const value = data[fieldName];
      if (
        rules.required &&
        (!value || (typeof value === "string" && value?.trim().length === 0))
      ) {
        errors[fieldName] = `${fields[fieldName].label} is required`;
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

  return <PostBlog action={handleCreateBlog} fields={fields} />;
}
