import { motion } from 'framer-motion';
import { Progress } from './ui/progress';

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
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 relative"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  color: isActive ? 'rgb(79, 70, 229)' : isCompleted ? 'rgb(34, 197, 94)' : 'rgb(156, 163, 175)',
                }}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  border-2 font-medium text-sm
                  ${isActive ? 'border-indigo-600 text-indigo-600' : 
                    isCompleted ? 'border-green-500 text-green-500' : 
                    'border-gray-400 text-gray-400'}
                `}
              >
                {index + 1}
              </motion.div>
              <span className={`text-sm font-medium ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 
                isCompleted ? 'text-green-500 dark:text-green-400' : 
                'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}