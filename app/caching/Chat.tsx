"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useChat } from "ai/react";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/cache'
  });

  return (
    <div className="">
      <h1 className="text-2xl font-semibold">Chat</h1>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label>Write your proompt:</Label>
          <Textarea
            cols={50}
            rows={5}
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
