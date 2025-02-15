import * as z from "zod";

export const formSchema = z
  .object({
    // Personal Information
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),

    // Address Information
    addressLine1: z.string().min(1, "Address is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z
      .string()
      .min(5, "ZIP code is required")
      .regex(
        /^\d{5}(-\d{4})?$/,
        "ZIP code must be in format: 12345 or 12345-6789"
      ),

    // Account Information
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof formSchema>;

export const defaultValues: FormData = {
  name: "",
  email: "",
  dateOfBirth: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  username: "",
  password: "",
  confirmPassword: "",
};
