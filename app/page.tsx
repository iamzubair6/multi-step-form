import MultiStepForm from "@/components/MultiStepForm";
import Particle from "@/components/shared/Particle";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-300 via-white to-gray-400 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="absolute right-0 top-0 h-screen w-full">
        <Particle />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          <MultiStepForm />
        </div>
      </div>
    </main>
  );
}
