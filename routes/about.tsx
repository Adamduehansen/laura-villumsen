import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
// TODO: Create alias for page services.
import { getPage, Page } from "../services/page-services.ts";
import { Head } from "$fresh/runtime.ts";
import { parseBlocks } from "$utils/parse-blocks.ts";
import { Blocks } from "$component/blocks.tsx";

interface Props {
  page: Page;
}

export const handler: Handlers<Props> = {
  GET: async function (_req, ctx) {
    const page = await getPage("about");
    if (page === null) {
      return ctx.renderNotFound();
    }

    return ctx.render({
      page: page,
    });
  },
};

export default function About({ data }: PageProps<Props>): JSX.Element {
  const { page } = data;
  const blocks = parseBlocks(page.content.rendered);

  return (
    <div class="lg:mt-20">
      <Head>
        <title>About | Laura Villumsen, Graphic Designer</title>
      </Head>
      <div class="flex flex-col gap-y-3">
        <Blocks blocks={blocks} />
      </div>
    </div>
  );
}
