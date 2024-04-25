"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/huggingface",
  });

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <Button type="submit" className="mt-2">Send</Button>
      </form>
    </div>
  );
}
