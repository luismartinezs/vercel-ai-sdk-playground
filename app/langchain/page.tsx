"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/langchain",
  });

  return (
    <>
    <h1>Langchain</h1>
    <p>doesn&apos;t work for some reason</p>
    <div className="flex flex-col stretch mx-auto">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <label>
          <div>Say something...</div>
          <input
            className="w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 mr-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <Button type="submit">Send</Button>
      </form>
    </div>
    </>

  );
}
