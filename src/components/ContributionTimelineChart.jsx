import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format, subYears } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContributionTimelineChart = ({ contributionWeeks }) => {
  if (!contributionWeeks || contributionWeeks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 animate-fadeInUp delay-300">
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contribution Timeline</h3>
        <p className="text-gray-700 dark:text-gray-300">No contribution data available for the last year.</p>
      </div>
    );
  }

  const allContributionDays = contributionWeeks.flatMap(week => week.contributionDays);

  const oneYearAgo = subYears(new Date(), 1);
  const filteredContributions = allContributionDays.filter(day => new Date(day.date) >= oneYearAgo);

  const aggregatedContributions = {};
  filteredContributions.forEach(day => {
    const monthYear = format(new Date(day.date), 'yyyy-MM');
    if (!aggregatedContributions[monthYear]) {
      aggregatedContributions[monthYear] = 0;
    }
    aggregatedContributions[monthYear] += day.contributionCount;
  });

  const labels = Object.keys(aggregatedContributions).sort();
  const dataPoints = labels.map(label => aggregatedContributions[label]);

  const chartData = {
    labels: labels.map(label => format(new Date(label), 'MMM yyyy')),
    datasets: [
      {
        label: 'Total Contributions',
        data: dataPoints,
        borderColor: '#3b82f6', // primary-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // primary-500 with transparency
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to control their height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(107, 114, 128)', // Tailwind gray-500
        },
      },
      title: {
        display: true,
        text: 'Total Contributions in Last Year (Monthly Aggregation)',
        color: 'rgb(75, 85, 99)', // Tailwind gray-600
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          title: (tooltipItems) => {
            const date = new Date(labels[tooltipItems[0].dataIndex]);
            return format(date, 'MMM yyyy');
          },
          label: (context) => `Contributions: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)', // Light grid lines
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(107, 114, 128)', // Tailwind gray-500
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 animate-fadeInUp delay-300">
      <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contribution Timeline</h3>
      <div className="relative h-80"> {/* Set a fixed height for the chart container */}
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ContributionTimelineChart;