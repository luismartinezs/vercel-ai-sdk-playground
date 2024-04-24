import { Card } from "@/components/ui/card";

export const WeatherCard = ({
  city,
  data,
}: {
  city: string;
  data: {
    temperature: number;
    unit: string;
}
}) => {
  return (
    <Card className="p-3">
      <h2>Weather</h2>
      <p>{city}</p>
      <p>{data.temperature}°{data.unit}</p>
    </Card>
  );
};