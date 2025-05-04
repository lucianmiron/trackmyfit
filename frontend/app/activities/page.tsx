/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Plus,
  ArrowLeft,
  Check,
  X,
  Save,
  Clock,
  Dumbbell,
  RotateCcw,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

// Types
type WeightUnit = 'kg' | 'lb';

interface ExerciseSet {
  reps: number;
  weight: number;
  unit: WeightUnit;
  time: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

// Custom hook for timer
interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  formatTime: () => string;
}

const useTimer = (initialTime: number = 0): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const startTimer = useCallback((): void => {
    if (!isRunning) {
      setIsRunning(true);
      const id: number = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  }, [isRunning]);

  const pauseTimer = useCallback((): void => {
    if (isRunning && intervalId !== null) {
      window.clearInterval(intervalId);
      setIntervalId(null);
      setIsRunning(false);
    }
  }, [isRunning, intervalId]);

  const resetTimer = useCallback((): void => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
    setTime(initialTime);
    setIsRunning(false);
  }, [intervalId, initialTime]);

  const formatTime = useCallback((): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }, [time]);

  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return { time, isRunning, startTimer, pauseTimer, resetTimer, formatTime };
};

// Mock data for preset exercises
const presetExercises: string[] = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Pull-up',
  'Push-up',
  'Shoulder Press',
  'Bicep Curl',
  'Tricep Extension',
  'Leg Press',
  'Lat Pulldown',
];

const FitnessTracker: React.FC = () => {
  const { darkMode } = useTheme();

  // Main activity state
  const [activityName, setActivityName] = useState<string>('Workout');
  const {
    time: activityTimer,
    isRunning: isActivityTimerRunning,
    startTimer: startActivityTimer,
    pauseTimer: pauseActivityTimer,
    formatTime: formatActivityTime,
  } = useTimer();

  // Exercise tracking
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showExerciseForm, setShowExerciseForm] = useState<boolean>(false);
  const [newExerciseName, setNewExerciseName] = useState<string>('');
  const [showExercisesList, setShowExercisesList] = useState<boolean>(false);

  // Current exercise editing (for sets)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<
    number | null
  >(null);
  const [showSetForm, setShowSetForm] = useState<boolean>(false);

  // Set form data
  const [repetitions, setRepetitions] = useState<number>(8);
  const [weight, setWeight] = useState<number>(20);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const {
    time: setTimer,
    isRunning: isSetTimerRunning,
    startTimer: startSetTimer,
    pauseTimer: pauseSetTimer,
    resetTimer: resetSetTimer,
    formatTime: formatSetTime,
  } = useTimer();

  // Toggle activity timer
  const toggleActivityTimer = (): void => {
    if (isActivityTimerRunning) {
      pauseActivityTimer();
    } else {
      startActivityTimer();
    }
  };

  // Toggle set timer
  const toggleSetTimer = (): void => {
    if (isSetTimerRunning) {
      pauseSetTimer();
    } else {
      startSetTimer();
    }
  };

  // Add a new exercise
  const addExercise = (name: string): void => {
    if (!name.trim()) return;

    setExercises((prev) => [...prev, { name, sets: [] }]);
    setShowExerciseForm(false);
    setShowExercisesList(false);
    setNewExerciseName('');
  };

  // Add a new set to an exercise
  const addSet = (): void => {
    if (currentExerciseIndex === null) return;

    setExercises((prev) => {
      const updated = [...prev];
      updated[currentExerciseIndex].sets.push({
        reps: repetitions,
        weight: weight,
        unit: weightUnit,
        time: setTimer,
      });
      return updated;
    });

    setRepetitions(8);
    setWeight(20);
    resetSetTimer();
    setShowSetForm(false);
  };

  return (
    <div
      className={`min-h-screen pb-20 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <Header />

      {/* Activity Name and Timer */}
      <div
        className={`p-4 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm mb-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={activityName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setActivityName(e.target.value)
            }
            className={`text-xl font-semibold bg-transparent border-b ${
              darkMode
                ? 'border-gray-600 focus:border-blue-400 text-white'
                : 'border-gray-300 focus:border-blue-500'
            } focus:outline-none w-3/5`}
            placeholder="Activity Name"
          />
          <div className="flex items-center">
            <Clock
              size={16}
              className={`mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            />
            <span className="text-xl font-mono">{formatActivityTime()}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={toggleActivityTimer}
            className={`p-3 rounded-full shadow ${
              isActivityTimerRunning ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            {isActivityTimerRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>

      {/* Exercises List */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Exercises</h2>
          <button
            onClick={() => setShowExerciseForm(true)}
            className={`flex items-center gap-1 p-2 rounded-md ${
              darkMode
                ? 'bg-blue-900 text-blue-300'
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            <Plus size={18} /> Add Exercise
          </button>
        </div>

        {exercises.length > 0 ? (
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-sm p-4`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{exercise.name}</h3>
                  <button
                    onClick={() => {
                      setCurrentExerciseIndex(index);
                      setShowSetForm(true);
                    }}
                    className={`flex items-center gap-1 text-sm p-1 rounded ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    <Plus size={16} /> Add Set
                  </button>
                </div>

                {exercise.sets.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className={`text-left ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          <th className="pb-2">Set</th>
                          <th className="pb-2">Reps</th>
                          <th className="pb-2">Weight</th>
                          <th className="pb-2">Time</th>
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
                            <td className="py-2">
                              {`${Math.floor(set.time / 60)
                                .toString()
                                .padStart(2, '0')}:${(set.time % 60)
                                .toString()
                                .padStart(2, '0')}`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    } italic`}
                  >
                    No sets added yet
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            } rounded-lg p-6 text-center`}
          >
            <Dumbbell
              size={32}
              className={`mx-auto mb-2 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`}
            />
            <p className={darkMode ? 'text-gray-300' : 'text-gray-500'}>
              No exercises added yet
            </p>
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              Tap the &quot;Add Exercise&quot; button to begin
            </p>
          </div>
        )}
      </div>

      {/* Add Exercise Modal */}
      {showExerciseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg w-full max-w-md shadow-lg`}
          >
            <div
              className={`p-4 ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } border-b flex justify-between items-center`}
            >
              <h3 className="font-semibold">Add Exercise</h3>
              <button onClick={() => setShowExerciseForm(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}
                >
                  Exercise Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExerciseName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewExerciseName(e.target.value)
                    }
                    className={`w-full p-2 border rounded-md ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                    }`}
                    placeholder="e.g., Bench Press"
                  />
                  <button
                    onClick={() => setShowExercisesList(!showExercisesList)}
                    className={`p-2 border rounded-md ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    <ArrowLeft
                      size={20}
                      className={`transition-transform ${
                        showExercisesList ? 'rotate-90' : '-rotate-90'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {showExercisesList && (
                <div
                  className={`mb-4 max-h-48 overflow-y-auto border rounded-md ${
                    darkMode ? 'border-gray-700' : 'border-gray-300'
                  }`}
                >
                  <ul>
                    {presetExercises.map((exercise, index) => (
                      <li
                        key={index}
                        onClick={() => setNewExerciseName(exercise)}
                        className={`p-2 cursor-pointer ${
                          darkMode
                            ? 'hover:bg-gray-700 border-gray-700'
                            : 'hover:bg-gray-100 border-gray-200'
                        } border-b last:border-b-0`}
                      >
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowExerciseForm(false)}
                  className={`px-4 py-2 border rounded-md ${
                    darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => addExercise(newExerciseName)}
                  disabled={!newExerciseName.trim()}
                  className={`px-4 py-2 rounded-md text-white ${
                    newExerciseName.trim()
                      ? darkMode
                        ? 'bg-blue-700'
                        : 'bg-blue-600'
                      : darkMode
                      ? 'bg-blue-900 text-blue-300'
                      : 'bg-blue-300'
                  }`}
                >
                  Add Exercise
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Set Modal */}
      {showSetForm && currentExerciseIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-10">
          <div
            className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-t-lg w-full shadow-lg max-w-md`}
          >
            <div
              className={`p-4 ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } border-b flex justify-between items-center`}
            >
              <h3 className="font-semibold">
                Add Set: {exercises[currentExerciseIndex].name}
              </h3>
              <button onClick={() => setShowSetForm(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}
                >
                  Repetitions
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={repetitions}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRepetitions(parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <span className="w-8 text-center font-semibold">
                    {repetitions}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Weight
                  </label>
                  <div
                    className={`flex border rounded ${
                      darkMode ? 'border-gray-600' : 'border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => setWeightUnit('kg')}
                      className={`px-2 py-1 text-xs ${
                        weightUnit === 'kg'
                          ? darkMode
                            ? 'bg-blue-900 text-blue-300'
                            : 'bg-blue-100 text-blue-700'
                          : ''
                      }`}
                    >
                      kg
                    </button>
                    <button
                      onClick={() => setWeightUnit('lb')}
                      className={`px-2 py-1 text-xs ${
                        weightUnit === 'lb'
                          ? darkMode
                            ? 'bg-blue-900 text-blue-300'
                            : 'bg-blue-100 text-blue-700'
                          : ''
                      }`}
                    >
                      lb
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max={weightUnit === 'kg' ? '200' : '440'}
                    step="5"
                    value={weight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWeight(parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <span className="w-14 text-center font-semibold">
                    {weight} {weightUnit}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}
                >
                  Set Timer
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-mono">{formatSetTime()}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={resetSetTimer}
                      className={`p-2 rounded-full ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    >
                      <RotateCcw size={20} />
                    </button>
                    <button
                      onClick={toggleSetTimer}
                      className={`p-3 rounded-full shadow ${
                        isSetTimerRunning ? 'bg-red-500' : 'bg-green-500'
                      } text-white`}
                    >
                      {isSetTimerRunning ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`sticky bottom-0 py-4 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <button
                  onClick={addSet}
                  className={`w-full py-3 ${
                    darkMode ? 'bg-blue-700' : 'bg-blue-600'
                  } text-white rounded-lg flex items-center justify-center gap-2`}
                >
                  <Check size={20} /> Save Set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Button - Fixed to bottom right */}
      {!showSetForm && !showExerciseForm && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setShowExerciseForm(true)}
            className={`p-4 rounded-full shadow-lg ${
              darkMode ? 'bg-blue-700' : 'bg-blue-600'
            } text-white`}
          >
            <Plus size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FitnessTracker;
