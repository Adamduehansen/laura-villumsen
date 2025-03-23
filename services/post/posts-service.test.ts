import { assertEquals } from "@std/assert";
import { PostsRepository, PostsService } from "$services/post/posts-service.ts";
import { Post } from "$services/post/post.ts";

Deno.test("Should only show published posts", async () => {
  // Arrange
  const postsRepository: PostsRepository = {
    getPosts: function (): Promise<Post[]> {
      return Promise.resolve([
        {
          title: {
            rendered: "any-rendered-1",
          },
          acf: {
            client: "any-client",
            date: "any-date",
            frontpageColor: "any-frontpage-color",
            frontpageText: "any-frontpage-text",
            notes: [],
            sortOrder: 0,
            website: null,
          },
          content: {
            rendered: "any-rendered",
          },
          date: "any-date",
          excerpt: {
            rendered: "any-rendered",
          },
          featuredImage: null,
          featuredVideoUrl: null,
          id: 0,
          link: "any-link",
          published: true,
          tagNames: [],
        },
        {
          title: {
            rendered: "any-rendered-2",
          },
          acf: {
            client: "any-client",
            date: "any-date",
            frontpageColor: "any-frontpage-color",
            frontpageText: "any-frontpage-text",
            notes: [],
            sortOrder: 0,
            website: null,
          },
          content: {
            rendered: "any-rendered",
          },
          date: "any-date",
          excerpt: {
            rendered: "any-rendered",
          },
          featuredImage: null,
          featuredVideoUrl: null,
          id: 0,
          link: "any-link",
          published: false,
          tagNames: [],
        },
      ]);
    },
  };
  const postsService = new PostsService(postsRepository);

  // Act
  const posts = await postsService.getPosts();

  // Assert
  assertEquals(posts.length, 1);
  assertEquals(posts[0].title.rendered, "any-rendered-1");
});

Deno.test("should sort posts by act.sortOrder desc", async () => {
  // Arrange
  const postsRepository: PostsRepository = {
    getPosts: function (): Promise<Post[]> {
      return Promise.resolve([
        {
          title: {
            rendered: "any-rendered-1",
          },
          acf: {
            client: "any-client",
            date: "any-date",
            frontpageColor: "any-frontpage-color",
            frontpageText: "any-frontpage-text",
            notes: [],
            sortOrder: 1,
            website: null,
          },
          content: {
            rendered: "any-rendered",
          },
          date: "any-date",
          excerpt: {
            rendered: "any-rendered",
          },
          featuredImage: null,
          featuredVideoUrl: null,
          id: 0,
          link: "any-link",
          published: true,
          tagNames: [],
        },
        {
          title: {
            rendered: "any-rendered-2",
          },
          acf: {
            client: "any-client",
            date: "any-date",
            frontpageColor: "any-frontpage-color",
            frontpageText: "any-frontpage-text",
            notes: [],
            sortOrder: 2,
            website: null,
          },
          content: {
            rendered: "any-rendered",
          },
          date: "any-date",
          excerpt: {
            rendered: "any-rendered",
          },
          featuredImage: null,
          featuredVideoUrl: null,
          id: 0,
          link: "any-link",
          published: true,
          tagNames: [],
        },
      ]);
    },
  };
  const postsService = new PostsService(postsRepository);

  // Act
  const posts = await postsService.getPosts();

  //Assert
  assertEquals(posts.length, 2);
  assertEquals(posts[0].title.rendered, "any-rendered-2");
  assertEquals(posts[1].title.rendered, "any-rendered-1");
});
