// src/components/GeoMapContributors.jsx
import React, { useEffect, useState } from 'react'; // This is the correct first import
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LoadingSpinner from './LoadingSpinner'; // Assuming you have this
import ErrorMessage from './ErrorMessage';   // Assuming you have this

// Fix default icon issues with Webpack/React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const mockGeocode = async (location) => {
    // ... (Your mockGeocode function code)
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay
    switch (location?.toLowerCase()) {
      case 'san francisco, ca': return { lat: 37.7749, lng: -122.4194 };
      case 'new york': return { lat: 40.7128, lng: -74.0060 };
      case 'london': return { lat: 51.5074, lng: -0.1278 };
      case 'berlin': return { lat: 52.5200, lng: 13.4050 };
      case 'tokyo': return { lat: 35.6895, lng: 139.6917 };
      default: return null;
    }
};

const GeoMapContributors = ({ orgName, contributors, fetchOrgContributors }) => {
  const [targetRepo, setTargetRepo] = useState('');
  const [geocodedContributors, setGeocodedContributors] = useState([]);
  const [loadingGeocode, setLoadingGeocode] = useState(false);
  const [geocodeError, setGeocodeError] = useState(null);

  useEffect(() => {
    const processContributors = async () => {
      setLoadingGeocode(true);
      setGeocodeError(null);
      const geocoded = [];
      for (const contributor of contributors) {
        if (contributor.location) {
          try {
            const coords = await mockGeocode(contributor.location);
            if (coords) {
              geocoded.push({ ...contributor, coordinates: [coords.lat, coords.lng] });
            }
          } catch (err) {
            console.error("Geocoding error:", err);
            setGeocodeError("Failed to geocode some locations.");
          }
        }
      }
      setGeocodedContributors(geocoded);
      setLoadingGeocode(false);
    };

    if (contributors && contributors.length > 0) {
      processContributors();
    } else {
      setGeocodedContributors([]);
    }
  }, [contributors]);

  const handleFetchContributors = () => {
    if (orgName && targetRepo) {
      fetchOrgContributors(orgName, targetRepo);
    }
  };

  if (!orgName) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Organization Contributors Map</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {`This feature is available for organizations. Enter a public repository name from `}
        <span className="font-semibold text-blue-600 dark:text-blue-400">{orgName}</span>
        {` to see its contributors' locations.`}
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a public repo name (e.g., react)"
          value={targetRepo}
          onChange={(e) => setTargetRepo(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleFetchContributors}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fetch Contributors
        </button>
      </div>

      {loadingGeocode && <LoadingSpinner />}
      {geocodeError && <ErrorMessage message={geocodeError} />}

      {geocodedContributors.length > 0 ? (
        <div className="h-96 w-full">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={true}
            className="w-full h-full rounded-md"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geocodedContributors.map((contributor) => (
              contributor.coordinates && (
                <Marker key={contributor.id} position={contributor.coordinates}>
                  <Popup>
                    <a href={contributor.html_url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400">
                      {contributor.login}
                    </a>
                    <br />
                    Location: {contributor.location}
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          {targetRepo ? "No geocodable contributor locations found for this repository, or try another repo." : "Enter a repository name to fetch contributors and map their locations."}
        </p>
      )}
    </div>
  );
};

export default GeoMapContributors;