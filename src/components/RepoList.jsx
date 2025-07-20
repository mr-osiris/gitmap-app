import React from 'react';

const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 animate-fadeInUp delay-200">
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Public Repositories</h3>
        <p className="text-gray-700 dark:text-gray-300">No public repositories found for this user.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 animate-fadeInUp delay-200">
      <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Public Repositories ({repos.length})</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.slice(0, 10).map((repo) => ( // Show top 10 for brevity, consider pagination for more
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group relative overflow-hidden shadow-sm hover:shadow-md"
          >
            <h4 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2 truncate group-hover:underline">
              {repo.name}
            </h4>
            {repo.description && (
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                {repo.description}
              </p>
            )}
            <div className="flex justify-between items-center text-sm mt-3 text-gray-600 dark:text-gray-400 font-medium">
              <span className="flex items-center gap-1">
                ⭐️ {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                🍴 {repo.forks_count}
              </span>
            </div>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RepoList;