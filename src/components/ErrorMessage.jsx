import React from 'react';
import { Link } from 'react-router-dom';

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-center p-8 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-xl shadow-lg animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h2>
      <p className="mb-6 text-lg">{message}</p>
      <Link to="/" className="text-primary-600 hover:underline dark:text-primary-400 text-lg font-medium">
        Go back to search
      </Link>
    </div>
  );
};

export default ErrorMessage;