import { yellow } from "$std/fmt/colors.ts";
import * as v from "@valibot/valibot";

const PageSchema = v.object({
  date: v.string(),
  link: v.string(),
  content: v.object({
    rendered: v.string(),
  }),
});

export type Page = v.InferOutput<typeof PageSchema>;

const WpSiteHost = Deno.env.get("WP_SITE_URL");

export async function getPage(slug: string): Promise<Page | null> {
  const url = new URL(`${WpSiteHost}/wp-json/wp/v2/pages?slug=${slug}`);
  // TODO: move this to middleware once possible.
  console.log("Page URL is", yellow(url.toString()));
  const response = await fetch(url);
  const json = await response.json();
  const parsedPages = v.parse(v.array(PageSchema), json);

  if (parsedPages.length === 0) {
    return null;
  }

  if (parsedPages.length > 1) {
    throw new Error(`Found more that one page for slug ${slug}`);
  }

  return parsedPages[0];
}
