"use client";

import { AI } from "./action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";

export const Message = ({
  role,
  content
}:{
  role: "user" | "assistant",
  content: string
}) => {
  return (
    <div className="mt-2">
      <span className="text-gray-300">{role}:&nbsp;</span>
      <span>{content}</span>
    </div>
  )
}

const Chat = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submit } = useActions<typeof AI>()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        display: <Message role="user" content={input} />
      }
    ])
    const responseMessage = await submit(input)
    setMessages(currentMessages => [
      ...currentMessages,
      responseMessage
    ])
    setInput("")
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
  }

  return (
    <div className="">
      <h1 className="text-2xl font-semibold">AI State</h1>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.display}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
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
