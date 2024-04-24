"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCompletion } from "ai/react";

export default function RouteComp() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/functions",
  });
  return (
    <>
      <h2>Route</h2>
      <p>Use a API route to get LLM data</p>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            placeholder="Enter your prompt..."
            onChange={handleInputChange}
          />
          {isLoading && <Spinner />}
          <p>Completion result: {completion}</p>
          <Button type="button" onClick={stop}>
            Stop
          </Button>
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
