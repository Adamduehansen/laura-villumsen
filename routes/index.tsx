import { JSX } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { getPosts } from "../services/post-service.ts";
import { Image } from "$component/image.tsx";

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
            {/* TODO: use pathname instead of link */}
            <a href={post.link} class="w-full block">
              <Image
                src={post.featuredImage.url}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                alt={post.featuredImage.alt ?? ""}
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
