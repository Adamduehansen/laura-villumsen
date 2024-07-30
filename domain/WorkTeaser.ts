import { getAllPosts, Post } from "../api/post.ts";

type WorkTeaser =
  & Pick<
    Post["acf"],
    "client" | "types"
  >
  & {
    frontpageText: string;
    frontpageColor: string;
    imageUrl: string;
    path: string;
  };

function transformPostToWorkTeaser(post: Post): WorkTeaser {
  return {
    ...post.acf,
    frontpageColor: post.acf.frontpage_color,
    frontpageText: post.acf.frontpage_text,
    imageUrl: post._embedded["wp:featuredmedia"][0].source_url,
    path: new URL(post.link).pathname,
  };
}

export async function getWorkTeasers(): Promise<WorkTeaser[]> {
  const posts = await getAllPosts();
  return posts.map(transformPostToWorkTeaser);
}
