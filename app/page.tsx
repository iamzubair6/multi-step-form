import MultiStepForm from "@/components/MultiStepForm";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-purple-200/60 via-purple-300/60 to-violet-300/60 dark:from-purple-900/20 dark:via-purple-800/20 dark:to-violet-900/20 blur-3xl animate-blob"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-blue-200/60 via-blue-300/60 to-cyan-300/60 dark:from-blue-900/20 dark:via-blue-800/20 dark:to-cyan-900/20 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-teal-200/60 via-teal-300/60 to-emerald-300/60 dark:from-teal-900/20 dark:via-teal-800/20 dark:to-emerald-900/20 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <MultiStepForm />
        </div>
      </div>
    </main>
  );
}
