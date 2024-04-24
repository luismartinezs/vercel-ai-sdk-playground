"use client";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";
import { AI } from "./action";

export const Chat = () => {
  const [value, setValue] = useState("");
  const [ui, setUI] = useUIState<typeof AI>();
  const { handleUserMessage } = useActions<typeof AI>();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUI((prev) => [
      ...prev,
      { startedAt: Date.now(), ui: <div>{value}</div> },
    ]);
    const response = await handleUserMessage(value);
    setUI((prev) => [...prev, response]);
    setValue("");
  }

  return (
    <div>
      <h2>Chat</h2>
      <div className="flex flex-col gap-2">
        {ui.map(({ startedAt, ui }) => (
          <div key={startedAt}>{ui}</div>
        ))}
      </div>
      <form>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
