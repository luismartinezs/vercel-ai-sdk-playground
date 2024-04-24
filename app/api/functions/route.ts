import { functions } from '@/app/functions/functionDefs';
import { env } from '@/env';
import { getTemp } from '@/lib/utils';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY || '',
});

export const dynamic = 'force-dynamic';

// And use it like this:
export async function POST(req: Request) {
  const {prompt} = await req.json();

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'assistant',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ]

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    stream: true,
    messages,
    functions,
  });

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages,
    ) => {
      // if you skip the function call and return nothing, the `function_call`
      // message will be sent to the client for it to handle
      if (name === 'get_current_weather') {
        // Call a weather API here
        const weatherData = {
          temperature: getTemp(),
          unit: args.format === 'celsius' ? 'C' : 'F',
        };

        // `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
        const newMessages = createFunctionCallMessages(weatherData) as ChatCompletionMessageParam[];
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model: 'gpt-3.5-turbo-0613',
          // see "Recursive Function Calls" below
          functions,
        });
      }
    },
  });
  return new StreamingTextResponse(stream);
}