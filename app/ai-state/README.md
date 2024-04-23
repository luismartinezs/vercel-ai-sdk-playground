Example of chat with server actions, that uses:

- action: `getMutableAIState`, `render`
  - getMutableAIState: called within a Server Action to make updates to the AI state
  - render: helper function to create a streamable UIs from an LLM response
- Wraps page with AI from createAI, with actions, initialUIState and initialAIState
  - ai state is an array of "ai messages" (role, content, etc)
  - ui state is an array of components
- At the page level (server component) we wrap with the AI provider
- At the client component we use useUIState and useActions
  - useUIState: to render and update ui
  - useActions: to call server action
  - the submit function does 3 things:
    1. append new user prompt to list of messages (as a React.JSX.Element)
    2. call server action that:
      a. creates mutable ai state
      b. updates ai state with user input
      c. calls render function with updated ai state, which gets response from ai model
      d. returns streamable UI
    3. append new ai response to list of messages