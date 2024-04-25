import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";

export const runtime = "edge";

export default function Huggingface() {
  return (
    <main className="w-full">
      <h1>Hugging face</h1>
      <PixelCard>
        <PixelButton label="click me" />
      </PixelCard>
    </main>
  );
}
