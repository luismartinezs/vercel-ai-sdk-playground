import { AI } from "@/app/action";
import AiState from "@/components/AiState";
import KataPrompter from "@/components/KataPrompter";
import UiState from "@/components/UiState";

export const runtime = "edge";

export default function Home() {
  return (
    <main>
      <AI>
        <KataPrompter />
        <UiState />
        <AiState />
      </AI>
    </main>
  );
}
