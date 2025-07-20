import React from 'react';
import { format } from 'date-fns';

const ProfileCard = ({ user }) => {
  if (!user) return null;

  const joinDate = user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : 'N/A';

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 flex flex-col items-center animate-fadeInUp delay-100">
      <img
        src={user.avatarUrl}
        alt={`${user.name || user.login}'s avatar`}
        className="w-36 h-36 rounded-full mb-6 border-4 border-primary-500 dark:border-primary-400 shadow-md transform hover:scale-105 transition-transform duration-300"
      />
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
        {user.name || user.login}
      </h2>
      {user.login && user.name && (
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium mb-4">@{user.login}</p>
      )}
      {user.bio && (
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-center max-w-md text-base leading-relaxed">
          {user.bio}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full max-w-md">
        <div className="text-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{user.followers?.totalCount || 0}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Followers</p>
        </div>
        <div className="text-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{user.following?.totalCount || 0}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Following</p>
        </div>
        <div className="text-center col-span-1 sm:col-span-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Location:</span> {user.location || 'Not specified'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Joined:</span> {joinDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;