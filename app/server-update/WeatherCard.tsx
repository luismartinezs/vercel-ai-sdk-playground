'use client'
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const WeatherCard = ({
  city,
  temperature,
  refreshAction,
}: {
  city: string;
  temperature: string;
  refreshAction: () => Promise<string>;
}) => {
  const [localT, setLocalT] = useState(temperature);

  return (
    <Card>
      <h2>Weather</h2>
      <p>{city}</p>
      <p>{localT}</p>
      <button
        onClick={async () => {
          setLocalT(await refreshAction());
        }}
      >
        Refresh
      </button>
    </Card>
  );
};