import * as v from "@valibot/valibot";
import { isPublishedPost, Post, PostSchema } from "$services/post/post.ts";
import { sortBy } from "@std/collections";

export interface PostsRepository {
  getPosts: () => Promise<Post[]>;
}

export class HttpPostsRepository implements PostsRepository {
  async getPosts(): Promise<Post[]> {
    const WpSiteHost = Deno.env.get("WP_SITE_URL");
    const response = await fetch(`${WpSiteHost}/wp-json/wp/v2/posts`);
    const json = await response.json();
    return v.parse(v.array(PostSchema), json);
  }
}

export class PostsService {
  #postsRepository: PostsRepository;

  constructor(postsRepository?: PostsRepository) {
    this.#postsRepository = postsRepository ?? new HttpPostsRepository();
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.#postsRepository.getPosts();
    const publishedPosts = posts.filter(isPublishedPost);
    return sortBy(publishedPosts, (post) => post.acf.sortOrder, {
      order: "desc",
    });
  }
}
