import * as v from "@valibot/valibot";
import { api } from "./client.ts";

const query = `
{
  socialMenu: menuItems(where: { location: SOCIAL }) {
    nodes {
     	id
      label
      uri 
    }
  }
  navigationMenu: menuItems(where: { location: NAVIGATION}) {
    nodes {
     	id
      label
      uri
    }
  }
  contactMenu: menus(where: { slug: "Contact" }) {
    nodes {
      contactMenu {
        email
        inquiries
        phone
      }
    }
  }
}
`;

const PageResponseSchema = v.object({
  data: v.object({
    socialMenu: v.object({
      nodes: v.array(v.object({
        id: v.string(),
        label: v.string(),
        uri: v.string(),
      })),
    }),
    navigationMenu: v.object({
      nodes: v.array(v.object({
        id: v.string(),
        label: v.string(),
        uri: v.string(),
      })),
    }),
    contactMenu: v.object({
      nodes: v.array(v.object({
        contactMenu: v.object({
          email: v.string(),
          inquiries: v.string(),
          phone: v.string(),
        }),
      })),
    }),
  }),
});

type PageResponse = v.InferOutput<typeof PageResponseSchema>;
export type PageContent = {
  socialMenu: PageResponse["data"]["socialMenu"];
  navigationMenu: PageResponse["data"]["navigationMenu"];
  contactMenu:
    PageResponse["data"]["contactMenu"]["nodes"][number]["contactMenu"];
};

export async function getPageContent(): Promise<PageContent> {
  const body = {
    query: query,
    variaables: null,
  };
  const pageResult = await api.post("index.php?graphql", {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).json();

  const result = v.parse(PageResponseSchema, pageResult);
  return {
    socialMenu: result.data.socialMenu,
    navigationMenu: result.data.navigationMenu,
    contactMenu: result.data.contactMenu.nodes[0].contactMenu,
  };
}
