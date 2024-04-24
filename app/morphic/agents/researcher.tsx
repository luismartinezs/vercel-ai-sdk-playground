import { ExperimentalMessage, ToolCallPart, ToolResultPart, experimental_streamText } from "ai";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { Section } from "../components/section";
import { BotMessage } from "../components/message";
import { openai } from "../openai";
import { env } from "@/env";
import { searchSchema } from "../schema/search";
import { ToolBadge } from "../components/tool-badge";
import { SearchSkeleton } from "../components/search-skeleton";
import { SearchResultsImageSection } from "../components/search-results-image";
import { SearchResults } from "../components/search-results";
import { Card } from "../components/ui/card";

export async function researcher(
  uiStream: ReturnType<typeof createStreamableUI>,
  streamText: ReturnType<typeof createStreamableValue<string>>,
  messages: ExperimentalMessage[]
) {
  let fullResponse = "";
  let hasError = false;
  const answerSection = (
    <Section title="answer">
      {/*  we will update streamText later */}
      <BotMessage content={streamText.value} />
    </Section>
  );

  const result = await experimental_streamText({
    model: openai.chat(env.OPENAI_API_MODEL || "gpt-3.5-turbo"),
    maxTokens: 2500,
    system: `As a professional search expert, you possess the ability to search for any information on the web.
    For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.
    If there are any images relevant to your answer, be sure to include them as well.
    Aim to directly address the user's question, augmenting your response with insights gleaned from the search results.
    Whenever quoting or referencing information from a specific URL, always cite the source URL explicitly.
    `,
    messages,
    tools: {
      search: {
        description: "Search the web for information",
        parameters: searchSchema,
        execute: async ({
          query,
          max_results,
          search_depth,
        }: {
          query: string;
          max_results: number;
          search_depth: "basic" | "advanced";
        }) => {
          // init search UI
          uiStream.update(
            <Section>
              <ToolBadge tool="search">{`${query}`}</ToolBadge>
            </Section>
          );

          uiStream.append(
            <Section>
              <SearchSkeleton />
            </Section>
          );

          const filledQuery =
            query.length < 5 ? query + " ".repeat(5 - query.length) : query;
          let searchResult;
          try {
            // perform web search using 3rd party tool
            searchResult = await tavilySearch(
              filledQuery,
              max_results,
              search_depth
            );
          } catch (error) {
            console.error("Search API error:", error);
            hasError = true;
          }

          if (hasError) {
            fullResponse += `\nAn error occurred while searching for "${query}.`;
            uiStream.update(
              <Card className="p-4 mt-2 text-sm">
                {`An error occurred while searching for "${query}".`}
              </Card>
            );
            return searchResult;
          }

          uiStream.update(
            <Section title="Images">
              <SearchResultsImageSection
                images={searchResult.images}
                query={searchResult.query}
              />
            </Section>
          );
          uiStream.append(
            <Section title="Sources">
              <SearchResults results={searchResult.results} />
            </Section>
          );

          uiStream.append(answerSection);

          return searchResult;
        },
      },
    },
  });

  const toolCalls: ToolCallPart[] = []
  const toolResponses: ToolResultPart[] = []
  //  this part over here looks challenging, not sure if I would think about doing it this way
  for await (const delta of result.fullStream) {
    switch (delta.type) {
      case 'text-delta':
        if (delta.textDelta) {
          // If the first text delta is available, add a ui section
          if (fullResponse.length === 0 && delta.textDelta.length > 0) {
            // Update the UI
            uiStream.update(answerSection)
          }

          fullResponse += delta.textDelta
          streamText.update(fullResponse)
        }
        break
      case 'tool-call':
        toolCalls.push(delta)
        break
      case 'tool-result':
        toolResponses.push(delta)
        break
      case 'error':
        hasError = true
        fullResponse += `\nError occurred while executing the tool`
        break
    }
  }
  messages.push({
    role: 'assistant',
    content: [{ type: 'text', text: fullResponse }, ...toolCalls]
  })

  if (toolResponses.length > 0) {
    // Add tool responses to the messages
    messages.push({ role: 'tool', content: toolResponses })
  }

  return { result, fullResponse, hasError }
}

async function tavilySearch(
  query: string,
  maxResults: number = 10,
  searchDepth: "basic" | "advanced" = "basic"
): Promise<any> {
  const apiKey = env.TAVILY_API_KEY;
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: maxResults < 5 ? 5 : maxResults,
      search_depth: searchDepth,
      include_images: true,
      include_answers: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
