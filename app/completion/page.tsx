import { Completion } from "./completion";

export const runtime = "edge";

export default function Page() {
  return (
    <div>
      <h1>Completion</h1>
      <Completion />
    </div>
  );
}
