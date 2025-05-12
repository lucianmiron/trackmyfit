/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
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
        <p className="font-medium mb-1">
          {new Date(label).toLocaleDateString('default', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        {payload.map(
          (entry: any, index: any) =>
            entry.value !== null && (
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
            )
        )}
      </div>
    );
  }
  return null;
};

// Get a color for each exercise
export const getColorForIndex = (index: any) => {
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

export default function PerformanceChart({
  exercisePerformances,
  darkMode,
  showPercentage,
}: any) {
  // Get all chart data
  const getAllPerformanceData = () => {
    if (!exercisePerformances || exercisePerformances.length === 0) return [];

    // Find all unique dates across all exercises
    const allDates = new Set();
    exercisePerformances.forEach((exercise: any) => {
      exercise.data.forEach((point: any) => {
        if (point.date) allDates.add(point.date);
      });
    });

    // Sort dates chronologically
    const sortedDates = Array.from(allDates).sort(
      (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime()
    );

    // Create data points for all dates
    return sortedDates.map((date: any) => {
      const dataPoint: { [key: string]: any; date: string } = { date };

      // Add data for each exercise
      exercisePerformances.forEach((exercise: any) => {
        // Find the data point for this date
        const point = exercise.data.find((p: any) => p.date === date);

        // Use the appropriate value based on display mode
        if (point) {
          dataPoint[exercise.name] = showPercentage
            ? point.percentageChange
            : point.performance;
        } else {
          // If no data point exists for this date, use null to create a gap in the chart
          dataPoint[exercise.name] = null;
        }
      });

      return dataPoint;
    });
  };

  const chartData = getAllPerformanceData();

  // Format date for x-axis ticks
  const formatXAxisTick = (value: any) => {
    // Convert to Date object if it's a string
    const date = typeof value === 'string' ? new Date(value) : value;
    // Format date to shorter version for x-axis
    return date.toLocaleDateString('default', {
      month: 'numeric',
      day: 'numeric',
    });
  };

  if (exercisePerformances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className={`mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18"></path>
            <path d="m19 9-5 5-4-4-3 3"></path>
          </svg>
        </div>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
          No performance data available for this activity.
        </p>
        <p
          className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
        >
          Try selecting a different activity or record more workouts.
        </p>
      </div>
    );
  }

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? '#444' : '#eee'}
          />
          <XAxis
            dataKey="date"
            stroke={darkMode ? '#aaa' : '#666'}
            tickFormatter={formatXAxisTick}
          />
          <YAxis
            stroke={darkMode ? '#aaa' : '#666'}
            label={{
              value: showPercentage ? 'Change (%)' : 'Performance Score',
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
          />
          <Legend />

          {exercisePerformances.map((exercise: any, index: any) => (
            <Line
              key={exercise.name}
              type="monotone"
              dataKey={exercise.name}
              stroke={getColorForIndex(index)}
              activeDot={{ r: 6 }}
              strokeWidth={2.5}
              connectNulls={false}
              dot={{
                strokeWidth: 2,
                r: 5,
                fill: darkMode ? '#111827' : '#fff',
                stroke: getColorForIndex(index),
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
