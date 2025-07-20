// src/components/RepoGrowthTimelineChart.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format, parseISO } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RepoGrowthTimelineChart = ({ repoCommitsData }) => {
  if (!repoCommitsData || Object.keys(repoCommitsData).length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Repository Commit Growth</h3>
        <p className="text-gray-700 dark:text-gray-300">No repository commit data available.</p>
      </div>
    );
  }

  // Aggregate total commits per week across all repos
  const weeklyCommits = {};

  Object.values(repoCommitsData).forEach(repoActivity => {
    // --- FIX STARTS HERE ---
    // Ensure repoActivity is an array before calling forEach
    if (Array.isArray(repoActivity)) {
      repoActivity.forEach(week => {
        const weekStart = format(new Date(week.week * 1000), 'yyyy-MM-dd'); // Convert Unix timestamp to date string
        if (!weeklyCommits[weekStart]) {
          weeklyCommits[weekStart] = 0;
        }
        weeklyCommits[weekStart] += week.total;
      });
    }
    // --- FIX ENDS HERE ---
  });

  const sortedWeeks = Object.keys(weeklyCommits).sort();
  const labels = sortedWeeks.map(week => format(parseISO(week), 'MMM dd, yy'));
  const dataPoints = sortedWeeks.map(week => weeklyCommits[week]);

  // ... rest of your component code ...
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Commits Across All Repos (Weekly)',
        data: dataPoints,
        backgroundColor: '#10b981', // Tailwind emerald-500
        borderColor: '#059669', // Tailwind emerald-600
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(156, 163, 175)',
        },
      },
      title: {
        display: true,
        text: 'Total Commits Across Public Repositories (Last Year, Weekly)',
        color: 'rgb(156, 163, 175)',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Repository Commit Growth</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RepoGrowthTimelineChart;