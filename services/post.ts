import { api } from "./client.ts";

export interface Post {
  id: string;
  title: {
    rendered: string;
  };
  link: string;
  acf: {
    types: string;
    client: string;
    website: string;
    frontpage_text: string;
    frontpage_color: string;
  };
  "_embedded": {
    "wp:featuredmedia": {
      source_url: string;
    }[];
  };
}

export async function getAllPosts(): Promise<Post[]> {
  return await api.get("wp-json/wp/v2/posts?_embed").json();
}
