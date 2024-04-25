import { env } from "@/env";

export async function submit(prompt: string) {
  "use server";

  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      headers: { Authorization: `Bearer ${env.HUGGINGFACE_API_KEY}` },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  if (!response.body) {
    throw new Error("Failed to get a streamable response body.");
  }

  const result = await response.json();

  console.log(result);

  return result as { generated_text: string }[];
}

// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams

function handleReadableStream(res: Response) {
  const { body } = res; // res.body is a ReadableStream
  const reader = body!.getReader();
  const stream = new ReadableStream({
    start(controller) {
      // standard pattern for reading from a ReadableStream
      return pump();

      async function pump() {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        controller.enqueue(value);
        return pump();
      }
    },
  });

  return new Response(stream);
}

//

const aborter = new AbortController();
// call aborter.abort() to cancel the fetch

async function simpleHandleReadableStream(url, { signal }) {
  const res = await fetch(url, { signal });
  if (!res.body) {
    throw new Error("Failed to get a streamable response body.");
  }
  for await (const chunk of res.body) {
    // handle chunk
  }
  // exit
}

// create own stream

function makeStream() {
  const stream = new ReadableStream(
    {
      start(controller) {
        // called only once after constructor
      },
      pull(controller) {
        // called repeatedly until stream internal queue is full
      },
      cancel() {
        // called when stream is cancelled (calling stream.cancel())
      },
      // type,
      // autoAllocateChunkSize,
    },
    {
      highWaterMark: 3,
      size: () => 1,
    }
  );
}

async function readStream(stream: ReadableStream) {
  const reader = stream.getReader()
  let charsReceived = 0
  let result = ""

  const {done, value} = await reader.read()
  if (done) {
    console.log("Stream complete");
    // do something with the value
    return
  }

  charsReceived += value.length
  const chunk = value
  // do something with the chunk
  result += chunk

  reader.read().then(readStream) // ??
}

// copy stream to be able to have two simultaneous readers
function teeStream(stream: ReadableStream) {
  const teedOff = stream.tee();
  readStream(teedOff[0]);
  readStream(teedOff[1]);
}

// Piping
// ReadableStream.pipeThrough(), which pipes a readable stream through a writer/reader pair to transform one data format into another
// ReadableStream.pipeTo(), which pipes a readable stream to a writer acting as an end point for the pipe chain