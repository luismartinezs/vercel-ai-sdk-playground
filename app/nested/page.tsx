import { Chat } from "./chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main>
      <Chat />
    </main>
  );
}
