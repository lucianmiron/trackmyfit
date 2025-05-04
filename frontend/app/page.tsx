'use client';

import Link from 'next/link';
import { useTheme } from './context/ThemeContext';
import Header from './components/Header';

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Header />
      <main className="flex flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1
            className={`text-4xl font-bold mb-8 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Welcome to Your Fitness Tracking App
          </h1>
          <p className="mb-4">This is your gainstation. 💪😤💪</p>
          <Link
            href="/activities"
            className={`${
              darkMode
                ? 'text-blue-400 hover:text-blue-300'
                : 'text-blue-600 hover:text-blue-500'
            } underline`}
          >
            Start Activity
          </Link>
        </div>
      </main>
    </div>
  );
}
