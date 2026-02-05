import type { Weather } from '../types/Weather';

interface WeatherCardProps {
  weather: Weather;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-2">
        {weather.city}, {weather.country}
      </h2>

      <p className="text-5xl font-semibold mb-4">{weather.temperature}°C</p>

      <p className="text-gray-700 mb-1">
        Sensação térmica: {weather.feelsLike}°C
      </p>
      <p className="text-gray-700 mb-1">Condição: {weather.condition}</p>
      <p className="text-gray-700 mb-1">Umidade: {weather.humidity}%</p>
      <p className="text-gray-700">Vento: {weather.windSpeed} km/h</p>
    </div>
  );
}
