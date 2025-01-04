import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { getPost, Post } from "../../services/post-service.ts";
import { Image } from "$component/image.tsx";
import { PostContent } from "$utils/post-content.ts";
import { Col } from "$component/layout/col.tsx";
import { Row } from "$component/layout/row.tsx";
import { Container } from "$component/layout/container.tsx";
import { CaseNotes } from "$component/case-content/case-notes.tsx";
import { CaseWebsite } from "$component/case-content/case-website.tsx";
import { CaseServices } from "$component/case-content/case-services.tsx";
import { CaseYear } from "$component/case-content/case-year.tsx";
import { CaseClient } from "$component/case-content/case-client.tsx";
import { CaseBlock } from "$component/case-content/case-block.tsx";
import { Head } from "$fresh/runtime.ts";

interface Props {
  post: Post;
}

export const handler: Handlers<Props> = {
  GET: async function (_reg, ctx) {
    const caseSlug = ctx.params.case;
    const post = await getPost(caseSlug);
    if (post === null) {
      return ctx.renderNotFound();
    }
    return ctx.render({
      post: post,
    });
  },
};

export default function Case({ data }: PageProps<Props>): JSX.Element {
  const { post } = data;

  const postContent = new PostContent(post.content.rendered);

  return (
    <>
      <Head>
        <title>{post.title.rendered} | Laura Villumsen, Graphic Designer</title>
      </Head>
      <Container fluid>
        <Row>
          <Col>
            <Image
              src={post.featuredImage.url}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              alt={post.featuredImage.alt ?? ""}
            />
          </Col>
        </Row>
      </Container>
      <div class="flex flex-col gap-y-3">
        {postContent.blocks.map((block): JSX.Element | never => {
          if (block.type === "case-info") {
            return (
              <Container>
                <Row className="gap-3">
                  <Col sm={6} lg={2}>
                    <CaseClient client={post.acf.client} />
                  </Col>
                  <Col sm={6} lg={2}>
                    <CaseYear date={post.acf.date} />
                  </Col>
                  <Col sm={6} lg={2}>
                    <CaseServices services={post.tagNames} />
                  </Col>
                  <Col sm={6} lg={2}>
                    <CaseWebsite website={post.acf.website} />
                  </Col>
                  <Col sm={6} lg={2}>
                    <CaseNotes notes={post.acf.notes} />
                  </Col>
                </Row>
              </Container>
            );
          }

          return (
            <Container fluid>
              <Row className="lg:gap-x-3">
                <CaseBlock block={block} />
              </Row>
            </Container>
          );
        })}
      </div>
    </>
  );
}
