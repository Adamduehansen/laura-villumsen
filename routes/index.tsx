import { JSX } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";
import { CaseTeaser } from "$component/case-teaser.tsx";
import { PostsService } from "$services/post/posts-service.ts";
import { Post } from "$services/post/post.ts";

function getGroupedPosts(arr: Post[]) {
  const pattern = [2, 1];
  const result = [];
  let index = 0;

  while (index < arr.length) {
    for (let i = 0; i < pattern.length && index < arr.length; i++) {
      result.push(arr.slice(index, index + pattern[i])); // Slice based on pattern
      index += pattern[i]; // Move the index forward by the current pattern value
    }
  }

  return result;
}

const postsService = new PostsService();

export default async function Home() {
  const posts = await postsService.getPosts();
  const groupedPosts = getGroupedPosts(posts);

  return (
    <div class="flex flex-col gap-y-3 lg:mt-20">
      <Head>
        <title>Laura Villumsen, Graphic Designer</title>
        <meta name="description" content="Laura Villumsen, Graphic Designer" />
      </Head>
      {groupedPosts.map((posts): JSX.Element | null => {
        if (posts.length === 2) {
          return (
            <Container fluid>
              <Row className="gap-y-3 lg:gap-x-3">
                <Col lg={6}>
                  <CaseTeaser post={posts[0]} />
                </Col>
                <Col lg={6}>
                  <CaseTeaser post={posts[1]} />
                </Col>
              </Row>
            </Container>
          );
        } else if (posts.length === 1) {
          return (
            <Container fluid>
              <Row>
                <Col>
                  <CaseTeaser post={posts[0]} />
                </Col>
              </Row>
            </Container>
          );
        }
        return null;
      })}
    </div>
  );
}
