const express = require("express");
const cors = require('cors');

require("dotenv").config();
const app = express();
app.use(cors());
const PORT = 5000
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  //validation
  if (!city) {
    return res.status(400).json({
      error: "City is required",
    });
  }
  if (city.trim().length === 0) {
    return res.status(400).json({
      error: "City name cannot be empty",
    });
  }
  if (city.length > 100) {
    return res.status(400).json({
      error: "City name too long",
    });
  }
  ///geocoding
  try {
    const geoResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = await geoResponse.json();
    if ((Array.isArray(data) && data.length === 0) || !data) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lon } = data[0];
    ///fetching weather data
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const weatherData = await weatherRes.json();
    return res.status(200).json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].main,
      humidity: weatherData.main.humidity,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app