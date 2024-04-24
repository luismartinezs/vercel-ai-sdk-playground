import { Spinner } from "./components/ui/spinner";
import { ExperimentalMessage } from "ai";
import { StreamableValue, createAI, createStreamableUI, createStreamableValue, getMutableAIState } from "ai/rsc";
import { taskManager, inquire, researcher, querySuggestor } from "./agents";
import { Section } from "./components/section";
import { FollowupPanel } from "./components/followup-panel";

async function submit(formData?: FormData, skip?: boolean) {
  "use server"

  // init
  const aiState = getMutableAIState<typeof AI>()
  const isGenerating = createStreamableValue(true);
  const uiStream = createStreamableUI();

  const messages: ExperimentalMessage[] = aiState.get() as any
  // Get the user input from the form data
  const userInput = skip
    ? `{"action": "skip"}`
    : (formData?.get('input') as string)
  const content = skip
    ? userInput
    : formData
    ? JSON.stringify(Object.fromEntries(formData))
    : null
  // Add the user message to the state
  if (content) {
    const message = { role: 'user', content }
    messages.push(message as ExperimentalMessage)
    aiState.update([...(aiState.get() as any), message])
  }

  async function processEvents() {
    uiStream.update(<Spinner />)

    // task manager
    let action: any = {
      object: {
        next: 'proceed'
      }
    }
    if (!skip) action = await taskManager(messages)

    // handle inquire
    if (action.object.next === 'inquire') {
      // we're passing the ui stream to update the ui
      const inquiry = await inquire(uiStream, messages)

      uiStream.done()
      isGenerating.done() // is this a bug? should this be set to false?
      aiState.done([
        ...aiState.get(),
        {
          role: 'assistant',
          content: `inquiry: ${inquiry?.question}`
        }
      ])
      return
    }

    // generate answer
    let answer = ''
    let errorOccurred = false
    const streamText = createStreamableValue<string>()
    while (answer.length === 0) {
      // search the web and generate answer
      const { fullResponse, hasError } = await researcher(
        uiStream,
        streamText,
        messages
      )
      answer = fullResponse
      errorOccurred = hasError
    }
    streamText.done()

    if (!errorOccurred) {
      // handle related queries
      await querySuggestor(uiStream, messages)

      uiStream.append(
        <Section title="Follow-up">
          <FollowupPanel />
        </Section>
      )
    }

    isGenerating.done(false)
    uiStream.done()
    aiState.done([
      ...aiState.get(),
      {
        role: 'assistant',
        content: 'answer'
      }
    ])
  }

  processEvents()

  return {
    id: Date.now(),
    isGenerating: isGenerating.value,
    component: uiStream.value,
  }
}

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function' | 'tool';
  content: string;
  id?: number;
  name?: string;
}[] = [];
const initialUIState: {
  id: number;
  isGenerating: StreamableValue<boolean>;
  component: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submit,
  },
  initialUIState,
  initialAIState,
});
