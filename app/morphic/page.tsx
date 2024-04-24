import { AI } from "./action";
import { Chat } from "./components/chat";

export const runtime = "edge";

export default function Page() {
  return (
    <main className="w-full">
      <h1>Morphic clone</h1>
      <AI>
        <Chat />
      </AI>
    </main>
  );
}
