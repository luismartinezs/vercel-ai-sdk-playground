"use client";

import { AI } from "@/app/action";
import { TextareaWithText } from "@/components/TextareaWithText";
import { Button } from "@/components/ui/button";
import { useActions } from "ai/rsc";

type DocuPromptProps = {};

const DocuPrompt = ({}: DocuPromptProps): React.JSX.Element => {
  const { submitDocs } = useActions<typeof AI>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const outline = await submitDocs(formData);
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
