import React from 'react'

function WeatherCard({data}) {
  return (
   <div className="weather-card">
      <h2>{data.city}</h2>
      <p>🌡️ Temperature: {data.temp} °C</p>
      <p>💨 Wind Speed: {data.wind} km/h</p>
      <p>🌍 Condition Code: {data.condition}</p>
    </div>
  )
}

export default WeatherCard;