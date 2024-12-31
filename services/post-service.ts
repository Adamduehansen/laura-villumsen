import { yellow } from "@std/fmt/colors";
import * as v from "@valibot/valibot";

const AcfSchema = v.pipe(
  v.object({
    client: v.string(),
    frontpage_text: v.string(),
    date: v.string(),
    website: v.union([
      v.string(),
      v.object({
        url: v.string(),
      }),
    ]),
    notes: v.string(),
  }),
  v.transform((input) => {
    const { frontpage_text, website, notes, ...rest } = input;
    return {
      ...rest,
      frontpageText: frontpage_text,
      website: typeof website === "string" ? null : website.url,
      notes: notes.split(", "),
    };
  }),
);

const PostSchema = v.pipe(
  v.object({
    id: v.number(),
    featured_image: v.object({
      url: v.string(),
      alt: v.nullable(v.string()),
      width: v.number(),
      height: v.number(),
    }),
    tag_names: v.array(v.string()),
    acf: AcfSchema,
    content: v.object({
      rendered: v.string(),
    }),
    link: v.string(),
    status: v.string(),
  }),
  v.transform((input) => {
    const { featured_image, tag_names, status, ...rest } = input;
    return {
      ...rest,
      tagNames: tag_names,
      featuredImage: featured_image,
      published: status === "publish",
    };
  }),
);

export type Post = v.InferOutput<typeof PostSchema>;

const WpSiteHost = Deno.env.get("WP_SITE_URL");

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    `${WpSiteHost}/wp-json/wp/v2/posts`,
  );
  const json = await response.json();
  const posts = v.parse(v.array(PostSchema), json);
  return posts.filter((post) => post.published);
}

export async function getPost(slug: string): Promise<Post> {
  const url = new URL(`${WpSiteHost}/wp-json/wp/v2/posts?slug=${slug}`);
  // TODO: move this to middleware once possible.
  console.log("Case URL is", yellow(url.toString()));
  const response = await fetch(url);
  const json = await response.json();
  const post = v.parse(
    v.array(PostSchema),
    json,
  )[0];
  return post;
}
