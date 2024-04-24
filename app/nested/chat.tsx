"use client";

import { useActions, useUIState } from "ai/rsc";
import { AI } from "./action";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";

export const Chat = () => {
  const [ui, setUI] = useUIState<typeof AI>();
  const { getData } = useActions<typeof AI>();

  return (
    <div>
      <h1>Nested streamable UI</h1>
      <Button
        onClick={async () => {
          const res = await getData();
          console.log(res.id);
          setUI((prev) => [...prev, { id: nanoid(), ui: res.ui }]);
        }}
      >
        Fetch data
      </Button>
      {ui.map(({ id, ui }) => (
        <div key={id}>{ui}</div>
      ))}
    </div>
  );
};
