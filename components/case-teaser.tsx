import { JSX } from "preact/jsx-runtime";
import classNames from "classnames";
import { Col } from "$component/layout/col.tsx";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Image } from "$component/image.tsx";
import { Video } from "$component/video.tsx";
import { Post } from "$services/post/post.ts";

interface Props {
  post: Post;
}

export function CaseTeaser({ post }: Props): JSX.Element {
  const url = new URL(post.link);

  return (
    <div class="relative">
      <div class="overflow-hidden group">
        <a
          href={url.pathname}
          class="block scale-100 lg:duration-700 lg:ease-out lg:group-hover:scale-105"
          aria-label={post.title.rendered}
        >
          {post.featuredImage !== null && (
            // TODO: adds sizes and srcset
            <Image
              src={post.featuredImage.url}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
              alt={post.featuredImage.alt ?? ""}
              class="w-full"
            />
          )}
          {post.featuredVideoUrl !== null && (
            <Video src={post.featuredVideoUrl} />
          )}
        </a>
        <Container
          className={classNames(
            "absolute bottom-0 inset-x-0 text-xs pb-[10px] lg:opacity-0 lg:duration-700 lg:group-hover:opacity-100 mx-grid lg:text-sm",
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
      </div>
    </div>
  );
}
