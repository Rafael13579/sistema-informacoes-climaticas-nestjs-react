import { useState, useEffect } from "react";
import type { Forecast } from "../types/Forecast";

interface ForecastSectionProps {
  forecast: Forecast | null;
  loading: boolean;

}

export function ForecastSection({ forecast }: ForecastSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, [forecast]);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 50);
  };


  if (!forecast) return null;

  return (
    <div className="forecast" style={{ textAlign: "center", marginTop: "20px" }}>

      {!isVisible && (
        <button
          onClick={handleOpen}
          style={{
            borderRadius: "8px",
            border: "none",
            background: "transparent",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          Ver previsão ↓
        </button>
      )}


      {isVisible && (
        <>
          <button
            onClick={handleClose}
            style={{
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Ver previsão ↑
          </button>
          <h3 style={{ display: "flex", justifyContent:"center", marginTop:"20px" }} >Próximos dias</h3>
          <div className="forecast-container">

            {forecast.days.map((day, index) => (
              <div
                key={day.date}
                className={`forecast-card ${isClosing ? "exiting" : ""}`}
                style={{ animationDelay: isClosing ? "0s" : `${index * 0.1}s` }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexDirection: "column" }}>
                  <span><strong>{day.date}</strong></span>
                  <span>{day.condition}</span>
                  <img src={day.icon} alt={day.condition} width="60" />
                  <span>Min {Math.round(day.minTemp)}° / Max {Math.round(day.maxTemp)}°</span>
                </div>
              </div>
            ))}

          </div>
        </>

      )}



    </div>
  );
}