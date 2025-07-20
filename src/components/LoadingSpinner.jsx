import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500 dark:border-primary-400 mb-4"></div>
      <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">Fetching GitHub data...</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This might take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;