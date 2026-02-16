export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
}

export interface Forecast {
  city: string;
  country: string;
  days: ForecastDay[];
  hourly: ForecastHour[]; 
}

export type ForecastHour = {
  time: string; 
  temp: number;
  condition: string;
  icon: string;
};




