import { env } from "@/env";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: env.OPENAI_API_MODEL || 'gpt-4-turbo',
    stream: true,
    messages: messages,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}