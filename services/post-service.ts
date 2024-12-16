import * as v from "@valibot/valibot";

const AcfSchema = v.pipe(
  v.object({
    client: v.string(),
    frontpage_text: v.string(),
  }),
  v.transform((input) => {
    const { frontpage_text, ...rest } = input;
    return {
      ...rest,
      frontpageText: frontpage_text,
    };
  }),
);

const PostSchema = v.pipe(
  v.object({
    id: v.number(),
    featured_image_url: v.string(),
    acf: AcfSchema,
  }),
  v.transform((input) => {
    const { featured_image_url, ...rest } = input;
    return {
      ...rest,
      featuredImageUrl: featured_image_url,
    };
  }),
);

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://wp.lauravillumsen.dk/wp-json/wp/v2/posts",
  );
  const json = await response.json();
  const posts = v.parse(v.array(PostSchema), json);
  return posts;
}

export type Post = v.InferOutput<typeof PostSchema>;
