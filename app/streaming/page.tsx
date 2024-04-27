import { Suspense } from "react";

export const runtime = "edge";

export default function Streaming() {
  return (
    <main className="w-full">
      <h1>Streaming</h1>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </main>
  );
}

async function mockFetchPosts() {
  return new Promise<
    {
      id: number;
      title: string;
    }[]
  >((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
        { id: 3, title: "Post 3" },
      ]);
    }, 1000);
  });
}

async function PostFeed() {
  const posts = await mockFetchPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

async function mockFetchWeather() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Sunny");
    }, 500);
  });
}

async function Weather() {
  const weather = mockFetchWeather()

  return (
    <p>{weather}</p>
  )
}
