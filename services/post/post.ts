import * as v from "@valibot/valibot";

function formatDateString(input: string) {
  if (input.length !== 8) {
    throw new Error(
      "Input must be an 8-character string in the format YYYYMMDD",
    );
  }
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  return `${year}-${month}-${day}`;
}

const AcfSchema = v.pipe(
  v.object({
    client: v.string(),
    frontpage_text: v.string(),
    frontpage_color: v.string(),
    date: v.string(),
    website: v.union([
      v.string(),
      v.object({
        url: v.string(),
      }),
    ]),
    notes: v.string(),
    sort_order: v.number(),
  }),
  v.transform((input) => {
    const {
      frontpage_text,
      frontpage_color,
      website,
      notes,
      date,
      sort_order,
      ...rest
    } = input;
    return {
      ...rest,
      frontpageText: frontpage_text,
      website: typeof website === "string" ? null : website.url,
      notes: notes !== "" ? notes.split(", ") : [],
      frontpageColor: frontpage_color,
      date: formatDateString(date),
      sortOrder: sort_order,
    };
  }),
);

export const PostSchema = v.pipe(
  v.object({
    id: v.number(),
    date: v.string(),
    featured_image: v.nullable(
      v.object({
        url: v.string(),
        alt: v.nullable(v.string()),
        width: v.number(),
        height: v.number(),
      }),
    ),
    title: v.object({
      rendered: v.string(),
    }),
    featured_video: v.nullable(
      v.object({
        url: v.string(),
        type: v.string(),
      }),
    ),
    tag_names: v.array(v.string()),
    acf: AcfSchema,
    content: v.object({
      rendered: v.string(),
    }),
    excerpt: v.object({
      rendered: v.string(),
    }),
    link: v.string(),
    status: v.string(),
  }),
  v.transform((input) => {
    const { featured_image, tag_names, status, featured_video, ...rest } =
      input;
    return {
      ...rest,
      tagNames: tag_names,
      featuredImage: featured_image,
      published: status === "publish",
      featuredVideoUrl: featured_video !== null ? featured_video.url : null,
    };
  }),
);

export type Post = v.InferOutput<typeof PostSchema>;

export function isPublishedPost(post: Post): boolean {
  return post.published;
}
