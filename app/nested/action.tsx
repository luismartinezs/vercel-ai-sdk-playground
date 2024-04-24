"use server"
import { Spinner } from "@/components/ui/spinner";
import { createAI, createStreamableUI } from "ai/rsc";
import { nanoid } from 'nanoid'

async function callMockLLM(query: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("1.18");
    }, 500);
  });
}

async function mockFetchData(url: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("mock history data");
    }, 500);
  });
}

const Chart = ({ data }: { data: string }) => (
  <div>
    <h2>Chart</h2>
    <p>{data}</p>
  </div>
);

const Data = ({
  chart,
  price,
}: {
  chart: React.JSX.Element;
  price: string;
}) => (
  <div>
    <h1>EUR/USD</h1>
    <p>Price: ${price}</p>
    {chart}
  </div>
);

export async function getData() {
  "use server";

  const ui = createStreamableUI(<Spinner />);

  (async () => {
    const value = await callMockLLM("What is the current EUR/USD exchange?");

    const chart = createStreamableUI(<Spinner />);
    ui.done(<Data chart={chart.value} price={value} />);

    const historyData = await mockFetchData("https://some-api.com");
    chart.done(<Chart data={historyData} />);
  })();


  return { id: nanoid(), ui: ui.value };
}

const initialAIState: {
  role: "user" | "assistant";
  content: string;
  id?: number;
  name?: string;
}[] = [];
const initialUIState: {
  id: string;
  ui: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    getData,
  },
  initialUIState,
  initialAIState,
});
