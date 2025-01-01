import { JSX } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { getPosts } from "../services/post-service.ts";
import { Image } from "$component/image.tsx";
import { CaseLink } from "$component/case-link.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Head>
        <title>Laura Villumsen, Graphic Designer</title>
      </Head>
      {posts.map((post): JSX.Element => {
        return (
          <Container fluid>
            <Row>
              <Col>
                <CaseLink link={post.link}>
                  <Image
                    src={post.featuredImage.url}
                    width={post.featuredImage.width}
                    height={post.featuredImage.height}
                    alt={post.featuredImage.alt ?? ""}
                  />
                  <div>{post.acf.client}</div>
                  <div>{post.acf.frontpageText}</div>
                </CaseLink>
              </Col>
            </Row>
          </Container>
        );
      })}
    </>
  );
}
