import * as v from "@valibot/valibot";

const AcfSchema = v.pipe(
  v.object({
    client: v.string(),
    frontpage_text: v.string(),
    date: v.string(),
    website: v.string(),
    notes: v.string(),
  }),
  v.transform((input) => {
    const { frontpage_text, website, notes, ...rest } = input;
    return {
      ...rest,
      frontpageText: frontpage_text,
      website: website !== "" ? website : null,
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
  }),
  v.transform((input) => {
    const { featured_image, tag_names, ...rest } = input;
    return {
      ...rest,
      tagNames: tag_names,
      featuredImage: featured_image,
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
  return posts;
}

export async function getPost(slug: string): Promise<Post> {
  const response = await fetch(
    `${WpSiteHost}/wp-json/wp/v2/posts?slug=${slug}`,
  );
  const json = await response.json();
  const post = v.parse(
    v.array(PostSchema),
    json,
  )[0];
  return post;
}