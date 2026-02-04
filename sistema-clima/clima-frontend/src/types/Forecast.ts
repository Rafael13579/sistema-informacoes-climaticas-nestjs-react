export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
}

export interface Forecast {
  city: string;
  country: string;
  days: ForecastDay[];
}
