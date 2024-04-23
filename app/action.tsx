import { Spinner } from "@/components/ui/spinner";
import { outliner } from "@/lib/agents";
import { ExperimentalMessage, ExperimentalUserMessage } from "ai";
import {
  StreamableValue,
  createAI,
  createStreamableUI,
  createStreamableValue,
  getMutableAIState,
} from "ai/rsc";

async function submitDocs(formData?: FormData) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  const isGenerating = createStreamableValue(true);

  const content = formData?.get("input") as string;
  const messages: ExperimentalMessage[] = aiState.get() as any;

  console.log(messages);

  if (content) {
    const message = { role: "user", content };
    messages.push(message as ExperimentalMessage);
    aiState.update([...(aiState.get() as any), message]);
  }

  uiStream.update(<Spinner />);

  const outline = await outliner(uiStream, messages);

  console.log(outline);

  isGenerating.done(false);
  uiStream.done();
  aiState.done([
    ...aiState.get(),
    {
      role: "assistant",
      content: JSON.stringify(outline, null, 2),
    },
  ]);

  return {
    isGenerating: isGenerating.value,
    component: uiStream.value,
  };
}

const initialAIState: {
  role: "user" | "assistant" | "system" | "function" | "tool";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  isGenerating: StreamableValue<boolean>;
  component: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitDocs,
  },
  initialAIState,
  initialUIState,
});
