'use client';

import { Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

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
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-700"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/auth/login"
                className="px-3 py-1 rounded hover:bg-blue-700"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-blue-50"
              >
                Sign Up
              </Link>
            </div>
          )}
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
