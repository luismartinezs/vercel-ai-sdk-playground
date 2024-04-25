import Chat from "./chat";
import { ChatServer } from "./chat-server";
import {submit} from "./action"
import Stream from "@/components/Stream";

export const runtime = "edge";

export default function Huggingface() {
  return (
    <main className="w-full">
      <h1>Hugging face</h1>
      <Stream />
      <Chat />
      <ChatServer submit={submit} />
    </main>
  );
}
