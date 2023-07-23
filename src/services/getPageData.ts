import { PageData, ServiceResponse } from '@/utils/models';
import { query } from '@/utils/query';
import { MenuWPGRaphQL, findNavigationItems } from './common';

interface PageDataWPGraphQLResponse {
  data: {
    page: {
      title: string;
    } | null;
    menus: {
      nodes: MenuWPGRaphQL[];
    };
    generalSettings: {
      title: string;
      description: string;
    };
  };
}

export async function getPageData(
  path: string,
): Promise<ServiceResponse<PageData>> {
  const pageDataResponse = await query(`
    query PageData {
      page(id: "${path}", idType: URI) {
        title
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
        description
      }
    }
  `);
  const { data } = (await pageDataResponse.json()) as PageDataWPGraphQLResponse;

  if (data.page === null) {
    return {
      error: new Error('Page not found'),
      data: {
        title: '',
        siteName: '',
        description: '',
        navigationItems: [],
        socials: [],
      },
    };
  }

  return {
    data: {
      title: data.page.title,
      siteName: data.generalSettings.title,
      description: data.generalSettings.description,
      navigationItems: findNavigationItems(data.menus.nodes, 'navigation'),
      socials: findNavigationItems(data.menus.nodes, 'socials'),
    },
  };
}
