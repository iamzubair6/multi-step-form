"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues, FormData, formSchema } from "../schemas/formSchema";
import StepIndicator from "./StepIndicator";
import AccountInfo from "./steps/AccountInfo";
import AddressInfo from "./steps/AddressInfo";
import PersonalInfo from "./steps/PersonalInfo";

const steps = [
  { title: "Personal Info", component: PersonalInfo },
  { title: "Address Info", component: AddressInfo },
  { title: "Account Setup", component: AccountInfo },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues,
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
      <div className="space-y-8 md:space-y-16 px-4 md:px-0">
        <div className="text-center space-y-3 pt-14 md:pt-0">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Join Our Team
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Complete the form below to start your journey with us
          </p>
        </div>

        <div className="px-10 pb-10 md:pb-0">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            progress={progress}
          />
        </div>

        <div className="relative backdrop-blur-2xl bg-white/20 dark:bg-black/5 border border-gray-200/50 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-xl">
          {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 dark:from-purple-500/5 dark:via-transparent dark:to-blue-500/5 rounded-3xl" />
          <div className="absolute inset-0 bg-white/40 dark:bg-black/0 backdrop-blur-xl rounded-3xl" /> */}
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-10 relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px]"
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
                className="form-button-outline w-full sm:w-auto"
              >
                ← Previous
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-button w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Complete →"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="form-button w-full sm:w-auto"
                >
                  Next →
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
