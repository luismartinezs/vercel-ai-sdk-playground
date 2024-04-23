Basic streamable chat that relies on a chat api route that exports a POST req, and a component that uses the `useChat`

```js
  const stream = OpenAIStream(openaiResponse);
  return new StreamingTextResponse(stream);
  ...
  const { messages, input, handleInputChange, handleSubmit } = useChat();
```