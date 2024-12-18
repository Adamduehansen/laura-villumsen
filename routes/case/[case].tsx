import { FreshContext } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";

export default async function Case(
  _req: Request,
  ctx: FreshContext,
): Promise<JSX.Element> {
  const caseSlug = ctx.params.case;
  const response = await fetch(
    `https://wp.lauravillumsen.dk/wp-json/wp/v2/posts?slug=${caseSlug}`,
  );
  const json = await response.json();
  return (
    <div>
      <p>Case: {ctx.params.case}</p>
    </div>
  );
}
