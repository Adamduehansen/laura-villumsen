import { NavigationItem, PageData, ServiceResponse } from '@/utils/models';
import { query } from '@/utils/query';

interface PageDataWPGraphQLResponse {
  data: {
    page: {
      title: string;
      content: string;
    } | null;
    menus: {
      nodes: MenuWPGRaphQL[];
    };
    generalSettings: {
      title: string;
    };
  };
}

interface MenuWPGRaphQL {
  name: string;
  menuItems: {
    nodes: MenuItemWPGraphQL[];
  };
}

interface MenuItemWPGraphQL {
  id: string;
  label: string;
  uri: string;
}

function findNavigationItems(
  menus: MenuWPGRaphQL[],
  key: string
): NavigationItem[] {
  const menu = menus.find((menu) => menu.name.toLowerCase() === key);

  if (menu === undefined) {
    return [];
  }

  return menu.menuItems.nodes.map(toMenuNavigationItem);
}

function toMenuNavigationItem({
  id,
  label,
  uri,
}: MenuItemWPGraphQL): NavigationItem {
  return {
    id: id,
    text: label,
    url: uri,
  };
}

export async function getPageData(
  path: string
): Promise<ServiceResponse<PageData>> {
  const worksResponse = await query(`
    query PageData {
      page(id: "/", idType: URI) {
        title
        content
      }
      menus {
        nodes {
          name
          menuItems {
            nodes {
              id
              label
              uri
            }
          }
        }
      }
      generalSettings {
        title
      }
    }
  `);
  const { data } = (await worksResponse.json()) as PageDataWPGraphQLResponse;

  if (data.page === null) {
    return {
      error: new Error('Page not found'),
      data: {
        title: '',
        siteName: '',
        navigationItems: [],
        socials: [],
      },
    };
  }

  return {
    data: {
      title: data.page.title,
      siteName: data.generalSettings.title,
      navigationItems: findNavigationItems(data.menus.nodes, 'navigation'),
      socials: findNavigationItems(data.menus.nodes, 'socials'),
    },
  };
}
