import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './dto/get-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(@Query() query: GetWeatherDto) {
    return this.weatherService.getWeather(query.city);
  }

  @Get('forecast')
  getForecast(@Query() query: GetWeatherDto) {
    return this.weatherService.getForecast(query.city, 5);
  }
}
