import { GetPostsHandler } from "$services/post/get-posts.ts";
import * as v from "@valibot/valibot";
import { PostSchema } from "$services/post/post.ts";

const WpSiteHost = Deno.env.get("WP_SITE_URL");

export const fetchGetPostsHandler: GetPostsHandler = async function () {
  const response = await fetch(`${WpSiteHost}/wp-json/wp/v2/posts`);
  const json = await response.json();
  return v.parse(v.array(PostSchema), json);
};
