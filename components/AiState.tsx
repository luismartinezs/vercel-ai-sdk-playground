'use client'

import { AI } from "@/app/action";
import { useAIState } from "ai/rsc";

const AiState = (): React.JSX.Element => {
  const [aiMessages, setAiMessages] = useAIState<typeof AI>()

  return (
    <div>
      <h2>AI state</h2>
      <pre
      >{JSON.stringify(aiMessages, null, 4)}</pre>
    </div>
  );
};

export default AiState
