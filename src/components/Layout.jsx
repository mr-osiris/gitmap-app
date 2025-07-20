import React from 'react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-lg p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-4xl font-extrabold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
            GitMap
          </Link>
          <div className="flex-grow max-w-lg mx-auto md:mx-0">
            <SearchBar />
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/compare"
              className="px-5 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-opacity-75 transition-all duration-200 text-lg font-medium shadow-md hover:shadow-lg"
            >
              Compare Profiles
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;