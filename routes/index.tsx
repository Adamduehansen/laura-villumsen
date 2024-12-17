import { JSX } from "preact/jsx-runtime";
import { getPosts } from "../services/post-service.ts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post): JSX.Element => {
        return (
          <div class="w-full">
            <img src={post.featuredImageUrl} alt="" />
            <div>{post.acf.client}</div>
            <div>{post.acf.frontpageText}</div>
          </div>
        );
      })}
    </div>
  );
}
