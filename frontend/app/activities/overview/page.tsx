'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Calendar from '../../components/Calendar';
import Link from 'next/link';
import { Plus, Clock } from 'lucide-react';
import { ACTIVITIES_API_URL, fetchFromAPI } from '../../../services/api';
import { Activity } from '../../types';

export default function ActivitiesOverview() {
  const { darkMode } = useTheme();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayActivities, setSelectedDayActivities] = useState<
    Activity[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await fetchFromAPI(ACTIVITIES_API_URL, 'activities');
        console.log('Fetched activities:', data); // Debugging line
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleDaySelect = (date: Date, activities: Activity[]) => {
    console.log('Selected date:', date); // Debugging line
    console.log('Activities for selected date:', activities); // Debugging line
    setSelectedDate(date);
    setSelectedDayActivities(activities);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Activity Calendar</h1>
          <Link
            href="/activities/new"
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              darkMode
                ? 'bg-blue-700 hover:bg-blue-600'
                : 'bg-blue-600 hover:bg-blue-500'
            } text-white`}
          >
            <Plus size={20} /> New Activity
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Calendar activities={activities} onDaySelect={handleDaySelect} />
            </div>

            {selectedDate && (
              <div
                className={`rounded-lg shadow-sm ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } p-4`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Activities for{' '}
                  {selectedDate.toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h2>
                {selectedDayActivities.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDayActivities.map((activity) => (
                      <div
                        key={activity.id}
                        onClick={() =>
                          router.push(`/activities/${activity.id}`)
                        }
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          darkMode
                            ? 'bg-gray-700 hover:bg-gray-600'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{activity.name}</h3>
                            <div className="text-sm mt-1">
                              {activity.exercises.length} exercise
                              {activity.exercises.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock size={16} />
                            <span>{formatTime(activity.duration)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    No activities recorded for this day.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
