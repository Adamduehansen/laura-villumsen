import { JSX } from "preact/jsx-runtime";
import classNames from "classnames";
import { Post } from "../services/post-service.ts";
import { CaseLink } from "$component/case-link.tsx";
import { Col } from "$component/layout/col.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Image } from "$component/image.tsx";

interface Props {
  post: Post;
}

export function CaseTeaser({ post }: Props): JSX.Element {
  return (
    <CaseLink link={post.link}>
      {post.featuredImage !== null && (
        <Image
          src={post.featuredImage.url}
          width={post.featuredImage.width}
          height={post.featuredImage.height}
          alt={post.featuredImage.alt ?? ""}
          class="w-full"
        />
      )}
      {post.featuredVideoUrl !== null && (
        <video autoplay loop muted src={post.featuredVideoUrl} />
      )}
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
  );
}
