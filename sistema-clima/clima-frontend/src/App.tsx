import { useState } from 'react';
import { getWeather } from './service/weatherService';
import { type Weather } from './types/Weather';
import { type Forecast } from './types/Forecast';
import { fetchForecast } from './service/weatherService';

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
    <div style={{ padding: 20 }}>
      <h1>Sistema de Informações Climáticas</h1>

      <input
        type="text"
        placeholder="Digite o nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: 20 }}>
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <p>Temperatura: {weather.temperature} °C</p>
          <p>Sensação térmica: {weather.feelsLike} °C</p>
          <p>Condição: {weather.condition}</p>
          <p>Umidade: {weather.humidity}%</p>
          <p>Vento: {weather.windSpeed} km/h</p>
        </div>
      )}

      <section style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <div>
          <button onClick={handleFetchForecast}>Ver Previsão de 5 Dias</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {forecast && (
            <div style={{ marginTop: 20 }}>
              <h2>
                Previsão para {forecast.city}, {forecast.country}
              </h2>
              {forecast.days.map((day) => (
                <div key={day.date} style={{ marginBottom: 10 }}>
                  <h3>{day.date}</h3>
                  <p>Temperatura Mínima: {day.minTemp} °C</p>
                  <p>Temperatura Máxima: {day.maxTemp} °C</p>
                  <p>Condição: {day.condition}</p>
                </div>
              ))}
            </div>
          )}
        </div>
    </section>
    </div>
  );
}

export default App;
