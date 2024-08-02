import { getAllPosts, Post } from "../services/post.ts";

type WorkTeaser = {
  client: string;
  types: string;
  frontpageText: string;
  frontpageColor: string;
  imageUrl: string;
  path: string;
};

function transformPostToWorkTeaser(post: Post): WorkTeaser {
  return {
    imageUrl: post.featuredImage.node.sourceUrl,
    client: post.workData.client,
    frontpageColor: post.workData.frontpageColor,
    frontpageText: post.workData.frontpageText,
    path: new URL(post.link).pathname,
    types: post.workData.types,
  };
}

export async function getWorkTeasers(): Promise<WorkTeaser[]> {
  const posts = await getAllPosts();
  return posts.map(transformPostToWorkTeaser);
}
