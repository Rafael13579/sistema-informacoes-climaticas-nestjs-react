import type { Forecast } from '../types/Forecast';

interface ForecastCardProps {
  forecast: Forecast;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div >
      <h2>
        Previsão para {forecast.city}, {forecast.country}
      </h2>

      <div style={{ display: "flex", gap: "16px", }}>
        {forecast.days.map((day) => (
          <div  className="forecast-section"
            key={day.date}
          >
            <h3>{day.date}</h3>
            <p>
              Mín: {day.minTemp}°C
            </p>
            <p>
              Máx: {day.maxTemp}°C
            </p>
            <p>{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
