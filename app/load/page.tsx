export const runtime = "edge";

export default function Load() {
  return (
    <main className="w-full">
      <h1>Load</h1>
      {/* the presence of a ./loading.tsx automatically creates a Suspense boundary around async Components */}
      <AsyncComponent />
    </main>
  );
}

async function mockApiCall() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Data loaded!");
    }, 1000);
  });
}

async function AsyncComponent() {
  const res = await mockApiCall();

  return <div>{res}</div>;
}
