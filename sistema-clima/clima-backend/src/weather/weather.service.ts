import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { WeatherApiResponse } from './interfaces/weather-api-responses.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(private configService: ConfigService) {}

  async getWeather(city: string): Promise<WeatherApiResponse> {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');

    if (!apiKey) {
      this.logger.error('API key for weather service is not configured.');
      throw new HttpException(
        'Weather API key not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const baseUrl = `http://api.weatherapi.com/v1/current.json`;

    const params = new URLSearchParams({
      key: apiKey,
      q: city,
      Lang: 'pt',
    });

    const url = `${baseUrl}?${params.toString()}`;

    try {
      this.logger.log(`Fetching weather data for city: ${city}`);

      const res: Response = await fetch(url);
      const data: WeatherApiResponse = (await res.json()) as WeatherApiResponse;

      if (data.error) {
        this.logger.warn(`Falha na API externa: ${data.error.message}`);
        throw new HttpException(
          `Erro ao buscar clima: ${data.error.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(`Erro inesperado: ${error}`);
      throw new HttpException(
        'Serviço de clima indisponível no momento',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
