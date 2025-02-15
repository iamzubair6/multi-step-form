import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

const pulseAnimationVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (delay = 0) => ({
    opacity: [0.25, 0],
    scale: delay ? 1.3 : 1.5,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeOut",
      delay,
      times: [0, 1],
    },
  }),
};

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
    <div className="relative">
      {/* Progress bar */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-700">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 relative"
            >
              {/* Step circle with smoother animations */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  transition: { type: "spring", stiffness: 300, damping: 25 },
                }}
                className={`
                  relative z-10 w-10 h-10 rounded-full flex items-center justify-center
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
                  <CheckIcon className="w-5 h-5 text-white" />
                ) : (
                  <span
                    className={`text-sm font-semibold
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

                {/* Smoother pulse animation for current step */}
                {isCurrent && (
                  <>
                    <motion.div
                      initial="initial"
                      animate={pulseAnimationVariants.animate()}
                      className="absolute inset-0 rounded-full bg-purple-500/20 dark:bg-purple-500/20"
                    />
                    <motion.div
                      initial="initial"
                      animate={pulseAnimationVariants.animate(0.75)}
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
                className={`block text-sm font-medium transition-colors duration-200
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
