import MultiStepForm from "@/components/MultiStepForm";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-sky-100 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5" />
      <div className="relative flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 p-6 md:p-8">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </main>
  );
}
