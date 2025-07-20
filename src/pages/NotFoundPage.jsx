import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center p-4">
      <h1 className="text-7xl font-extrabold text-primary-600 dark:text-primary-400 mb-4 animate-bounceIn">404</h1>
      <p className="text-4xl font-semibold mb-6 animate-fadeIn delay-100">Page Not Found</p>
      <p className="text-lg text-center max-w-md mb-8 animate-fadeIn delay-200">
        The page you are looking for does not exist or an invalid GitHub username was entered.
      </p>
      <Link
        to="/"
        className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300 ease-in-out text-xl font-medium shadow-md hover:shadow-lg animate-fadeInUp delay-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;