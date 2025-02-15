"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import StepIndicator from "./StepIndicator";
import AccountInfo from "./steps/AccountInfo";
import AddressInfo from "./steps/AddressInfo";
import PersonalInfo from "./steps/PersonalInfo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const formSchema = z
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
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),

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

type FormData = z.infer<typeof formSchema>;

const steps = [
  { title: "Personal Info", component: PersonalInfo },
  { title: "Address Info", component: AddressInfo },
  { title: "Account Setup", component: AccountInfo },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      // Personal Information
      name: "",
      email: "",
      dateOfBirth: "",

      // Address Information
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",

      // Account Information
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);
      // Reset form and show success message
      methods.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fields = Object.keys(methods.getValues()) as (keyof FormData)[];
    const currentFields = fields.filter((field) => {
      if (currentStep === 0)
        return ["name", "email", "dateOfBirth"].includes(field);
      if (currentStep === 1)
        return ["addressLine1", "city", "state", "zipCode"].includes(field);
      return ["username", "password", "confirmPassword"].includes(field);
    });

    const isValid = await methods.trigger(currentFields);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const progress = (currentStep / (steps.length - 1)) * 100;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join Our Team
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete the form below to start your journey with us
          </p>
        </div>

        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          progress={progress}
        />

        <Card className="p-6 md:p-8 shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                {...fadeInUp}
                className="min-h-[400px]"
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
                className="w-28"
              >
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button type="submit" disabled={isSubmitting} className="w-28">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="w-28"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </FormProvider>
  );
}
