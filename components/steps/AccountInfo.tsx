import {
  passwordRules,
  validatePasswordRule,
} from "@/utils/passwordValidation";
import { motion } from "framer-motion";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "../../schemas/formSchema";
import FormField from "../FormField";

export default function AccountInfo() {
  const { control, watch } = useFormContext<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password", "");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Account Setup
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Create your account credentials
        </p>
      </motion.div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="username"
          label="Username"
          placeholder="Choose a username"
        />

        <FormField
          control={control}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          }
        />

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password Requirements:
          </p>
          <div className="space-y-2">
            {passwordRules.map(({ id, rule }) => {
              const isValid = validatePasswordRule(password, rule);
              return (
                <div key={id} className="flex items-center space-x-2 text-sm">
                  {isValid ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`${
                      isValid ? "text-green-600" : "text-red-600"
                    } dark:text-gray-300`}
                  >
                    {rule}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <FormField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          }
        />
      </div>
    </div>
  );
}
