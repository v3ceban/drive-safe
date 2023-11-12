import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";

const Return = () => {
  const location = useLocation();
  const routeData = location.state && location.state.routeData;

  // Check if routeData is available
  if (!routeData) {
    // Handle the case where routeData is not available
    return <div>No route data available.</div>;
  }

  const { start_lat, start_long, far_lat, far_long } = routeData;

  const position = [start_lat, start_long];
  const routeCoordinates = [
    [start_lat, start_long], // Starting point
    [far_lat, far_long], // Waypoint 1
    [start_lat, start_long], // Ending point
  ];

  // Function to generate a Google Maps URL for navigation
  const generateGoogleMapsUrl = () => {
    const origin = routeCoordinates[0].join(",");
    const destination = routeCoordinates[routeCoordinates.length - 1].join(",");
    const waypoints = routeCoordinates
      .slice(1, -1)
      .map((coord) => coord.join(","))
      .join("|");

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving&waypoints=${waypoints}`;
  };

  return (
    <div className="map">
      <h2>Here&apos;s your route:</h2>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "60vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Polyline positions={routeCoordinates} color="#1e1e2e" />
      </MapContainer>
      <a
        className="button"
        href={generateGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        Let&apos;s Go!
      </a>
    </div>
  );
};
export default Return;
