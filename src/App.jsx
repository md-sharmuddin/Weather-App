import React, { useState } from "react";


import "./App.css";
import SearchBar from "./Components/SearchBar";
import WeatherCard from "./Components/WeatherCard";

function App() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      // Geocoding API (get lat & lon from city)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        alert("City not found!");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      // Weather API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: geoData.results[0].name,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        condition: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather Now By SAM</h1>
      <h6>SAM wants to check the current weather conditions quickly for any city.</h6>
      <SearchBar onSearch={fetchWeather} />
     {weather &&<WeatherCard data={weather}d/>}
    </div>
  );
}

export default App;

