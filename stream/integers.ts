const INPUT_RATE = 100;
const OUTPUT_RATE = 1000;

(async () => {
  async function* integers() {
    let i = 1

    while (true) {
      console.log(`streaming ${i}`)
      yield i++;

      await sleep(INPUT_RATE);
    }
  }
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function createStream(iterator: AsyncGenerator): ReadableStream {
    return new ReadableStream({
      // eager for await
      // this will not work here because it's eagerly iterating through infinite values
      // async start(controller) {
      //   for await (const value of iterator) {
      //     controller.enqueue(value)
      //   }
      //   controller.close()
      // },
      // pull handles both back-pressure and cancellation by manually pulling values from the iterator when reading from the stream
      async pull(controller) {
        const {value, done} = await iterator.next()

        if (done) {
          controller.close()
        } else {
          controller.enqueue(value)
        }
      }
    })
  }

  async function run() {
    const stream = createStream(integers())
    const reader = stream.getReader()

    for (let i = 0; i < 3; i++) {
      const { value } = await reader.read()
      console.log(`reading ${value}`)

      await sleep(OUTPUT_RATE)
    }
  }

  run()
})()