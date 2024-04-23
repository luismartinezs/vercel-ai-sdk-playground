import { DeepPartial } from "ai";
import { z } from "zod";

export const outlineSchema = z.object({
  title: z.string().describe("The title of the outline"),
  outline: z
    .array(
      z.object({
        title: z.string(),
        details: z
          .array(z.string())
          .max(3)
          .describe("The details of this bullet point"),
      })
    )
    .describe("The bullet points of the outline"),
});

export type PartialOutline = DeepPartial<typeof outlineSchema>;
