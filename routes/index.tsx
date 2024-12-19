import { JSX } from "preact/jsx-runtime";
import { getPosts } from "../services/post-service.ts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post): JSX.Element => {
        return (
          <a href={post.link} class="w-full block">
            <img
              src={post.featuredImageUrl}
              alt=""
              decoding="async"
            />
            <div>{post.acf.client}</div>
            <div>{post.acf.frontpageText}</div>
          </a>
        );
      })}
    </div>
  );
}
