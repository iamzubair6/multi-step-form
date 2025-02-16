import { states } from "@/constants/locations";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import FormField from "../shared/FormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddressInfo() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Address Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Where can we reach you?
        </p>
      </motion.div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="addressLine1"
          label="Address Line 1"
          placeholder="Street address"
        />

        <FormField
          control={control}
          name="addressLine2"
          label="Address Line 2 (Optional)"
          placeholder="Apartment, suite, unit, etc."
        />

        <FormField
          control={control}
          name="city"
          label="City"
          placeholder="Enter your city"
        />

        <FormField
          control={control}
          name="state"
          label="State"
          render={({ field, fieldState: { error } }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={error ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {states?.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <FormField
          control={control}
          name="zipCode"
          label="ZIP Code"
          placeholder="Enter your ZIP code"
        />
      </div>
    </div>
  );
}
