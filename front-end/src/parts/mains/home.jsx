import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [difficulty, setDifficulty] = useState("Easy");
  const [duration, setDuration] = useState(20);
  const [location, setLocation] = useState("");
  // eslint-disable-next-line
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleDifficultyChange = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);

    const difficultyLimits = {
      Easy: { min: 20, max: 45 },
      Medium: { min: 30, max: 60 },
      Hard: { min: 45, max: 90 },
    };

    setDuration(
      Math.min(
        Math.max(duration, difficultyLimits[selectedDifficulty].min),
        difficultyLimits[selectedDifficulty].max,
      ),
    );
  };

  const handleDurationChange = (increment) => {
    const difficultyLimits = {
      Easy: { min: 20, max: 45 },
      Medium: { min: 30, max: 60 },
      Hard: { min: 45, max: 90 },
    };

    const newDuration = Math.min(
      Math.max(duration + increment, difficultyLimits[difficulty].min),
      difficultyLimits[difficulty].max,
    );
    setDuration(newDuration);
  };

  const difficultyContent = {
    Easy: ["20 to 45 minutes", "No highways", "Safest routes"],
    Medium: ["30 to 60 minutes", "No highways", "Safer routes"],
    Hard: ["45 to 90 minutes", "Include highways", "Safe routes"],
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation(`${latitude}, ${longitude}`);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
    );
  };

  const handleGeocodeAddress = async () => {
    const accessToken =
      "pk.eyJ1IjoiZ2pvaG5zMjUiLCJhIjoiY2xvdXY5NXMxMGV5ejJqbDNpdzRkMnJhdSJ9.SJVBoPjY5lYZ6zyxBTNQsQ";
    const address = location;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address,
        )}.json?access_token=${accessToken}`,
      );

      if (!response.ok) {
        throw new Error("Failed to geocode address");
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const result = data.features[0];

        if (result.geometry && result.geometry.coordinates) {
          const [longitude, latitude] = result.geometry.coordinates;
          setLocation(`${latitude}, ${longitude}`);
        } else {
          console.error(
            "Invalid response format - missing geometry or coordinates",
          );
        }
      } else {
        console.error("No results found for the given address");
      }
    } catch (error) {
      console.error("Error geocoding address:", error.message);
    }
  };

  const handleStartPractice = async (e) => {
    e.preventDefault();

    const formElements = Array.from(e.target.elements);

    const newFormData = formElements.reduce((data, element) => {
      if (element.name) {
        if (element.type === "radio") {
          if (element.checked) {
            data[element.name] = element.value;
          }
        } else {
          data[element.name] = element.value;
        }
      }
      return data;
    }, {});

    // Store the form data in the state
    setFormData(newFormData);

    const apiEndpoint = `http://127.0.0.1:5000/getHighwayRoutes?start_lat=${encodeURIComponent(
      location.split(",")[0],
    )}&start_long=${encodeURIComponent(location.split(",")[1])}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the response from the Flask API if needed
      console.log("API Response:", data);

      // Pass the response data as state to the Return component
      navigate("/return", { state: { routeData: data } });

      // Log the form data as JSON
      console.log("Form Data:", JSON.stringify(newFormData));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form className="App" method="GET" onSubmit={handleStartPractice}>
      <h2>Practice time:</h2>
      <div className="timer">
        <button type="button" onClick={() => handleDurationChange(-5)}>
          -
        </button>
        <input type="number" name="time" readOnly value={duration} />
        min
        <button type="button" onClick={() => handleDurationChange(5)}>
          +
        </button>
      </div>
      <h2>Difficulty:</h2>
      <input
        type="radio"
        name="highways"
        value="false"
        checked={difficulty === "Easy" || difficulty === "Medium"}
        readOnly
      />
      <input
        type="radio"
        name="highways"
        value="true"
        checked={difficulty === "Hard"}
        readOnly
      />
      <div className="difficulty">
        <button
          type="button"
          onClick={() => handleDifficultyChange("Easy")}
          className={difficulty === "Easy" ? "active" : ""}
        >
          Easy
        </button>
        <button
          type="button"
          onClick={() => handleDifficultyChange("Medium")}
          className={difficulty === "Medium" ? "active" : ""}
        >
          Medium
        </button>
        <button
          type="button"
          onClick={() => handleDifficultyChange("Hard")}
          className={difficulty === "Hard" ? "active" : ""}
        >
          Hard
        </button>
        <ul>
          {difficultyContent[difficulty].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <h2>Location</h2>
      <div className="location">
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="button" onClick={handleGetLocation}>
          Use Current Location
        </button>
        <button type="button" onClick={handleGeocodeAddress}>
          Geocode an Address
        </button>
      </div>
      <button type="submit" className="submit">
        Start Practice
      </button>
    </form>
  );
};

export default Home;
