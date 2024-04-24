import ErrorCard from "@/components/ErrorCard";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { createAI, createStreamableUI } from "ai/rsc";
import React from "react";
import { WeatherCard } from "./WeatherCard";

const WeatherCardSkeleton = () => (
  <Card>
    <h2>Weather</h2>
    <p>Loading...</p>
  </Card>
);

async function getCityTemperature(city: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const t = Math.round(20 + (Math.random() - 0.5) * 10);
      resolve(`${t}°C`);
    }, 1000);
  });
}

async function callLLM(query: string): Promise<{ city: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ city: "New York" });
    }, 1000);
  });
}

export async function handleUserMessage(userInput: string) {
  "use server";
  const card = createStreamableUI(<Spinner />);

  async function getCityWeather() {
    try {
      card.update(
        <>
          Analyzing...
          <WeatherCardSkeleton />
        </>
      );

      // Your customized LLM logic, e.g. tools API.
      const res = await callLLM(
        `Return the city name from the user input: ${userInput}`
      );

      const temperature = await getCityTemperature(res.city);
      card.done(
        <>
          Here&apos;s the weather of {res.city}:
          <WeatherCard
            city={res.city}
            temperature={temperature}
            refreshAction={async () => {
              "use server";
              return getCityTemperature(res.city);
            }}
          />
        </>
      );
    } catch {
      card.done(<ErrorCard />);
    }
  }

  getCityWeather();

  return {
    startedAt: Date.now(),
    ui: card.value,
  };
}

const initialAIState: {
  role: "user" | "assistant" | "system";
  content: string;
}[] = [];
const initialUIState: {
  startedAt: number;
  ui: React.JSX.Element;
}[] = [];

export const AI = createAI({
  actions: {
    handleUserMessage,
  },
  initialAIState,
  initialUIState,
});
