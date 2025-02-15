import { useFormContext, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormField from "../FormField";

export default function PersonalInfo() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let&apos;s start with your basic information
        </p>
      </motion.div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
        />

        <FormField
          control={control}
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          type="email"
        />

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Input
                  {...field}
                  type="date"
                  id="dateOfBirth"
                  className={error ? "border-red-500" : ""}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
