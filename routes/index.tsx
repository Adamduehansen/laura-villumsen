import { JSX } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import classNames from "classnames";
import { getPosts } from "../services/post-service.ts";
import { Image } from "$component/image.tsx";
import { CaseLink } from "$component/case-link.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";

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
                <CaseLink link={post.link}>
                  <Image
                    src={post.featuredImage.url}
                    width={post.featuredImage.width}
                    height={post.featuredImage.height}
                    alt={post.featuredImage.alt ?? ""}
                  />
                  <Container
                    className={classNames(
                      "absolute bottom-3 left-3 text-xs w-full",
                      {
                        "text-white": post.acf.frontpageColor === "white",
                      },
                    )}
                  >
                    <Row>
                      <Col sm={4}>{post.acf.client}</Col>
                      <Col sm={4}>
                        {post.acf.frontpageText}
                      </Col>
                    </Row>
                  </Container>
                </CaseLink>
              </Col>
            </Row>
          </Container>
        );
      })}
    </div>
  );
}
