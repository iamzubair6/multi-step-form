import { FormFieldConfig } from "@/types/form";
import { states } from "./locations";

export const personalInfoFields: FormFieldConfig[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    validation: {
      required: "Full name is required",
      pattern: {
        value: /^[a-zA-Z\s]*$/,
        message: "Name can only contain letters and spaces",
      },
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters long",
      },
    },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    validation: {
      required: "Date of birth is required",
      validate: (value: string) => {
        const date = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age >= 18 || "You must be at least 18 years old";
      },
    },
  },
];

export const addressFields: FormFieldConfig[] = [
  {
    name: "addressLine1",
    label: "Address Line 1",
    type: "text",
    placeholder: "Street address",
    validation: { required: "Address is required" },
  },
  {
    name: "addressLine2",
    label: "Address Line 2 (Optional)",
    type: "text",
    placeholder: "Apartment, suite, unit, etc.",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter your city",
    validation: { required: "City is required" },
  },
  {
    name: "state",
    label: "State",
    type: "select",
    placeholder: "Select your state",
    options: states?.map((state) => ({ label: state, value: state })),
    validation: { required: "State is required" },
  },
  {
    name: "zipCode",
    label: "ZIP Code",
    type: "text",
    placeholder: "Enter your ZIP code",
    validation: {
      required: "ZIP code is required",
      pattern: {
        value: /^\d{5}(-\d{4})?$/,
        message: "Please enter a valid ZIP code",
      },
    },
  },
];

export const accountFields: FormFieldConfig[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Choose a username",
    validation: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    validation: {
      required: "Password is required",
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "confirmPassword",
    placeholder: "Confirm your password",
    matchWith: "password",
    validation: {
      required: "Please confirm your password",
    },
  },
];
