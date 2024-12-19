import { FreshContext } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { parse } from "node-html-parser";
import { getPost } from "../../services/post-service.ts";

export default async function Case(
  _req: Request,
  ctx: FreshContext,
): Promise<JSX.Element> {
  const caseSlug = ctx.params.case;
  const post = await getPost(caseSlug);

  const document = parse(post.content.rendered);
  const text = document.querySelector("p");

  console.log(text);

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: text!.innerHTML,
        }}
      >
      </p>
    </div>
  );
}
