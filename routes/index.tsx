import { JSX } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { getPosts } from "../services/post-service.ts";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";
import { CaseTeaser } from "$component/case-teaser.tsx";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div class="flex flex-col gap-y-3">
      <Head>
        <title>Laura Villumsen, Graphic Designer</title>
      </Head>
      {posts.map((post): JSX.Element => {
        return (
          <Container fluid className="relative">
            <Row>
              <Col>
                <CaseTeaser post={post} />
              </Col>
            </Row>
          </Container>
        );
      })}
    </div>
  );
}
