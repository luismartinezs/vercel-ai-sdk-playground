import { Spinner } from "@/components/ui/spinner";
import { createAI, createStreamableUI } from "ai/rsc";

async function callMockLLM(query: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("1.18");
    }, 1000);
  });
}

async function mockFetchData(url: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("some data");
    }, 1000);
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
    <p>Price: {price}</p>
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

  return ui;
}

// not sure how to make this work
