import type { Weather } from '../types/Weather';
import type { Forecast, ForecastHour, ForecastDay } from '../types/Forecast';

interface ApiHour {
  time_epoch: number;
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
}

interface ApiDay {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour: ApiHour[];
}

interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
  };
  forecast: {
    forecastday: ApiDay[];
  };
}

export async function getWeather(city: string): Promise<Weather> {
    const url = city 
        ? `http://localhost:3000/weather?city=${city}`
        : `http://localhost:3000/weather`;

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
        icon: `https:${data.current.condition.icon}`
    }
}

export async function fetchForecast(city: string): Promise<Forecast> {
  const url = `http://localhost:3000/weather/forecast?city=${city}&days=3`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Erro ao buscar previsão');
  
  const data: WeatherApiResponse = await res.json();
  
  const todayHours = data.forecast.forecastday[0]?.hour || [];
  const tomorrowHours = data.forecast.forecastday[1]?.hour || [];
  
  const allHours = [...todayHours, ...tomorrowHours];
  const currentEpoch = Math.floor(Date.now() / 1000);


  const next24Hours: ForecastHour[] = allHours
    .filter((hour) => hour.time_epoch > currentEpoch)
    .slice(0, 24)
    .map((hour) => ({
      time: hour.time.split(" ")[1],
      temp: hour.temp_c,
      condition: hour.condition.text,
      icon: hour.condition.icon 
    }));

  const days: ForecastDay[] = data.forecast.forecastday.map((day) => ({
    date: day.date,
    minTemp: day.day.mintemp_c,
    maxTemp: day.day.maxtemp_c,
    condition: day.day.condition.text,
    icon: day.day.condition.icon
  }));


  return {
    city: data.location.name,
    country: data.location.country,
    days: days,
    hourly: next24Hours, 
  };
}