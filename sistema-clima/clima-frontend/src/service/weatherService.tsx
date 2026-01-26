import type { Weather } from '../types/Weather';

export async function getWeather(city: string): Promise<Weather> {
    const url = `http://localhost:3000/weather?city=${city}`;

    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    return {
        city: data.city,
        country: data.country,
        temperature: data.temperature,
        feelsLike: data.feelsLike,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        condition: data.condition,
    }
}