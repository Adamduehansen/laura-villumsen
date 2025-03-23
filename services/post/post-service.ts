import * as v from "@valibot/valibot";
import { Post, PostSchema } from "$services/post/post.ts";

export interface PostRepository {
  getPost: (slug: string) => Promise<Post | null>;
}

/**
 * Uses HTTP to get a post.
 */
export class HttpPostRepository implements PostRepository {
  async getPost(slug: string): Promise<Post | null> {
    const url = new URL(`${WpSiteHost}/wp-json/wp/v2/posts?slug=${slug}`);
    const response = await fetch(url);
    const json = await response.json();
    const parsedPosts = v.parse(v.array(PostSchema), json);

    if (parsedPosts.length === 0) {
      return null;
    }

    if (parsedPosts.length > 1) {
      throw new Error(`Found more that one post for slug ${slug}`);
    }

    return parsedPosts[0];
  }
}

const WpSiteHost = Deno.env.get("WP_SITE_URL");

/**
 * Service for handling a getting a single post.
 */
export class PostService {
  #postRepository: PostRepository = new HttpPostRepository();

  async getPost(slug: string): Promise<Post | null> {
    return await this.#postRepository.getPost(slug);
  }
}
