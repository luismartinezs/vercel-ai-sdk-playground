https://sdk.vercel.ai/docs/concepts/ai-rsc#updating-ai-state-from-client-components

Client component can update state of AI using `useAIState` hook

The reason is that user might dynamically update AI input, e.g. slider that determines number of shares to buy

- use useAIState for ai state getter and setter
- onSliderChange
  - build new message (role + content)
  - update ai state with setter