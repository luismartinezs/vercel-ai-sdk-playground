function transf() {
  const stream = new ReadableStream({
    start(controller) {
      const words = ['Log entry at 123413251', 'Log entry at 562363456354', 'Log entry at 845674353456']

      words.forEach(word => controller.enqueue(word))
      controller.close()
    }
  })

  const transform = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk + ' - Processed')
    }
  })

  const pipe = stream.pipeThrough(transform)

  async function readStream(stream: ReadableStream) {
    const reader = stream.getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      console.log(value)
    }
  }

  readStream(pipe)
}

transf()