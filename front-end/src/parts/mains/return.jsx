import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Polyline } from "react-leaflet";
// import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";

const Return = () => {
  const position = [37.779026, -122.419906];
  const routeCoordinates = [
    [37.779026, -122.419906], // Starting point
    [37.7749, -122.4194], // Waypoint 1
    [37.7737, -122.4216], // Waypoint 2
    [37.7749, -122.4325], // Ending point
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
