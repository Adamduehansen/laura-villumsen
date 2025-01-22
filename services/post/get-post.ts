import { Post, PostSchema } from "$services/post/post.ts";
import * as v from "@valibot/valibot";

export interface GetPostHandler {
  getPost: () => Promise<Post | null>;
}

const WpSiteHost = Deno.env.get("WP_SITE_URL");

export class FetchGetPostHandler implements GetPostHandler {
  constructor(private slug: string) {}

  async getPost() {
    const url = new URL(`${WpSiteHost}/wp-json/wp/v2/posts?slug=${this.slug}`);
    const response = await fetch(url);
    const json = await response.json();
    const parsedPosts = v.parse(v.array(PostSchema), json);

    if (parsedPosts.length === 0) {
      return null;
    }

    if (parsedPosts.length > 1) {
      throw new Error(`Found more that one post for slug ${this.slug}`);
    }

    return parsedPosts[0];
  }
}

export async function getPost(handler: GetPostHandler): Promise<Post | null> {
  return await handler.getPost();
}
