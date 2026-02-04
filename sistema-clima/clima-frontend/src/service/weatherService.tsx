import type { Weather } from '../types/Weather';

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