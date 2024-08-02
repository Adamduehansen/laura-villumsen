import { api } from "./client.ts";
import * as v from "@valibot/valibot";

// export interface Post {
//   id: string;
//   title: {
//     rendered: string;
//   };
//   link: string;
//   acf: {
//     types: string;
//     client: string;
//     website: string;
//     frontpage_text: string;
//     frontpage_color: string;
//   };
//   "_embedded": {
//     "wp:featuredmedia": {
//       source_url: string;
//     }[];
//   };
// }

const query = `
{
  posts {
    nodes {
      id
      title
      link
      workData {
        types
        client
        website {
          target
          title
          url
        }
        frontpageText
        frontpageColor
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

const PostResponseSchema = v.object({
  data: v.object({
    posts: v.object({
      nodes: v.array(v.object({
        id: v.string(),
        title: v.string(),
        link: v.string(),
        workData: v.object({
          types: v.string(),
          client: v.string(),
          website: v.nullable(v.object({
            target: v.string(),
            title: v.string(),
            url: v.string(),
          })),
          frontpageText: v.string(),
          frontpageColor: v.string(),
        }),
        featuredImage: v.object({
          node: v.object({
            sourceUrl: v.string(),
          }),
        }),
      })),
    }),
  }),
});

type PostResponse = v.InferOutput<typeof PostResponseSchema>;
export type Post = PostResponse["data"]["posts"]["nodes"][number];

export async function getAllPosts(): Promise<Post[]> {
  const body = {
    query: query,
    variables: null,
  };

  const postsResult = await api.post("index.php?graphql", {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).json();

  console.log(postsResult);

  const result = v.parse(PostResponseSchema, postsResult);
  return result.data.posts.nodes;
}
