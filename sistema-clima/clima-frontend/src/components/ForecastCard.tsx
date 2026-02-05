import type { Forecast } from '../types/Forecast';

interface ForecastCardProps {
  forecast: Forecast;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        Previsão para {forecast.city}, {forecast.country}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.days.map((day) => (
          <div
            key={day.date}
            className="bg-blue-50 rounded-xl p-4 text-center shadow"
          >
            <h3 className="font-semibold mb-2">{day.date}</h3>
            <p className="text-sm text-gray-700">
              Mín: {day.minTemp}°C
            </p>
            <p className="text-sm text-gray-700">
              Máx: {day.maxTemp}°C
            </p>
            <p className="text-sm font-medium mt-2">{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
