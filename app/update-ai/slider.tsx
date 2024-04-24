"use client";

import { useAIState } from "ai/rsc";
import { useId, useState } from "react";
import type { AI } from "../action";

export function Slider({ name, price }: { name: string; price: number }) {
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [value, setValue] = useState(0);

  // A unique identifier we attach to each message so we can update it later.
  const id = useId();

  // Whenever the slider changes, we need to update the local value state and the history
  // so LLM also knows what's going on without having a new message every time the slider changes.
  function onSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));

    // Insert a new message into the AI state.
    const info = {
      role: "assistant" as const,
      content: `[User has changed to purchase ${value} shares of ${name}. Total cost: $${(
        value * price
      ).toFixed(2)}]`,

      // Identifier of this UI component, so we don't insert it many times.
      id,
    };

    // If the last message is already inserted by us, update it. This is to avoid
    // adding every slider change to the AI state.
    if (aiState[aiState.length - 1]?.id === id) {
      setAIState([...aiState.slice(0, -1), info]);
    } else {
      // If it doesn't exist, append it to the AI state.
      setAIState([...aiState, info]);
    }
  }

  return (
    <input
      type="range"
      value={value}
      max={1000}
      step={1}
      onChange={onSliderChange}
    />
  );
}
