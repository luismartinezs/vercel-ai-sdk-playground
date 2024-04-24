import Chat from "./Chat";

export const runtime = "edge";

export default function Page() {
  return (
    <main className="w-full">
      <h1>Caching</h1>
      <Chat />
    </main>
  );
}
