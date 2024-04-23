import { ExperimentalMessage, ExperimentalUserMessage } from "ai";
import {
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

  if (content) {
    const message: ExperimentalUserMessage = { role: "user", content };
    aiState.update({...aiState.get(), docs: message});
  }

  uiStream.done()
  isGenerating.done()
  aiState.done(aiState.get())

  console.log(aiState.get())

  return {
    isGenerating: isGenerating.value,
    component: uiStream.value
  }
}

const initialAIState: {
  docs?: ExperimentalUserMessage;
} = {};
const initialUIState: {}[] = [];

export const AI = createAI({
  actions: {
    submitDocs,
  },
  initialAIState,
  initialUIState,
});
