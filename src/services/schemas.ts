import z from 'zod';

export const featuredImageSchema = z.object({
  node: z.object({
    sourceUrl: z.string(),
    altText: z.string(),
    mediaDetails: z.object({
      height: z.number(),
      width: z.number(),
    }),
  }),
});

export const menuItemWPGraphQLSchema = z.object({
  id: z.string(),
  label: z.string(),
  uri: z.string(),
});

export const menuWPGraphQLSchema = z.object({
  name: z.string(),
  menuItems: z.object({
    nodes: menuItemWPGraphQLSchema.array(),
  }),
});

export type MenuWPGraphQLSchema = z.infer<typeof menuWPGraphQLSchema>;

export const generalSettingsWPGraphQLSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const pageDataWPGraphQLResponseSchema = z.object({
  data: z.object({
    page: z
      .object({
        title: z.string(),
        content: z.string().nullable(),
        featuredImage: featuredImageSchema.nullable(),
      })
      .nullable(),
    menus: z.object({
      nodes: menuWPGraphQLSchema.array(),
    }),
    generalSettings: generalSettingsWPGraphQLSchema,
  }),
});

export const sitemapNodeWPGraphQLResponseSchema = z.object({
  uri: z.string(),
  date: z.string(),
});

export const sitemapWPGraphQLResponseSchema = z.object({
  data: z.object({
    posts: z.object({
      nodes: sitemapNodeWPGraphQLResponseSchema.array(),
    }),
    pages: z.object({
      nodes: sitemapNodeWPGraphQLResponseSchema.array(),
    }),
  }),
});

export const postDataWPGraphQLResponse = z.object({
  data: z.object({
    post: z
      .object({
        title: z.string(),
        content: z.string(),
        tags: z.object({
          nodes: z
            .object({
              id: z.string(),
              name: z.string(),
            })
            .array(),
        }),
        workData: z.object({
          date: z.string(),
          types: z.string(),
        }),
      })
      .nullable(),
    menus: z.object({
      nodes: menuWPGraphQLSchema.array(),
    }),
    generalSettings: generalSettingsWPGraphQLSchema,
  }),
});

export const workTeaserWPGraphQLResponseSchema = z.object({
  data: z.object({
    posts: z.object({
      nodes: z
        .object({
          id: z.string(),
          title: z.string(),
          uri: z.string(),
          featuredImage: featuredImageSchema.nullable(),
          workData: z.object({
            date: z.string(),
          }),
        })
        .array(),
    }),
  }),
});

export const workTeaserPathGraphQLResponseSchema = z.object({
  data: z.object({
    posts: z.object({
      nodes: z
        .object({
          uri: z.string(),
        })
        .array(),
    }),
  }),
});
