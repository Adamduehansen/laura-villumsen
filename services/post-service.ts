import * as v from "@valibot/valibot";

const PostSchema = v.pipe(
  v.object({ id: v.number(), featured_image_url: v.string() }),
  v.transform((input) => {
    const { featured_image_url, ...rest } = input;
    return {
      ...rest,
      featuredImageUrl: featured_image_url,
    };
  }),
);

export type Post = v.InferOutput<typeof PostSchema>;
