"use client";

import { useActions, useUIState } from "ai/rsc";
import { AI } from "./action";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ClientComp() {
  const [value, setValue] = useState("");
  const [ui, setUI] = useUIState<typeof AI>();
  const { submit } = useActions<typeof AI>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await submit(value);
    setUI((prev) => [...prev, res]);
    setValue("");
  }

  return (
    <>
      <h2>Client</h2>
      <h3>Get the weather in a location</h3>
      <p>Use a server action to get the data</p>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter location name:</label>
          <input
            value={value}
            placeholder="Enter your prompt..."
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-4 flex-wrap my-4">
            {ui.map(({ id, ui }) => (
              <div key={id}>{ui}</div>
            ))}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}
