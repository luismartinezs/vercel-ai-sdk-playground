import { createAI } from "ai/rsc";

const initialAIState: {
  role: "user" | "assistant" | "system";
  content: string;
}[] = [];
const initialUIState: {
  startedAt: number;
  ui: React.JSX.Element;
}[] = [];

export const AI = createAI({
  actions: {
  },
  initialAIState,
  initialUIState,
});
