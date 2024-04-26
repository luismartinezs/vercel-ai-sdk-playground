const INPUT_RATE = 100;
const OUTPUT_RATE = 1000;

(async () => {
  async function* integers() {
    let i = 1

    while (true) {
      console.log(`yielding ${i}`)
      yield i++;

      await sleep(INPUT_RATE);
    }
  }
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function createStream(iterator: AsyncGenerator): ReadableStream {
    return new ReadableStream({
      async start(controller) {
        for await (const value of iterator) {
          controller.enqueue(value)
        }
        controller.close()
      }
    })
  }

  async function run() {
    const stream = createStream(integers())
    const reader = stream.getReader()

    for (let i = 0; i < 100; i++) {
      const { value } = await reader.read()
      console.log(`read ${value}`)

      await sleep(OUTPUT_RATE)
    }
  }

  run()
})()