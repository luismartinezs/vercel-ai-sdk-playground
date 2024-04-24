import { Separator } from "@/components/ui/separator";
import RouteComp from "./routeComp";
import ClientComp from "./clientComp";
import { AI } from "./action";

export default function Page() {
  return (
    <main className="w-full">
      <h1>Function calls</h1>
      <p>Use a function call to fetch (mock) weather data for a specific location</p>
      <Separator />
      <RouteComp />
      <Separator />
      <AI>
        <ClientComp />
      </AI>
    </main>
  );
}
