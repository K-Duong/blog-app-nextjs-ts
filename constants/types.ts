export interface ValidationRulesType {
  required?: boolean;
  maxSize?: number; // in bytes,
  minLength?: number;
  maxLength?: number
  
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
  payload: FormData | null
}

export interface BlogType{
  id: number,
  imageUrl: string,
  title: string,
  content: string,
  author: string,
  createdAt: string,
  likes: number,
  isLiked: boolean
}