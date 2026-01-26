import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { WeatherApiResponse } from './interfaces/weather-api-responses.interface';

@Injectable()
export class WeatherService {
  async getWeather(city: string): Promise<WeatherApiResponse> {
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      throw new HttpException(
        'API key não configurada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

    const response = await fetch(url);
    const data: WeatherApiResponse =
      (await response.json()) as WeatherApiResponse;

    if (data.error) {
      throw new HttpException(data.error.message, HttpStatus.NOT_FOUND);
    }

    return data;
  }
}
