"use client";

import { AI } from "@/app/action";
import { useAIState } from "ai/rsc";

const AiState = (): React.JSX.Element => {
  const [ai] = useAIState<typeof AI>();

  return (
    <div>
      <h2>AI state</h2>
      {ai.length > 0 ? (
        ai.map((msg) => (
          <p key={msg.id} className="mt-4 max-h-[100px] overflow-hidden">
            <span className="text-gray-400">{msg.role}: </span>
            <span>{msg.content}</span>
          </p>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
};

export default AiState;
