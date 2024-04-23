import AiState from "@/components/AiState";
import KataPrompter from "@/components/KataPrompter";

export const runtime = 'edge'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <KataPrompter />
      <AiState />
    </main>
  );
}
