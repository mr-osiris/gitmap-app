import { useState, useEffect, useCallback } from 'react';
import {
  fetchUserRest,
  fetchUserReposRest,
  fetchUserAndContributionsGraphQL,
  fetchRepoCommitsRest,
  fetchOrgContributorsRest,
  fetchUserComparisonGraphQL
} from '../api/github';

export const useGitHubApi = (username) => {
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [contributionsData, setContributionsData] = useState(null);
  const [repoCommitsData, setRepoCommitsData] = useState({});
  const [orgContributors, setOrgContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOrganization, setIsOrganization] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!username) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await fetchUserAndContributionsGraphQL(username);
      setUserData(user);

      // Determine if it's an organization
      const restUser = await fetchUserRest(username); // Fetching again for type (User/Organization)
      setIsOrganization(restUser.type === 'Organization');

      const repos = await fetchUserReposRest(username);
      setReposData(repos);

      const commitActivities = {};
      for (const repo of repos) {
        if (!repo.fork) { // Exclude forks for more relevant data
            const commits = await fetchRepoCommitsRest(username, repo.name);
            if (commits) {
                commitActivities[repo.name] = commits;
            }
        }
      }
      setRepoCommitsData(commitActivities);

    } catch (err) {
      console.error("Failed to fetch GitHub data:", err);
      setError(err);
      setUserData(null);
      setReposData([]);
      setContributionsData(null);
      setRepoCommitsData({});
      setIsOrganization(false);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    userData,
    reposData,
    contributionsData: userData?.contributionsCollection?.contributionCalendar?.weeks || null,
    repoCommitsData,
    orgContributors,
    loading,
    error,
    isOrganization,
    fetchOrgContributors: async (orgName, repoName) => {
        try {
            const contributors = await fetchOrgContributorsRest(orgName, repoName);
            setOrgContributors(contributors);
        } catch (err) {
            console.error("Failed to fetch organization contributors:", err);
            setOrgContributors([]);
        }
    },
    compareUsers: async (user1, user2) => {
        try {
            const comparisonData = await fetchUserComparisonGraphQL(user1, user2);
            return comparisonData;
        } catch (err) {
            console.error("Failed to compare users:", err);
            throw err;
        }
    }
  };
};