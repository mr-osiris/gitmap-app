import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGitHubApi } from '../hooks/useGitHubApi';
import ProfileCard from '../components/ProfileCard';
import RepoList from '../components/RepoList';
import ContributionTimelineChart from '../components/ContributionTimelineChart';
import RepoGrowthTimelineChart from '../components/RepoGrowthTimelineChart';
import GeoMapContributors from '../components/GeoMapContributors';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const { username } = useParams();
  const {
    userData,
    reposData,
    contributionsData,
    repoCommitsData,
    orgContributors,
    loading,
    error,
    isOrganization,
    fetchOrgContributors,
  } = useGitHubApi(username);

  // No need for an empty useEffect here, useGitHubApi already handles fetching on username change.

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    const isNotFound = error.response && error.response.status === 404;
    const isRateLimited = error.response && error.response.status === 403;

    const errorMessage = isNotFound
      ? "User not found. Please check the username and try again."
      : isRateLimited
        ? "GitHub API rate limit exceeded. Please wait a bit and try again, or consider setting up a Personal Access Token for higher limits."
        : (error.message || "An unexpected error occurred. Please try again.");

    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900">
        <ErrorMessage message={errorMessage} />
      </div>
    );
  }

  if (!userData && !username) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 text-center px-4">
        <p className="text-2xl text-gray-700 dark:text-gray-300 animate-fadeIn">
          Welcome to GitMap! <br/> Enter a GitHub username in the search bar above to explore their profile.
        </p>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 px-4 sm:px-6 lg:px-8">
      <div className="lg:col-span-1">
        <ProfileCard user={userData} />
      </div>
      <div className="lg:col-span-2 space-y-8">
        <RepoList repos={reposData} />
        {contributionsData && <ContributionTimelineChart contributionWeeks={contributionsData} />}
        {repoCommitsData && <RepoGrowthTimelineChart repoCommitsData={repoCommitsData} />}
        {isOrganization && (
          <GeoMapContributors
            orgName={userData.login}
            contributors={orgContributors}
            fetchOrgContributors={fetchOrgContributors}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;