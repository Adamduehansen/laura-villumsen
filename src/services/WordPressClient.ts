import { raise } from '@/utils/raise';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { z } from 'zod';
import { MenuRepository } from './MenuRepository';

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

export class WordPressClient {
  menu: MenuRepository;

  constructor() {
    const siteUrl =
      process.env.WP_SITE_URL ??
      raise('Environment variable WP_SITE_URL was not defined');

    const client = new ApolloClient({
      uri: `${siteUrl}/index.php?graphql`,
      cache: new InMemoryCache(),
    });

    this.menu = new MenuRepository(client);
  }
}

export const wordPressClient = new WordPressClient();
