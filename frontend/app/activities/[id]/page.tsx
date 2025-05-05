'use client';

import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';
import { ACTIVITIES_API_URL, fetchFromAPI } from '../../../services/api';
import Header from '../../components/Header';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Activity {
  id: number;
  name: string;
  duration: number;
  exercises: {
    name: string;
    sets: {
      reps: number;
      weight: number;
      unit: 'kg' | 'lb';
      duration: number;
    }[];
  }[];
}

export default function ActivitySummary() {
  const { darkMode } = useTheme();
  const params = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await fetchFromAPI(
          ACTIVITIES_API_URL,
          `activities/${params.id}`
        );
        setActivity(data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchActivity();
    }
  }, [params.id]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <Header />
        <div className="p-4">Loading...</div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div
        className={`min-h-screen ${
          darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <Header />
        <div className="p-4">Activity not found</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Header />

      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/activities"
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">{activity.name}</h1>
        </div>

        <div
          className={`p-4 rounded-lg mb-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}
        >
          <div className="flex items-center gap-2">
            <Clock
              size={20}
              className={darkMode ? 'text-gray-400' : 'text-gray-500'}
            />
            <span className="text-xl font-mono">
              {formatTime(activity.duration)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {activity.exercises.map((exercise, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-4">{exercise.name}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className={darkMode ? 'text-gray-400' : 'text-gray-500'}
                    >
                      <th className="text-left pb-2">Set</th>
                      <th className="text-left pb-2">Reps</th>
                      <th className="text-left pb-2">Weight</th>
                      <th className="text-left pb-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercise.sets.map((set, setIndex) => (
                      <tr
                        key={setIndex}
                        className={`border-t ${
                          darkMode ? 'border-gray-700' : 'border-gray-100'
                        }`}
                      >
                        <td className="py-2">{setIndex + 1}</td>
                        <td className="py-2">{set.reps}</td>
                        <td className="py-2">
                          {set.weight} {set.unit}
                        </td>
                        <td className="py-2">{formatTime(set.duration)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
