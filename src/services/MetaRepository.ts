import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { z } from 'zod';
import { Repository } from './Repository';
import inquiriesQuery from './inquiries.graphql';

const inquiriesSchema = z.object({
  menus: z.object({
    nodes: z.array(
      z.object({
        inquiriesMenu: z.object({
          inquiries: z.string(),
        }),
      }),
    ),
  }),
});

export class MetaRepository extends Repository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client);
  }

  async getInquiriesText(): Promise<string> {
    const response = await this.client.query({
      query: inquiriesQuery,
      fetchPolicy: 'no-cache',
    });

    const { menus } = inquiriesSchema.parse(response.data);

    return menus.nodes[0].inquiriesMenu.inquiries;
  }
}
