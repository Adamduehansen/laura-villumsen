import { isPublishedPost, Post } from "$services/post/post.ts";
import { sortBy } from "@std/collections";

export type GetPostsHandler = () => Promise<Post[]>;

export async function getPosts(handler: GetPostsHandler) {
  const posts = await handler();
  const publishedPosts = posts.filter(isPublishedPost);
  return sortBy(publishedPosts, (post) => post.acf.sortOrder, {
    order: "desc",
  });
}
