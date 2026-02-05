import { useState } from 'react';
import { getWeather, fetchForecast } from './service/weatherService';
import type { Weather } from './types/Weather';
import type { Forecast } from './types/Forecast';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [error, setError] = useState('');

  async function handleSearch() {
    try {
      setError('');
      const data = await getWeather(city);
      setWeather(data);
      setForecast(null);
    } catch {
      setWeather(null);
      setError('Não foi possível buscar o clima. Verifique a cidade.');
    }
  }

  async function handleFetchForecast() {
    try {
      setError('');
      const data = await fetchForecast(city);
      setForecast(data);
    } catch {
      setForecast(null);
      setError('Não foi possível buscar a previsão. Verifique a cidade.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
        Sistema de Informações Climáticas 🌤️
      </h1>

      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Buscar Clima
          </button>

          <button
            onClick={handleFetchForecast}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Ver Previsão
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-8 w-full">
        {weather && <WeatherCard weather={weather} />}
        {forecast && <ForecastCard forecast={forecast} />}
      </div>
    </div>
  );
}

export default App;
