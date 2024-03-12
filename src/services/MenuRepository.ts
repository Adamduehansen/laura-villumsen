import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { z } from 'zod';
import menuQuery from './menu.graphql';

const menuItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  uri: z.string(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

const menuSchema = z.object({
  menus: z.object({
    nodes: z.array(
      z.object({
        menuItems: z.object({
          nodes: menuItemSchema.array(),
        }),
      }),
    ),
  }),
});

export class MenuRepository {
  #client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.#client = client;
  }

  async getMenu(slug: string): Promise<MenuItem[]> {
    const response = await this.#client.query({
      query: menuQuery,
      variables: {
        slug: slug,
      },
      fetchPolicy: 'no-cache',
    });

    const { menus } = menuSchema.parse(response.data);

    return menus.nodes[0].menuItems.nodes;
  }
}
