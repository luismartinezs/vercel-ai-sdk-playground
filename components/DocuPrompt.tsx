"use client";

import { AI } from "@/app/action";
import { TextareaWithText } from "@/components/TextareaWithText";
import { Button } from "@/components/ui/button";
import { useAIState, useActions, useUIState } from "ai/rsc";

type DocuPromptProps = {};

const DocuPrompt = ({}: DocuPromptProps): React.JSX.Element => {
  const { submitDocs } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiMessages, setAiMessages] = useAIState<typeof AI>()


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleClear()

    const formData = new FormData(event.currentTarget);
    const outline = await submitDocs(formData);
  }

  const handleClear = () => {
    setMessages([])
    setAiMessages([])
  }

  return (
    <form className="max-w-2xl" onSubmit={handleSubmit}>
      <TextareaWithText
        name="input"
        rows={5}
        cols={50}
        label="Docs"
        description="Provide technical documentation about the topic you want to create katas about (you can just paste the docs)."
      />
      <div className="flex justify-end">
        <Button className="" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DocuPrompt;
