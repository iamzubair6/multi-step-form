import { ReactNode } from "react";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "date"
  | "select"
  | "confirmPassword";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  rightIcon?: ReactNode;
  validation?: object;
  matchWith?: string;
}
