import Assistant from "./assistant";

export const runtime = "edge";

export default function Page() {
  return (
    <main className="w-full">
      <h1>Assistant</h1>
      <p>Can get and set temperature of rooms with natural language</p>
      <p>Because it's using the assistant API, it also has memory (the message history is stored in the openai server)</p>
      <Assistant />
    </main>
  );
}
