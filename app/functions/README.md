Two ways to use function calls:

## API ROUTE

- Get user prompt from request
- Create a LLM completion using
  - List of messages
  - List of functions (name and args)
- Convert LLM response to stream (`OpenAIStream`)
  - Pass a second argument with `experimental_onFunctionCall`: a function that determines what to do on each function call with a switch
- Return stream in a response wrapper (`StreamingTextResponse`)

## SERVER ACTION

- use `createAI` as usual and wrap the app on a `<AI>` provider
- the server action:
  - creates mutable ai state
  - updates ai state with messages array
  - creates a streamable ui with the render function
    - add a tools property, which contains functions, description, params (in zod format) and render function
      - the render function is a generator in charge of returning updated ui, with basic structure:
        - `yield <div>loading</div>`
        - Perform operations, e.g. to fetch data, etc
        - Return updated ui

- Note how using the `render` function we don't need to create a streamable ui (it's either one or the other)