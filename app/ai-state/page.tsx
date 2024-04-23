import { AI } from "./action";
import Chat from "./Chat";

export const dynamic = "force-dynamic"; // Force dynamic rendering, which will result in routes being rendered for each user at request time https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic

export default function Home() {
  return (
    <main>
      <AI>
        <Chat />
      </AI>
    </main>
  );
}
