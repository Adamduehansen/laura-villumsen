import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { z } from 'zod';
import contactQuery from './Contact.graphql';
import metaQuery from './Meta.graphql';
import { Repository } from './Repository';

const contactSchema = z.object({
  menus: z.object({
    nodes: z.array(
      z.object({
        inquiriesMenu: z.object({
          inquiries: z.string(),
          email: z.string(),
          phone: z.string(),
        }),
      }),
    ),
  }),
});

type Contact = {
  inquiries: string;
  email: string;
  phone: string;
};

const metaSchema = z.object({
  generalSettings: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

type MetaData = {
  title: string;
  description: string;
};

export class MetaRepository extends Repository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client);
  }

  async getContactInfo(): Promise<Contact> {
    const response = await this.client.query({
      query: contactQuery,
      fetchPolicy: 'no-cache',
    });

    const { menus } = contactSchema.parse(response.data);

    const menu = menus.nodes[0].inquiriesMenu;

    return {
      inquiries: menu.inquiries,
      email: menu.email,
      phone: menu.phone,
    };
  }

  async getMetaData(): Promise<MetaData> {
    const response = await this.client.query({
      query: metaQuery,
      fetchPolicy: 'no-cache',
    });

    const { generalSettings } = metaSchema.parse(response.data);

    return {
      title: generalSettings.title,
      description: generalSettings.description,
    };
  }
}
