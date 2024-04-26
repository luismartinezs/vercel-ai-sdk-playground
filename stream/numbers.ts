function run() {
  let timer: NodeJS.Timeout | null = null


  const stream = new ReadableStream({
    start(controller) {
      let num = 1

      pump()

      function pump() {
        timer = setTimeout(() => {
          if (num < 5) {
            controller.enqueue(num++)
            pump()
          } else {
            controller.enqueue(num)
            controller.close()
          }
        }, 500)
      }


    },
    cancel() {
      timer && clearTimeout(timer)
    }
  })

  async function readStream(stream: ReadableStream) {
    const reader = stream.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      console.log(value)
    }
  }

  readStream(stream)
}

run()