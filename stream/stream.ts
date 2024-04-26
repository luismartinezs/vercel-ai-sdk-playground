const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("Hello");
    controller.enqueue("Stream");
    controller.close();
  }
});

async function logStream(stream: ReadableStream) {
  const reader = stream.getReader();
  while (true) {
    const obj = await reader.read().catch(error => {
      console.error('Error reading from the stream:', error);
    });
    if (!obj || obj?.done) break;
    console.log(obj.value);
  }
}

// logStream(stream);

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

//

let timer: null | NodeJS.Timeout = null;
const words = ['Hello', 'Stream', 'World', 'Mike', 'no'];

const source = {
  start(controller: ReadableStreamDefaultController) {
    // Initial pump call to start the data flow
    pump(controller);
  },
  pull(controller: ReadableStreamDefaultController) {
    // Additional data request coming in from the consumer
    // pump(controller);
  },
  cancel() {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

function pump(controller: ReadableStreamDefaultController) {
  if (words.length) {
    // Enqueue next word
    controller.enqueue(words.shift());
    // Set up next pump iteration
    timer = setTimeout(() => pump(controller), 200);
  } else {
    if (!controller.desiredSize) {
      // Stream might still be processing; delay closing
      timer = setTimeout(() => pump(controller), 200);
    } else {
      // Safely close the stream
      controller.close();
    }
  }
}

// Creating the ReadableStream with the source object
const streams = [new ReadableStream(source)];

// Usage of the stream

async function readStream(stream: ReadableStream) {
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read(); // reader.read() triggers the pull method of the controller
    if (done) break;
    console.log(value);  // Output the stream's data
  }
  console.log('Stream finished.');
}

readStream(new ReadableStream({
  start(controller) {
    // run immediately after controller
    controller.enqueue('started');
  },
  pull(controller) {
    // run whenever reader.read() is called
    if (!controller.desiredSize) {
      controller.enqueue('pulled');
      controller.close(); // Close after pulling
    }
  },
  cancel() {
    console.log('canceled');
  }
})).catch(console.error);