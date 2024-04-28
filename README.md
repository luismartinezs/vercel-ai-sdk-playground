# AI Kata Gen

Generate Katas for a specific React topic using openai LLM

## Workflow

- Use provides docs
- User gets an outline of the docs provided
- Use selects a specific subtopic about which to generate kata


## Project structure

Similar to morphic.sh

- /app: pages
  - layout.tsx
  - page.tsx
  - action.tsx (server action that calls the agents)
- /components
  - list of custom built components
  - /ui: ui reusable components (shadcn)
- /lib
  - /agents: openai agents
  - /schema: schemas for LLM responses
  - /utils: e.g. `cn` fnc