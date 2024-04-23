import { Message } from "./Chat";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/env";
import { createAI, getMutableAIState, render } from "ai/rsc";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function submit(userInput: string) {
  "use server";

  const aiState = getMutableAIState();

  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  const ui = render({
    model: env.OPENAI_API_MODEL || "gpt-4-turbo",
    provider: openai,
    initial: <Spinner />,
    messages: [
      { role: 'system', content: 'You are a flight assistant' },
      ...aiState.get()
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content
          }
        ])
      }

      return <Message role="assistant" content={content} />
    }
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

const initialAIState: {
  role: "user" | "assistant";
  content: string;
  id?: number;
  name?: string;
}[] = [];
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submit,
  },
  initialUIState,
  initialAIState,
});
