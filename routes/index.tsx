import { JSX } from "preact/jsx-runtime";
import { getPosts } from "../services/post-service.ts";
import { Head } from "$fresh/runtime.ts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post): JSX.Element => {
        return (
          <>
            <Head>
              <link rel="preload" as="image" href={post.featuredImage.url} />
            </Head>
            <a href={post.link} class="w-full block">
              <img
                src={post.featuredImage.url}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                alt={post.featuredImage.alt ?? ""}
                decoding="async"
              />
              <div>{post.acf.client}</div>
              <div>{post.acf.frontpageText}</div>
            </a>
          </>
        );
      })}
    </div>
  );
}
