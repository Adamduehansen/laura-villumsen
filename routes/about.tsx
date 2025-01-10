import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
// TODO: Create alias for page services.
import { getPage, Page } from "../services/page-services.ts";
import { Head } from "$fresh/runtime.ts";
import { PostContent } from "$utils/post-content.ts";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";
import { CaseBlock } from "$component/case-content/case-block.tsx";

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
  const pageContent = new PostContent(page.content.rendered);

  return (
    <div class="lg:mt-20">
      <Head>
        <title>About | Laura Villumsen, Graphic Designer</title>
      </Head>
      {pageContent.blocks.map((block) => (
        <Container>
          <Row>
            <Col>
              <CaseBlock block={block} />
            </Col>
          </Row>
        </Container>
      ))}
    </div>
  );
}
