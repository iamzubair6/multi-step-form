import { personalInfoFields } from "@/constants/formItems";
import { motion } from "framer-motion";
import FormField from "../shared/FormField";

export default function PersonalInfo() {
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
        {personalInfoFields?.map((field) => (
          <FormField key={field?.name} field={field} />
        ))}
      </div>
    </div>
  );
}
