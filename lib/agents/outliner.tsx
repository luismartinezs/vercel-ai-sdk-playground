import { OpenAI } from '@ai-sdk/openai'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { ExperimentalMessage, experimental_streamObject } from 'ai'
import { PartialOutline, outlineSchema } from '@/lib/schema/outline'
import { env } from '@/env'
import Outline from '@/components/Outline'

export async function outliner(
  uiStream: ReturnType<typeof createStreamableUI>,
  docs: ExperimentalMessage[]
) {
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  })
  const objectStream = createStreamableValue<PartialOutline>()
  uiStream.update(<Outline {...objectStream.value} />)

  let finalOutline: PartialOutline = {}
  await experimental_streamObject({
    model: openai.chat(env.OPENAI_API_MODEL || 'gpt-4-turbo'),
    system: `As an expert in outlining, your objective is to create a meticulously structured outline based on a provided text. Your task involves reading the text thoroughly and then crafting an outline that encompasses all key aspects of the text in a concise yet comprehensive format using bullet points. Each bullet point should be detailed and may include a nested list of up to 3 additional bullet points for further elaboration.

    As a professional outliner, your approach to generating structured outlines from a given text should follow this structured query:
    {
      "title": "the topic of the text",
      "outline": [
        {
          "title": "Main point 1",
          "details": [
            "Subpoint 1",
            "Subpoint 2",
            "Subpoint 3"
          ]
        }
      ],
    }

    For example:
    {
      "title": "Understanding useState in React",
      "outline": [
        {
          "title": "Introduction to useState",
          "details": [
            "Purpose of useState",
            "Basic syntax and usage",
            "Importing and declaring state"
          ]
        },
        {
          "title": "Parameters of useState",
          "details": [
            "initialState explanation",
            "Special behavior for function as initialState",
            "Initializer function role and requirements"
          ]
        }
      ]
    }

    This structure ensures that the outline created covers all essential aspects of the text in a well-organized manner.
    `,
    messages: docs,
    schema: outlineSchema
  })
    .then(async result => {
      for await (const obj of result.partialObjectStream) {
        if (obj) {
          objectStream.update(obj)
          finalOutline = obj
        }
      }
    })
    .finally(() => {
      objectStream.done()
    })

  return finalOutline
}
