import { pulseAnimationVariants } from "@/utils/pulseIndicator";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

interface Step {
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  progress: number;
}

export default function StepIndicator({
  steps,
  currentStep,
  progress,
}: StepIndicatorProps) {
  return (
    <div className="relative px-0 sm:px-0">
      {/* Progress bar */}
      <div className="absolute top-3 sm:top-5 left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-700">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between max-w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-1 sm:space-y-2"
            >
              {/* Step circle with smoother animations */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  transition: { type: "spring", stiffness: 300, damping: 25 },
                }}
                className={`
                  relative z-10 w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25"
                      : isCurrent
                      ? "bg-white dark:bg-gray-800 border-2 border-purple-500 shadow-lg shadow-purple-500/20"
                      : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckIcon className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <span
                    className={`text-xs sm:text-sm font-semibold
                    ${
                      isCurrent
                        ? "text-purple-500 dark:text-purple-400"
                        : "text-gray-500 dark:text-gray-500"
                    }
                  `}
                  >
                    {index + 1}
                  </span>
                )}

                {/* Pulse animations */}
                {isCurrent && (
                  <>
                    <motion.div
                      initial="initial"
                      animate={pulseAnimationVariants?.animate()}
                      className="absolute inset-0 rounded-full bg-purple-500/20 dark:bg-purple-500/20"
                    />
                    <motion.div
                      initial="initial"
                      animate={pulseAnimationVariants?.animate(0.75)}
                      className="absolute inset-0 rounded-full bg-purple-500/15 dark:bg-purple-500/15"
                    />
                  </>
                )}
              </motion.div>

              {/* Step title */}
              <motion.span
                initial={false}
                animate={{
                  color: isCurrent
                    ? "rgb(147, 51, 234)"
                    : isCompleted
                    ? "rgb(34, 197, 94)"
                    : "",
                }}
                className={`absolute top-[100%] whitespace-nowrap block text-[10px] sm:text-sm font-medium transition-colors duration-200 text-center
                  ${
                    isCurrent
                      ? "text-purple-600 dark:text-purple-400"
                      : isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-500"
                  }
                `}
              >
                {step.title}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
