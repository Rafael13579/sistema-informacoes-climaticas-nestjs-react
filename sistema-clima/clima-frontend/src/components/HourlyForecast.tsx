import type { ForecastHour } from "../types/Forecast";

interface HourlyForecastProps {
  hours: ForecastHour[];
}

export function HourlyForecast({ hours }: HourlyForecastProps) {
  if (!hours || hours.length === 0) return null;

  return (
    <div className="hourly-container">
      <h3 style={{marginBottom:"20px"}} >Próximas 24 Horas</h3>
      
      <div className="hourly-scroll">
        {hours.map((hour, index) => (
          <div key={index} className="hourly-card">
            <span className="hour-time">{hour.time}</span>
            <img src={hour.icon} alt={hour.condition} width="40" />
            <span className="hour-temp">{Math.round(hour.temp)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}