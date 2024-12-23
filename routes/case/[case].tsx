import { FreshContext } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { getPost } from "../../services/post-service.ts";
import { Image } from "$component/image.tsx";
import { PostContent } from "$utils/post-content.ts";

export default async function Case(
  _req: Request,
  ctx: FreshContext,
): Promise<JSX.Element> {
  const caseSlug = ctx.params.case;
  const post = await getPost(caseSlug);

  const postContent = new PostContent(post.content.rendered);
  console.log(postContent.blocks);

  return (
    <div>
      <Image
        src={post.featuredImage.url}
        width={post.featuredImage.width}
        height={post.featuredImage.height}
        alt={post.featuredImage.alt ?? ""}
      />
      <p>
        {postContent.intro}
      </p>
      <p>
        {postContent.text}
      </p>
      <div>
        <p>Client</p>
        <p>{post.acf.client}</p>
      </div>
      <div>
        <p>Year</p>
        <p>{post.acf.date.slice(0, 4)}</p>
      </div>
      <div>
        <p>Services</p>
        <ul>
          {post.tagNames.map((tagName) => {
            return <li>{tagName}</li>;
          })}
        </ul>
      </div>
      {post.acf.website !== null && (
        <div>
          <a href={post.acf.website} target="_BLANK" rel="noopener noreferrer">
            View website here
          </a>
        </div>
      )}
      {post.acf.notes.length > 0 && (
        <div>
          <p>Notes</p>
          <ul>
            {post.acf.notes.map((note) => {
              return <li>{note}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
