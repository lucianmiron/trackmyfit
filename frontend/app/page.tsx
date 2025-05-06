'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Toast from './components/Toast';

export default function Home() {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginToast, setShowLoginToast] = useState(false);

  const handleActivityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push('/activities/new');
    } else {
      setShowLoginToast(true);
    }
  };

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
            Welcome {user ? `${user.email.split('@')[0]}` : ''} to Your Fitness
            Tracking App
          </h1>
          <p className="mb-4">This is your gainstation. 💪😤💪</p>
          <Link
            href="/activities/new"
            onClick={handleActivityClick}
            className={`inline-block px-4 py-2 rounded-md ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Start Activity
          </Link>
          <p className="mt-8 mb-4" />
          <Link
            href="/activities/overview"
            // onClick={handleActivityClick}
            className={`inline-block px-4 py-2 rounded-md ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            See all Activities
          </Link>
        </div>
      </main>
      {showLoginToast && (
        <Toast
          message="Please log in to start tracking activities"
          type="error"
          onClose={() => {
            setShowLoginToast(false);
          }}
        />
      )}
    </div>
  );
}
