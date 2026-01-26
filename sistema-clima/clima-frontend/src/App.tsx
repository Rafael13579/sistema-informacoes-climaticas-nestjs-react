import { useState } from 'react';
import { getWeather } from './service/weatherService';
import { type Weather } from './types/Weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState('');

  async function handleSearch() {
    try {
      setError('');
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError('Não foi possível buscar o clima. Verifique a cidade.');
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
    </div>
  );
}

export default App;
