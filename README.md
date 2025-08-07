# GitMap: A GitHub Explorer Web Application

GitMap is a modern web application designed to explore GitHub user and organization profiles with key insights and data visualizations. Built with a contemporary tech stack, it provides a clean and functional interface for understanding GitHub activity.

# Features
GitMap allows you to:

-Search GitHub Profiles: Input any GitHub username to fetch and display their public profile information.

-Core Profile Details: View user avatar, name, bio, location, follower/following counts, and join date.

-Public Repository Listing: See a list of the user's public repositories, complete with star and fork counts.

-Contribution Timeline: Visualize a user's last year of contributions (weekly/monthly aggregation) using interactive charts.

-Repository Growth Chart: Track the total commit activity across a user's public repositories over time.

-Organization Contributor Map: If the profile belongs to an organization, fetch and display the geolocations of its public contributors on an interactive map. (Note: Geolocation data is mocked for demonstration  purposes; a real-world application would integrate with a geocoding service.)

-Profile Comparison: Compare key metrics (contributions, repo activity, followers) of two GitHub profiles side-by-side.

-Dark/Light Theme Toggle: Switch between dark and light modes, with your preference saved locally in your browser.

-Robust Error Handling: Custom messages for invalid usernames (404), API rate limits, and other unexpected errors.

# Tech Stack
GitMap is built using the following modern web technologies:

-Frontend Framework: React (with Functional Components and Hooks)

-Styling: TailwindCSS for utility-first, responsive design.

API Interaction:

-GitHub REST API

-GitHub GraphQL API (for richer data like contribution calendar)

-Axios for HTTP requests

-Data Visualization: Chart.js and react-chartjs-2 for dynamic charts.

-Geolocation Mapping: Leaflet.js and react-leaflet for interactive maps.

Routing: React Router for seamless page navigation.

-State & Persistence: LocalStorage for saving user preferences (e.g., theme).

-Date Management: date-fns for easy date formatting and calculations.

# Dark mode
<img width="1079" height="1768" alt="Screenshot 2025-07-20 234612" src="https://github.com/user-attachments/assets/a5cc5211-1f8d-4c80-8d38-60a740f521c4" />
<img width="1047" height="1475" alt="Screenshot 2025-07-20 234425" src="https://github.com/user-attachments/assets/e2c26a73-6aca-4c4c-b037-1c6febc7f305" />
<img width="1078" height="1771" alt="Screenshot 2025-07-20 234407" src="https://github.com/user-attachments/assets/b6661b92-6075-4b2c-b70b-bf1902d4729c" />

#Light mode
<img width="1079" height="1769" alt="Screenshot 2025-07-20 234444" src="https://github.com/user-attachments/assets/cc5ee176-8161-4887-abfe-c0fabc6e7372" />
<img width="1058" height="1491" alt="Screenshot 2025-07-20 234457" src="https://github.com/user-attachments/assets/c8889013-4ab3-4abb-84d8-c229253f63e6" />
<img width="1079" height="1770" alt="Screenshot 2025-07-20 234555" src="https://github.com/user-attachments/assets/5a617050-c411-4f90-91eb-10fb5e0a4422" />




