import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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

  const startPosition = [start_lat, start_long];
  const endPosition = [far_lat, far_long];

  // Function to generate a Google Maps URL for navigation
  const generateGoogleMapsUrl = () => {
    const origin = startPosition.join(",");
    const destination = endPosition.join(",");
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  };

  return (
    <div className="map">
      <h2>Start and End Points:</h2>
      <MapContainer
        center={startPosition}
        zoom={15}
        style={{ height: "60vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* Marker for Start Point */}
        <Marker position={startPosition}>
          <Popup>Start Point</Popup>
        </Marker>
        {/* Marker for End Point */}
        <Marker position={endPosition}>
          <Popup>End Point</Popup>
        </Marker>
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
