import { AI } from "./action";
import { Chat } from "./chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="w-full">
      <AI>
        <Chat />
      </AI>
    </main>
  );
}
