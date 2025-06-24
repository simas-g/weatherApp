import { useRef, useState } from "react";
import "./App.css";
import WeatherData from "../../src/components/WeatherData";
export default function App() {
  const city = useRef("");
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const handleSubmit = async (e) => {
    const cityName = city.current.value.trim();
    if (cityName === "") {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    } else {
      setError(null);
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/weather?city=${cityName}`
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(
          data.error || "An error occurred while fetching the weather data."
        );
        setWeatherData(null);
      } else {
        setWeatherData({
          city: data.city,
          temperature: data.temperature,
          humidity: data.humidity,
          condition: data.condition,
        });
        setError(null);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.", error);
      setWeatherData(null);
    }
  };
  return (
    <main
      className="main-container"
      style={{
        transform: "translateY(10%)",
      }}
    >
      <div className="app-container">
        <h1>Weather app</h1>
        <p>Enter a city to get the current weather.</p>
        <div className="input-container">
          <input ref={city}></input>
          <button onClick={handleSubmit}>Search</button>
        </div>
        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "semi-bold",
              marginTop: "10px",
            }}
          >
            {error}
          </p>
        )}
        {weatherData && (
          <WeatherData
            city={weatherData.city}
            temperature={weatherData.temperature}
            humidity={weatherData.humidity}
            condition={weatherData.condition}
          />
        )}
      </div>
    </main>
  );
}
