import { AI } from "./action";
import { Chat } from "./chat";

export const runtime = "edge";

export default function Home() {
  return (
    <main>
      <AI>
        <Chat />
      </AI>
    </main>
  );
}
