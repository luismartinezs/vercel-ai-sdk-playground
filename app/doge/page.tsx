import Assistant from "./assistant";

export const runtime = "edge";

export default function Page() {
  return (
    <main className="w-full">
      <h1>Doge</h1>
      <p>Doge is ur fren and want to hepl. Ask Doge somthing ❤️</p>
      <Assistant />
    </main>
  );
}
