import PixelButton from "@/components/PixelButton";
import PixelCard from "@/components/PixelCard";

export const runtime = "edge";

export default function Pixel() {
  return (
    <main className="w-full">
      <PixelCard>
        <PixelButton label="click me" />
      </PixelCard>
    </main>
  );
}
