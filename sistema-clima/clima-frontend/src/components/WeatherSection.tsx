import type { Weather } from "../types/Weather";
import { WeatherCard } from "./WeatherCard";

interface WeatherSectionProps {
  weather: Weather | null;
  loading: boolean;
}

export function WeatherSection({ weather, loading }: WeatherSectionProps) {
  if (loading) return <p>Carregando...</p>;
  if (!weather) return null;

  return <WeatherCard weather={weather} />;
}
