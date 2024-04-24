import { Spinner } from "@/components/ui/spinner";
import { env } from "@/env";
import { getTemp } from "@/lib/utils";
import { createAI, getMutableAIState, render } from "ai/rsc";
import OpenAI from "openai";
import { z } from "zod";
import { WeatherCard } from "./WeatherCard";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function submit(location: string) {
  "use server"
  const aiState = getMutableAIState();

  // resetting here the aiState because we don't need the previous chat history in this use case
  aiState.update([
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: "user",
      content: `What is the weather like in ${location}?`,
    },
  ]);

  const ui = render({
    model: env.OPENAI_API_MODEL || "gpt-4-turbo",
    provider: openai,
    messages: aiState.get(),
    tools: {
      get_current_weather: {
        description: 'Get the current weather',
        parameters: z.object({
          location: z.string(),
          format: z.enum(['celsius', 'fahrenheit']),
        }),
        render: async function* ({location, format}) {
          yield <Spinner />
          const weatherData = {
            temperature: getTemp(),
            unit: format === 'celsius' ? 'C' : 'F',
          };

          aiState.done([
            ...aiState.get(),
            {
              role: 'function',
              name: 'get_current_weather',
              content: JSON.stringify(weatherData)
            }
          ])

          return <WeatherCard data={weatherData} city={location} />
        }
      }
    }
  })

  return {
    id: Date.now(),
    ui
  }
}

const initialAIState: {
  role: "user" | "assistant" | "system";
  content: string;
}[] = [];
const initialUIState: {
  id: number;
  ui: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submit,
  },
  initialAIState,
  initialUIState,
});
