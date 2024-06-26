import { OpenAIStream, StreamingTextResponse } from 'ai';
import { kv } from '@vercel/kv';
import { env } from '@/env';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const key = JSON.stringify(messages); // come up with a key based on the request

  // Check if we have a cached response
  const cached = (await kv.get(key)) as string; // this doesnt work

  if (cached) {
    console.log('cached')
    // return new Response(cached as any);

    // Optional: Emulate streaming by breaking the cached response into chunks

    const chunks = cached.split(' ');
    const stream = new ReadableStream({
      async start(controller) {
        for (const chunk of chunks) {
          const bytes = new TextEncoder().encode(chunk + ' ');
          controller.enqueue(bytes);
          await new Promise((r) =>
            setTimeout(
              r,
              // get a random number between 10ms and 50ms to simulate a random delay
              Math.floor(Math.random() * 40) + 10
            )
          );
        }
        controller.close();
      },
    });
    return new StreamingTextResponse(stream);
  }

  console.log('not cached')

  const response = await openai.chat.completions.create({
    model: env.OPENAI_API_MODEL || 'gpt-3.5-turbo',
    stream: true,
    messages,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    async onFinal(completion) {
      // Cache the response. Note that this will also cache function calls.
      await kv.set(key, completion);
      const oneHour = 60 * 60;
      await kv.expire(key, oneHour);
    },
  });

  return new StreamingTextResponse(stream);
}