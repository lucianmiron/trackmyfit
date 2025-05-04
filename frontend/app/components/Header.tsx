'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header
      className={`${
        darkMode ? 'bg-blue-800' : 'bg-blue-600'
      } text-white p-4 shadow-md`}
    >
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold hover:text-blue-100">
            Fitness Tracker
          </h1>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-blue-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
