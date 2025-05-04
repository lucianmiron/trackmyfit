'use client';

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const { darkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div
        className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px]`}
      >
        {type === 'success' ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <XCircle className="text-red-500" size={20} />
        )}
        <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
          {message}
        </p>
        <button
          onClick={onClose}
          className={`ml-auto p-1 rounded-full hover:${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
