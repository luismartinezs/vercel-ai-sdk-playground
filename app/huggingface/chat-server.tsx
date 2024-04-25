'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Res = {
  generated_text: string
}[]

type Message = {
  role: string,
  content: string
}

const Message = ({
  role,
  content
}:{
  role: string,
  content: string
}) => {
  return (
    <div className="mt-2">
      <span className="text-gray-300">{role}:&nbsp;</span>
      <span>{content}</span>
    </div>
  )
}

function responseToMessage(response: Res): Message[] {
  return response.map(({generated_text}) => ({
    role: "ai",
    content: generated_text
  }))
}

export function ChatServer ({
  submit
}: {
  submit: (input: string) => Promise<Res>
}) {
  const [answers, setAnswers] = useState<Message[]>([])
  const [input, setInput] = useState('')
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <h2>Fetch directly with server action and API call</h2>
      {answers.length > 0 && answers.map((msg, _index) => <Message key={_index} {...msg} />)}

      <form onSubmit={async (e) => {
        e.preventDefault()
        if (!input) return
        setAnswers(prev => [...prev, {role: "user", content: input}])
        const res = await submit(input)
        console.log(res)
        setAnswers(prev => [...prev, ...responseToMessage(res)])
        setInput("")
      }}>
        <label className="flex flex-col gap-2">
          Say something...
          <input value={input} onChange={e => setInput(e.target.value)} />
        </label>
        <Button type="submit" className="mt-2">Send</Button>
      </form>
    </div>
  );
}