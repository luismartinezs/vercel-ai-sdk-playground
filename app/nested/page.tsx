import AiState from "@/components/AiState";
import { AI } from "./action";
import { Chat } from "./chat";
import UiState from "@/components/UiState";

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
