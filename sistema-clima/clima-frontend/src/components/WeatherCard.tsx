import type { Weather } from "../types/Weather";

type WeatherCardProps = {
  weather: Weather;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-section" style={{ textAlign: "center" }}>
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <p style={{
        fontSize: "50px",
        fontWeight: "bold",
        margin: "20px 0"
      }}>{weather.temperature}°C</p>

      <div style={{ fontSize: "4rem", marginTop: "15px" }}>
        <img src={weather.icon} alt={weather.condition} style={{ width: "120px", height: "120px" }} />
      </div>

      <p>Sensação térmica: {weather.feelsLike}°C</p>
      <p>Condição: {weather.condition}</p>
      <p>Umidade: {weather.humidity}%</p>
      <p>Vento: {weather.windSpeed} km/h</p>
    </div>
  );
}
