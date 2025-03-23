import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { Head } from "$fresh/runtime.ts";
import { CaseHero } from "$component/case-content/case-hero.tsx";
import { parseBlocks } from "$utils/parse-blocks.ts";
import { Blocks } from "$component/blocks.tsx";
import { Block } from "$utils/block.ts";
import { CaseInfoBlockCreator } from "$utils/block-factory.ts";
import { Post } from "$services/post/post.ts";
import { PostService } from "$services/post/post-service.ts";

interface Props {
  post: Post;
}

const postService = new PostService();

export const handler: Handlers<Props> = {
  GET: async function (_reg, ctx) {
    const caseSlug = ctx.params.case;
    const post = await postService.getPost(caseSlug);
    if (post === null) {
      return ctx.renderNotFound();
    }
    return ctx.render({
      post: post,
    });
  },
};

export default function Case({ data, url }: PageProps<Props>): JSX.Element {
  const { post } = data;

  const blocks = parseBlocks(post.content.rendered).map((block): Block => {
    if (block.type !== "case-info") {
      return block;
    }
    const caseInfoBlockCreator = new CaseInfoBlockCreator(post);
    return caseInfoBlockCreator.create();
  });

  const description = post.excerpt.rendered
    .replace("<p>", "")
    .replace("</p>", "");

  return (
    <div class="lg:mt-20">
      <Head>
        <title>{post.title.rendered} | Laura Villumsen, Graphic Designer</title>
        <meta
          name="description"
          content={description}
        />
        <meta property="og:title" content={post.title.rendered} />
        <meta property="og:description" content={description} />
        {post.featuredImage !== null && (
          <>
            <meta property="og:image" content={post.featuredImage.url} />
            {post.featuredImage.alt !== null && (
              <meta property="og:image" content={post.featuredImage.alt} />
            )}
          </>
        )}
        <meta property="og:url" content={url.href} />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Laura Villumsen, Graphic Designer"
        />
      </Head>
      {post.featuredImage !== null && (
        <CaseHero variant="image" {...post.featuredImage} />
      )}
      {post.featuredVideoUrl !== null && (
        <CaseHero variant="video" src={post.featuredVideoUrl} />
      )}
      <div class="flex flex-col gap-y-3">
        <Blocks blocks={blocks} />
      </div>
    </div>
  );
}
