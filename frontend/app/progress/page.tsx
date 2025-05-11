/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { ACTIVITIES_API_URL, fetchFromAPI } from '../../services/api';
import {
  ChevronDown,
  Calendar,
  ArrowLeft,
  BarChart2,
  Activity as ActivityIcon,
  Sliders,
  PercentIcon,
  TrendingUp,
  RotateCcw,
  HelpCircle,
  X,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Types
interface PerformancePoint {
  date: string;
  performance: number;
  volume: number;
  durationEfficiency: number;
  fatigueLevel: number;
  exerciseName: string;
  rawPerformance: number;
}

interface PerformanceData {
  activityName: string;
  exerciseName: string;
  performanceData: PerformancePoint[];
  baselinePerformance?: number;
}

interface Activity {
  id: number;
  name: string;
}

interface ExercisePerformance {
  name: string;
  data: {
    date: string;
    performance: number | null;
    percentageChange: number | null;
  }[];
}

// Custom tooltip component for charts
const CustomTooltip = ({
  active,
  payload,
  label,
  darkMode,
  isPercentage,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-3 border rounded-md shadow-sm ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="flex items-center gap-2 text-sm"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>{entry.name}: </span>
            <span className="font-mono">
              {isPercentage
                ? `${entry.value >= 0 ? '+' : ''}${entry.value.toFixed(1)}%`
                : entry.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ProgressPage = () => {
  const { darkMode } = useTheme();
  const router = useRouter();

  // State
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);

  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [exercisePerformances, setExercisePerformances] = useState<
    ExercisePerformance[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Weight customization
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [volumeWeight, setVolumeWeight] = useState(60);
  const [durationWeight, setDurationWeight] = useState(30);
  const [fatigueWeight, setFatigueWeight] = useState(10);
  const [fatigueModel, setFatigueModel] = useState<
    'position' | 'time' | 'complex'
  >('position');

  // Display options
  const [showPercentage, setShowPercentage] = useState(true);
  const [showFatigueInfo, setShowFatigueInfo] = useState(false);

  // Load activities on component mount
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await fetchFromAPI(ACTIVITIES_API_URL, 'activities');

        // Extract unique activity names
        const uniqueActivities = Array.from(
          new Set(data.map((activity: any) => activity.name))
        ).map((name) => ({
          id: data.find((a: any) => a.name === name).id,
          name: name as string,
        }));

        setActivities(uniqueActivities);

        // If we have activities, select the first one
        if (uniqueActivities.length > 0) {
          setSelectedActivity(uniqueActivities[0].name);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to load activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Fetch performance data when selected activity or weights change
  useEffect(() => {
    if (selectedActivity) {
      const fetchPerformanceData = async () => {
        setLoading(true);
        try {
          // Build the query parameters
          const params = new URLSearchParams();
          params.append('activityName', selectedActivity);
          params.append('volumeWeight', volumeWeight.toString());
          params.append('durationWeight', durationWeight.toString());
          params.append('fatigueWeight', fatigueWeight.toString());
          params.append('fatigueModel', fatigueModel);

          const endpoint = `activities/performance?${params.toString()}`;
          const data = await fetchFromAPI(ACTIVITIES_API_URL, endpoint);
          setPerformanceData(data);

          // Process the data for chart visualization
          processPerformanceData(data);
        } catch (error) {
          console.error('Error fetching performance data:', error);
          setError('Failed to load performance data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchPerformanceData();
    }
  }, [
    selectedActivity,
    volumeWeight,
    durationWeight,
    fatigueWeight,
    fatigueModel,
  ]);

  const processPerformanceData = (data: PerformanceData[]) => {
    // Get all unique dates across all exercises
    const allDates = new Set<string>();
    data.forEach((item) => {
      item.performanceData.forEach((point) => {
        allDates.add(point.date);
      });
    });

    // Sort dates
    const sortedDates = Array.from(allDates).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    // Transform data for chart usage, including percentage calculations
    const performances: ExercisePerformance[] = data.map((item) => {
      const baseline = item.baselinePerformance || 0;

      // Create a map of all dates to their performance data
      const dateMap: Record<
        string,
        { performance: number; percentageChange: number }
      > = {};

      // Initialize with actual data points
      item.performanceData.forEach((point) => {
        const percentageChange =
          baseline > 0 ? ((point.performance - baseline) / baseline) * 100 : 0;

        dateMap[point.date] = {
          performance: point.performance,
          percentageChange: Number(percentageChange.toFixed(1)),
        };
      });

      // Generate performance data array with all dates
      const processedData = sortedDates.map((date) => {
        if (dateMap[date]) {
          return {
            date,
            ...dateMap[date],
          };
        }

        // For dates without data, return null values to maintain continuity
        return {
          date,
          performance: null,
          percentageChange: null,
        };
      });

      return {
        name: item.exerciseName,
        data: processedData,
      };
    });

    setExercisePerformances(performances);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getColorForIndex = (index: number) => {
    const colors = [
      '#8884d8',
      '#82ca9d',
      '#ffc658',
      '#ff7300',
      '#0088fe',
      '#00C49F',
      '#FFBB28',
      '#FF8042',
      '#a4de6c',
      '#d0ed57',
    ];
    return colors[index % colors.length];
  };

  // Combine all dates from all exercises for the chart
  const getAllPerformanceData = () => {
    if (!exercisePerformances.length) return [];

    // First, get all unique dates across all exercises
    const allDates = new Set<string>();
    exercisePerformances.forEach((exercise) => {
      exercise.data.forEach((point) => {
        allDates.add(point.date);
      });
    });

    // Sort dates chronologically
    const sortedDates = Array.from(allDates).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    // Create a map of all dates and their performances by exercise
    const dateMap: Record<string, Record<string, number | null>> = {};

    // Initialize all dates for all exercises (this ensures no missing data points)
    sortedDates.forEach((date) => {
      dateMap[date] = {};
      exercisePerformances.forEach((exercise) => {
        // Set initial null value for all exercise/date combinations
        dateMap[date][exercise.name] = null;
      });
    });

    // Fill in actual data where it exists
    exercisePerformances.forEach((exercise) => {
      exercise.data.forEach((point) => {
        // Store either percentage or absolute value based on current view setting
        dateMap[point.date][exercise.name] = showPercentage
          ? point.percentageChange
          : point.performance;
      });
    });

    // Convert the map to an array for recharts
    return sortedDates.map((date) => {
      const entry: any = { date };
      exercisePerformances.forEach((exercise) => {
        entry[exercise.name] = dateMap[date][exercise.name];
      });
      return entry;
    });
  };

  // Handle weight input changes with normalization
  const handleWeightChange = (
    type: 'volume' | 'duration' | 'fatigue',
    value: number
  ) => {
    // Ensure value is within 0-100 range
    const clampedValue = Math.max(0, Math.min(100, value));

    // Update the appropriate state
    if (type === 'volume') {
      setVolumeWeight(clampedValue);
    } else if (type === 'duration') {
      setDurationWeight(clampedValue);
    } else {
      setFatigueWeight(clampedValue);
    }
  };

  // Reset weights to default values
  const resetWeights = () => {
    setVolumeWeight(60);
    setDurationWeight(30);
    setFatigueWeight(10);
    setFatigueModel('position');
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Header />

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/activities/overview')}
            className={`p-2 rounded-full ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Performance Progress</h1>
        </div>

        {/* Controls Row */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          {/* Activity Selector */}
          <div className="relative">
            <button
              onClick={() => setShowActivityDropdown(!showActivityDropdown)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-100'
              } shadow-sm`}
            >
              <ActivityIcon size={18} />
              <span>{selectedActivity || 'Select Activity'}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showActivityDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showActivityDropdown && (
              <div
                className={`absolute z-20 mt-1 w-full rounded-md shadow-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="py-1">
                  {activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => {
                        setSelectedActivity(activity.name);
                        setShowActivityDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      } ${
                        selectedActivity === activity.name
                          ? darkMode
                            ? 'bg-gray-700'
                            : 'bg-gray-100'
                          : ''
                      }`}
                    >
                      {activity.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowPercentage(!showPercentage)}
              className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-100'
              } shadow-sm`}
              title={
                showPercentage
                  ? 'Show absolute values'
                  : 'Show percentage change'
              }
            >
              {showPercentage ? (
                <TrendingUp size={18} />
              ) : (
                <PercentIcon size={18} />
              )}
              <span className="hidden sm:inline">
                {showPercentage ? 'Showing %' : 'Showing Absolute'}
              </span>
            </button>

            <button
              onClick={() => setShowCustomizePanel(!showCustomizePanel)}
              className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-100'
              } shadow-sm ${
                showCustomizePanel ? 'border-blue-500 border-2' : ''
              }`}
              title="Customize calculation weights"
            >
              <Sliders size={18} />
              <span className="hidden sm:inline">Customize</span>
            </button>
          </div>
        </div>

        {/* Performance Calculation Customization Panel */}
        {showCustomizePanel && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Customize Performance Calculation
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={resetWeights}
                  className={`p-2 rounded-full ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                  title="Reset to defaults"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={() => setShowCustomizePanel(false)}
                  className={`p-2 rounded-full ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weights Section */}
              <div>
                <h3 className="font-medium mb-3">Performance Factors</h3>

                {/* Volume Weight */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <label className="text-sm">
                      Volume Weight (Weight × Reps)
                    </label>
                    <span className="text-sm font-mono">{volumeWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumeWeight}
                    onChange={(e) =>
                      handleWeightChange('volume', parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>

                {/* Duration Weight */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <label className="text-sm">
                      Duration Efficiency Weight
                    </label>
                    <span className="text-sm font-mono">{durationWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={durationWeight}
                    onChange={(e) =>
                      handleWeightChange('duration', parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>

                {/* Fatigue Weight */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <label className="text-sm">Fatigue Adjustment Weight</label>
                    <span className="text-sm font-mono">{fatigueWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fatigueWeight}
                    onChange={(e) =>
                      handleWeightChange('fatigue', parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Fatigue Model Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-medium">Fatigue Model</h3>
                  <button
                    onClick={() => setShowFatigueInfo(!showFatigueInfo)}
                    className={`p-1 rounded-full ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                  >
                    <HelpCircle size={16} />
                  </button>
                </div>

                {showFatigueInfo && (
                  <div
                    className={`p-3 mb-3 rounded-md text-sm ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <p className="mb-2">
                      <strong>Position-based:</strong> Fatigue increases based
                      on the exercise&apos;s position in the workout.
                    </p>
                    <p className="mb-2">
                      <strong>Time-based:</strong> Fatigue increases based on
                      how much time has passed in the workout.
                    </p>
                    <p>
                      <strong>Complex:</strong> Considers both position and the
                      accumulated volume from previous exercises.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fatigueModel"
                      checked={fatigueModel === 'position'}
                      onChange={() => setFatigueModel('position')}
                    />
                    <span>Position-based</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fatigueModel"
                      checked={fatigueModel === 'time'}
                      onChange={() => setFatigueModel('time')}
                    />
                    <span>Time-based</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fatigueModel"
                      checked={fatigueModel === 'complex'}
                      onChange={() => setFatigueModel('complex')}
                    />
                    <span>Complex (Position + Metabolic Load)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div
            className={`p-4 rounded-md ${
              darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'
            }`}
          >
            {error}
          </div>
        ) : (
          <>
            {/* Performance Chart */}
            <div
              className={`p-4 rounded-lg shadow-sm mb-8 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart2 size={20} />
                Performance Trends
                <span className="text-sm font-normal ml-2">
                  {showPercentage ? '(% change)' : '(absolute score)'}
                </span>
              </h2>

              {exercisePerformances.length > 0 ? (
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getAllPerformanceData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? '#444' : '#eee'}
                      />
                      <XAxis
                        dataKey="date"
                        stroke={darkMode ? '#aaa' : '#666'}
                        tickFormatter={(value) => {
                          // Format date to shorter version for x-axis
                          return new Date(value).toLocaleDateString('default', {
                            month: 'numeric',
                            day: 'numeric',
                          });
                        }}
                      />
                      <YAxis
                        stroke={darkMode ? '#aaa' : '#666'}
                        label={{
                          value: showPercentage
                            ? 'Change (%)'
                            : 'Performance Score',
                          angle: -90,
                          position: 'insideLeft',
                          style: {
                            textAnchor: 'middle',
                            fill: darkMode ? '#aaa' : '#666',
                          },
                        }}
                      />
                      <Tooltip
                        content={
                          <CustomTooltip
                            darkMode={darkMode}
                            isPercentage={showPercentage}
                          />
                        }
                        isAnimationActive={true}
                      />
                      <Legend />

                      {exercisePerformances.map((exercise, index) => (
                        <Line
                          key={exercise.name}
                          type="monotone"
                          dataKey={exercise.name}
                          stroke={getColorForIndex(index)}
                          activeDot={{ r: 6 }}
                          strokeWidth={2.5}
                          connectNulls={false} // Changed to false to ensure line continuity
                          dot={{
                            strokeWidth: 2,
                            r: 5,
                            fill: darkMode ? '#111827' : '#fff',
                            stroke: getColorForIndex(index),
                          }}
                          isAnimationActive={true}
                          animationDuration={1000}
                          animationEasing="ease-in-out"
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <BarChart2
                    size={48}
                    className={`mb-4 ${
                      darkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    No performance data available for this activity.
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    Try selecting a different activity or record more workouts.
                  </p>
                </div>
              )}
            </div>

            {/* Exercise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercisePerformances.map((exercise, index) => (
                <div
                  key={exercise.name}
                  className={`p-4 rounded-lg shadow-sm ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getColorForIndex(index) }}
                    ></div>
                    {exercise.name}
                  </h3>

                  {exercise.data.length > 0 ? (
                    <div className="space-y-2">
                      {/* Latest performance */}
                      <div
                        className={`p-3 rounded-md ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Calendar
                              size={14}
                              className={
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                              }
                            />
                            <span className="text-sm">
                              Latest:{' '}
                              {formatDate(
                                exercise.data[exercise.data.length - 1].date
                              )}
                            </span>
                          </div>
                          <div className="font-mono font-medium flex items-center gap-1">
                            {!showPercentage && (
                              <span>
                                {exercise.data[
                                  exercise.data.length - 1
                                ].performance?.toFixed(1)}
                              </span>
                            )}
                            {showPercentage && (
                              <span
                                className={`${
                                  exercise.data[exercise.data.length - 1]
                                    .percentageChange! > 0
                                    ? 'text-green-500'
                                    : exercise.data[exercise.data.length - 1]
                                        .percentageChange! < 0
                                    ? 'text-red-500'
                                    : ''
                                }`}
                              >
                                {exercise.data[exercise.data.length - 1]
                                  .percentageChange! > 0
                                  ? '+'
                                  : ''}
                                {exercise.data[
                                  exercise.data.length - 1
                                ].percentageChange?.toFixed(1)}
                                %
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* First vs Latest Performance */}
                      {exercise.data.length > 1 && (
                        <div
                          className={`p-3 rounded-md ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <div
                                className={
                                  darkMode ? 'text-gray-400' : 'text-gray-500'
                                }
                              >
                                First
                              </div>
                              <div className="font-mono">
                                {showPercentage
                                  ? '0.0%'
                                  : exercise.data[0].performance?.toFixed(1)}
                              </div>
                            </div>

                            <div className="flex items-center">
                              {exercise.data[exercise.data.length - 1]
                                .percentageChange! > 0 ? (
                                <TrendingUp
                                  size={24}
                                  className="text-green-500 mr-1"
                                />
                              ) : exercise.data[exercise.data.length - 1]
                                  .percentageChange! < 0 ? (
                                <TrendingUp
                                  size={24}
                                  className="text-red-500 mr-1 transform rotate-180"
                                />
                              ) : (
                                <div className="w-6 h-0.5 bg-gray-400 mr-1" />
                              )}
                            </div>

                            <div className="text-right">
                              <div
                                className={
                                  darkMode ? 'text-gray-400' : 'text-gray-500'
                                }
                              >
                                Latest
                              </div>
                              <div className="font-mono">
                                {showPercentage
                                  ? `${
                                      exercise.data[exercise.data.length - 1]
                                        .percentageChange! > 0
                                        ? '+'
                                        : ''
                                    }${exercise.data[
                                      exercise.data.length - 1
                                    ].percentageChange?.toFixed(1)}%`
                                  : exercise.data[
                                      exercise.data.length - 1
                                    ].performance?.toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Performance progress indicator */}
                      {exercise.data.length > 1 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Progress:</span>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    exercise.data[exercise.data.length - 1]
                                      .percentageChange! > 0
                                      ? Math.min(
                                          100,
                                          exercise.data[
                                            exercise.data.length - 1
                                          ].percentageChange! + 50
                                        )
                                      : 50
                                  )
                                )}%`,
                                backgroundColor:
                                  exercise.data[exercise.data.length - 1]
                                    .percentageChange! > 0
                                    ? '#22c55e' // Green for improvement
                                    : exercise.data[exercise.data.length - 1]
                                        .percentageChange! < 0
                                    ? '#ef4444' // Red for decline
                                    : '#f59e0b', // Yellow for no change
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p
                      className={`text-sm italic ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      No performance data available
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
