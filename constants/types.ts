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
