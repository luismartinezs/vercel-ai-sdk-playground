import AiState from "@/components/AiState";
import { AI } from "../action";
import { Slider } from "./slider";

export const runtime = "edge";

const name = 'Apple'
const price = 100

export default function Home() {
  return (
    <main className="w-full">
      <div>
        <p><span className="text-gray-400">Company:</span> {name}</p>
        <p><span className="text-gray-400">Price:</span> ${price}</p>
      </div>
      <AI>
        <Slider name={name} price={price} />
        <AiState />
      </AI>
    </main>
  );
}
