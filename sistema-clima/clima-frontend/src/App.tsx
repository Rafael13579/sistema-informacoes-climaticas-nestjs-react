import { useEffect, useState } from "react";
import "./App.css";
import { getWeather, fetchForecast } from "./service/weatherService";
import type { Weather } from "./types/Weather";
import type { Forecast } from "./types/Forecast";
import { SearchBar } from "./components/SearchBar";
import { WeatherSection } from "./components/WeatherSection";
import { ForecastSection } from "./components/ForecastSection";
import { HourlyForecast } from "./components/HourlyForecast";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);

  const getWeatherTheme = () => {
    if (!weather) return { background: "app-default"};

    const conditionText = weather.condition.toLowerCase();

    // --- SOL ---
    if (
      conditionText.includes("sunny") ||
      conditionText.includes("clear") ||
      conditionText.includes("sol") ||
      conditionText.includes("limpo")
    ) {
      return { background: "app-sunny" };
    }

    // --- NUBLADO ---
    if (
      conditionText.includes("cloud") ||
      conditionText.includes("overcast") ||
      conditionText.includes("mist") ||
      conditionText.includes("fog") ||
      conditionText.includes("nublado") ||
      conditionText.includes("encoberto") ||
      conditionText.includes("nuvens")
    ) {
      return { background: "app-cloudy" };
    }

    if (
      conditionText.includes("rain") ||
      conditionText.includes("drizzle") ||
      conditionText.includes("shower") ||
      conditionText.includes("chuva") ||
      conditionText.includes("garoa") ||
      conditionText.includes("chuvisco")
    ) {
      return { background: "app-rainy" };
    }

    if (
      conditionText.includes("snow") ||
      conditionText.includes("ice") ||
      conditionText.includes("blizzard") ||
      conditionText.includes("nevoeiro") ||
      conditionText.includes("neve")
    ) {
      return { background: "app-snow" };
    }

    if (
      conditionText.includes("thunder") ||
      conditionText.includes("storm") ||
      conditionText.includes("tempestade") ||
      conditionText.includes("trovoada")
    ) {
      return { background: "app-storm" };
    }

    return { background: "app-default" };
  };

  const { background } = getWeatherTheme();

   async function handleSearch() {
    if (!city) return;
    setLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city),
        fetchForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      alert("Erro ao buscar clima.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    const loadFullData = async (query: string) => {
      setLoading(true);
      try {
        const [weatherData, forecastData] = await Promise.all([
          getWeather(query),
          fetchForecast(query)
        ]);

        setWeather(weatherData);
        setForecast(forecastData);
        setCity(weatherData.city);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            loadFullData(`${lat},${lon}`);
          },
          (error) => {
            console.warn("Geolocalização negada ou erro:", error);
            loadFullData("Lisboa"); 
          }
        );
      } else {
        loadFullData("Lisboa");
      }
    };

    loadUserLocation();
  }, []);

  return (
    <div className={`container ${background}`}>
      
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
        />

        <WeatherSection weather={weather} loading={loading} />

        {forecast && (
           <HourlyForecast hours={forecast.hourly} />
        )}

        <ForecastSection
          forecast={forecast}
          loading={loading}
        />
    </div>
  );
}
