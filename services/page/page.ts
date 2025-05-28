import * as v from "@valibot/valibot";

export const PageSchema = v.object({
  date: v.string(),
  link: v.string(),
  content: v.object({
    rendered: v.string(),
  }),
});

export type Page = v.InferOutput<typeof PageSchema>;
