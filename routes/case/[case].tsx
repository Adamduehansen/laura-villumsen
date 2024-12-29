import { FreshContext } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { getPost } from "../../services/post-service.ts";
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

export default async function Case(
  _req: Request,
  ctx: FreshContext,
): Promise<JSX.Element> {
  const caseSlug = ctx.params.case;
  const post = await getPost(caseSlug);

  const postContent = new PostContent(post.content.rendered);

  return (
    <div>
      <Image
        src={post.featuredImage.url}
        width={post.featuredImage.width}
        height={post.featuredImage.height}
        alt={post.featuredImage.alt ?? ""}
      />
      <Container fluid>
        <Row>
          <Col>
            <p>
              {postContent.intro}
            </p>
            <p>
              {postContent.text}
            </p>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
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
      {postContent.blocks.map((block): JSX.Element | never => {
        switch (block.type) {
          case "video":
            return <video autoplay loop src={block.src}></video>;
          case "image":
            return <Image src={block.src} />;
          case "text":
            return <p>{block.text}</p>;
          case "two-columns": {
            const { left, right } = block;
            return (
              <Container fluid>
                <Row>
                  <Col lg={6}>
                    {left?.type === "image" && (
                      <Image src={left.src} alt={left.alt} />
                    )}
                    {left?.type === "text" && <p>{left.text}</p>}
                    {left?.type === "video" && (
                      <video autoplay loop src={left.src}></video>
                    )}
                  </Col>
                  <Col lg={6}>
                    {right?.type === "image" && (
                      <Image src={right.src} alt={right.alt} />
                    )}
                    {right?.type === "text" && <p>{right.text}</p>}
                    {right?.type === "video" && (
                      <video autoplay loop src={right.src}></video>
                    )}
                  </Col>
                </Row>
              </Container>
            );
          }
        }
      })}
    </div>
  );
}
