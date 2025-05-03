import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Your Fitness Tracking App
        </h1>
        <p className="mb-4">This is your Next.js frontend with Tailwind CSS.</p>
        <Link href="/activities" className="text-blue-500 underline">
          View Activities (SSR Example)
        </Link>
      </div>
    </main>
  );
}
