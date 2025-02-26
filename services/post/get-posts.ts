import * as v from "@valibot/valibot";
import { isPublishedPost, Post, PostSchema } from "$services/post/post.ts";
import { sortBy } from "@std/collections";

export interface GetPostsHandler {
  getPosts: () => Promise<Post[]>;
}

const WpSiteHost = Deno.env.get("WP_SITE_URL");

export class FetchGetPostsHandler implements GetPostsHandler {
  async getPosts() {
    const response = await fetch(`${WpSiteHost}/wp-json/wp/v2/posts`);
    const text = await respose.text();
    console.log(text);
    const json = await response.json();
    return v.parse(v.array(PostSchema), json);
  }
}

export async function getPosts(handler: GetPostsHandler) {
  const posts = await handler.getPosts();
  const publishedPosts = posts.filter(isPublishedPost);
  return sortBy(publishedPosts, (post) => post.acf.sortOrder, {
    order: "desc",
  });
}
