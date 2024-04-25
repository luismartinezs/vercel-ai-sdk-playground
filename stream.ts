const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("Hello");
    controller.enqueue("Stream");
    controller.close();
  }
});

async function logStream(stream) {
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read().catch(error => {
      console.error('Error reading from the stream:', error);
    });
    if (done) break;
    console.log(value);
  }
}

logStream(stream);

async function fetchAndDecodeText() {
  const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler');
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }
  console.log(result);
}

// fetchAndDecodeText()

