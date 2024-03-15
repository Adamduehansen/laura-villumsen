import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { z } from 'zod';
import { Repository } from './Repository';
import workTeaserQuery from './workTeasers.graphql';

export type WorkTeaser = {
  id: string;
  title: string;
  uri: string;
  client: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const workTeasersSchema = z.object({
  posts: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        uri: z.string(),
        featuredImage: z.object({
          node: z.object({
            sourceUrl: z.string(),
            altText: z.string(),
            mediaDetails: z.object({
              height: z.number(),
              width: z.number(),
            }),
          }),
        }),
        workData: z.object({
          client: z.string(),
        }),
      }),
    ),
  }),
});

export class WorkRepository extends Repository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client);
  }

  async getTeasers(): Promise<WorkTeaser[]> {
    const response = await this.client.query({
      query: workTeaserQuery,
      fetchPolicy: 'no-cache',
    });

    const workTeasers = workTeasersSchema.parse(response.data);
    return workTeasers.posts.nodes.map((node): WorkTeaser => {
      return {
        id: node.id,
        title: node.title,
        uri: node.uri,
        client: node.workData.client,
        image: {
          src: node.featuredImage.node.sourceUrl,
          alt: node.featuredImage.node.altText,
          height: node.featuredImage.node.mediaDetails.height,
          width: node.featuredImage.node.mediaDetails.width,
        },
      };
    });
  }
}
