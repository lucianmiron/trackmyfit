'use client';

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Activity } from '../types';

interface CalendarProps {
  activities: Activity[];
  onDaySelect: (date: Date, activities: Activity[]) => void;
}

export default function Calendar({ activities, onDaySelect }: CalendarProps) {
  const { darkMode } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('default', {
    month: 'long',
    year: 'numeric',
  });

  const getActivitiesForDay = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return activities.filter((activity) => {
      const activityDate = new Date(activity.startDate);
      return (
        activityDate.getDate() === day &&
        activityDate.getMonth() === date.getMonth() &&
        activityDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Render week days header
    weekDays.forEach((day) => {
      days.push(
        <div key={`header-${day}`} className="font-semibold text-center py-2">
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Render the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayActivities = getActivitiesForDay(day);
      const isToday =
        new Date().toDateString() ===
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        ).toDateString();

      days.push(
        <div
          key={day}
          onClick={() =>
            onDaySelect(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
              dayActivities
            )
          }
          className={`p-2 min-h-[80px] border cursor-pointer transition-colors
            ${
              darkMode
                ? 'border-gray-700 hover:bg-gray-700'
                : 'border-gray-200 hover:bg-gray-50'
            }
            ${isToday ? (darkMode ? 'bg-blue-900/50' : 'bg-blue-50') : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={isToday ? 'font-bold' : ''}>{day}</span>
            {dayActivities.length > 0 && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  darkMode
                    ? 'bg-blue-900 text-blue-200'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {dayActivities.length}
              </span>
            )}
          </div>
          {dayActivities.length > 0 && (
            <div className="mt-1 space-y-1">
              {dayActivities.slice(0, 2).map((activity) => (
                <div
                  key={activity.id}
                  className={`text-xs truncate rounded px-1 py-0.5 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  {activity.name}
                </div>
              ))}
              {dayActivities.length > 2 && (
                <div
                  className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  +{dayActivities.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className={`rounded-lg shadow-sm ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{monthYear}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 p-4 gap-2">{renderCalendarDays()}</div>
    </div>
  );
}
