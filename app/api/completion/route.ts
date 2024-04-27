import { env } from "@/env";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // this is the same as chat, the only difference is that in a chat the entire chat history is sent as prompt every time
  const response = await openai.chat.completions.create({
    model: env.OPENAI_API_MODEL || 'gpt-4-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.', // custom instructions
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}