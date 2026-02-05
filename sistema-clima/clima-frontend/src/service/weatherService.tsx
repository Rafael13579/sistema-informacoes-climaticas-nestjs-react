import type { Weather } from '../types/Weather';
import type { Forecast } from '../types/Forecast';

export async function getWeather(city: string): Promise<Weather> {
    const url = `http://localhost:3000/weather?city=${city}`;

    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    return {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        condition: data.current.condition.text,
    }

}

type ForecastApiDay = {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: { text: string };
  };
};

export async function fetchForecast(city: string): Promise<Forecast> {
    const url = `http://localhost:3000/weather/forecast?city=${city}&days=5`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Erro ao buscar previsão');
    }
    
    const data = await res.json();

    return {
    city: data.location.name,
    country: data.location.country,
    days: data.forecast.forecastday.map((day: ForecastApiDay) => ({
      date: day.date,
      minTemp: day.day.mintemp_c,
      maxTemp: day.day.maxtemp_c,
      condition: day.day.condition.text,
    })),
  };
}
