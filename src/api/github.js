import axios from 'axios';

const GITHUB_REST_API_BASE_URL = 'https://api.github.com';
const GITHUB_GRAPHQL_API_URL = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN; // Loaded from .env.local or Codespace secrets

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  'Content-Type': 'application/json',
};

// --- REST API Calls ---

export const fetchUserRest = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_REST_API_BASE_URL}/users/${username}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user (REST):', error);
    throw error;
  }
};

export const fetchUserReposRest = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_REST_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=100`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching user repos (REST):', error);
    throw error;
  }
};

export const fetchRepoCommitsRest = async (owner, repoName) => {
  try {
    // This fetches commit activity for a year, grouped by week.
    // GitHub API can be slow for this, consider GraphQL for more specific data if needed.
    const response = await axios.get(`${GITHUB_REST_API_BASE_URL}/repos/${owner}/${repoName}/stats/commit_activity`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for ${owner}/${repoName} (REST):`, error);
    return null; // Return null if there's an error for a specific repo
  }
};

export const fetchOrgContributorsRest = async (orgName, repoName) => {
    try {
        const response = await axios.get(`${GITHUB_REST_API_BASE_URL}/repos/${orgName}/${repoName}/contributors?per_page=100`, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error fetching contributors for organization repo (REST):`, error);
        throw error;
    }
};


// --- GraphQL API Calls ---

export const fetchUserAndContributionsGraphQL = async (username) => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        avatarUrl
        name
        bio
        location
        followers {
          totalCount
        }
        following {
          totalCount
        }
        createdAt
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      GITHUB_GRAPHQL_API_URL,
      { query, variables: { username } },
      { headers }
    );
    if (response.data.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      throw new Error(response.data.errors[0].message || 'GraphQL API error');
    }
    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching user (GraphQL):', error);
    throw error;
  }
};

export const fetchUserComparisonGraphQL = async (username1, username2) => {
  const query = `
    query($username1: String!, $username2: String!) {
      user1: user(login: $username1) {
        name
        followers { totalCount }
        repositories(first: 0) { totalCount } # To get total repo count without fetching repos
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
      user2: user(login: $username2) {
        name
        followers { totalCount }
        repositories(first: 0) { totalCount }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      GITHUB_GRAPHQL_API_URL,
      { query, variables: { username1, username2 } },
      { headers }
    );
    if (response.data.errors) {
      console.error('GraphQL Errors (comparison):', response.data.errors);
      throw new Error(response.data.errors[0].message || 'GraphQL API error');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user comparison (GraphQL):', error);
    throw error;
  }
};