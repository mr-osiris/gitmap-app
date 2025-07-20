import React, { useState } from 'react';
import { useGitHubApi } from '../hooks/useGitHubApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { format } from 'date-fns'; // For consistent date formatting

const StatItem = ({ label, value }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{value}</p>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
  </div>
);

const CompareProfiles = () => {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { compareUsers } = useGitHubApi(); // Just need the function from the hook

  const handleCompare = async () => {
    if (!username1.trim() || !username2.trim()) {
      setError("Please enter both usernames for comparison.");
      return;
    }

    setLoading(true);
    setError(null);
    setComparisonResult(null);

    try {
      const data = await compareUsers(username1.trim(), username2.trim());
      setComparisonResult(data);
    } catch (err) {
      console.error("Error comparing profiles:", err);
      // More specific error handling for API limits or not found
      if (err.response && err.response.status === 404) {
        setError("One or both usernames not found. Please check them.");
      } else if (err.response && err.response.status === 403) {
         setError("GitHub API rate limit exceeded. Please wait a bit and try again, or ensure you have a valid Personal Access Token configured.");
      } else {
        setError("Could not compare profiles. An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-80px)]"> {/* Adjusted height */}
      <div className="max-w-6xl mx-auto animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
          Compare GitHub Profiles
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto animate-fadeInUp delay-100">
          <input
            type="text"
            placeholder="Username 1"
            value={username1}
            onChange={(e) => setUsername1(e.target.value)}
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
          />
          <input
            type="text"
            placeholder="Username 2"
            value={username2}
            onChange={(e) => setUsername2(e.target.value)}
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 dark:bg-gray-700 dark:text-white shadow-sm transition-all duration-200"
          />
          <button
            onClick={handleCompare}
            className="px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-opacity-75 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Comparing...
              </span>
            ) : 'Compare'}
          </button>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {comparisonResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 animate-fadeInUp delay-200">
            {/* User 1 Data */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                {comparisonResult.user1?.name || username1}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <StatItem label="Followers" value={comparisonResult.user1?.followers?.totalCount || 'N/A'} />
                <StatItem label="Public Repos" value={comparisonResult.user1?.repositories?.totalCount || 'N/A'} />
                <StatItem label="Total Contributions (Last Year)" value={comparisonResult.user1?.contributionsCollection?.contributionCalendar?.totalContributions || 'N/A'} />
                {/* You can add more stats here */}
              </div>
            </div>

            {/* User 2 Data */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                {comparisonResult.user2?.name || username2}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <StatItem label="Followers" value={comparisonResult.user2?.followers?.totalCount || 'N/A'} />
                <StatItem label="Public Repos" value={comparisonResult.user2?.repositories?.totalCount || 'N/A'} />
                <StatItem label="Total Contributions (Last Year)" value={comparisonResult.user2?.contributionsCollection?.contributionCalendar?.totalContributions || 'N/A'} />
                {/* You can add more stats here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareProfiles;