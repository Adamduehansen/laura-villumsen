import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact/jsx-runtime";
import { CaseHero } from "$component/case-content/case-hero.tsx";
import { parseBlocks } from "$utils/parse-blocks.ts";
import { Blocks } from "$component/blocks.tsx";
import { Block } from "$utils/block.ts";
import { CaseInfoBlockCreator } from "$utils/block-factory.ts";
import { Post } from "$services/post/post.ts";
import { PostService } from "$services/post/post-service.ts";
import { CaseMeta } from "$component/case-content/case-meta.tsx";

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

  return (
    <div class="lg:mt-20">
      <CaseMeta
        title={post.title.rendered}
        description={post.excerpt.rendered
          .replace("<p>", "")
          .replace("</p>", "")}
        ogImageUrl={post.featuredImage?.url ?? null}
        ogImageAlt={post.featuredImage?.alt ?? null}
        ogUrl={url.href}
      />
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
