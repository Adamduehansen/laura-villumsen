import { MenuNavigationItem, PageData, ServiceResponse } from '@/utils/models';
import { query } from '@/utils/query';

interface PageDataWPGraphQLResponse {
  data: {
    page: {
      title: string;
      content: string;
    } | null;
    menu: {
      menuItems: {
        nodes: {
          id: string;
          label: string;
          path: string;
        }[];
      };
    };
    generalSettings: {
      title: string;
    };
  };
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
}

function toMenuNavigationItem({
  id,
  label,
  path,
}: MenuItem): MenuNavigationItem {
  return {
    id: id,
    text: label,
    url: path,
  };
}
export async function getPageData(
  path: string
): Promise<ServiceResponse<PageData>> {
  const worksResponse = await query(`
    query pageData {
      page(id: "${path}", idType: URI) {
        title
        content
      },
      menu(id: "dGVybToz") {
        id,
        menuItems {
          nodes {
            id
            label
            path
          }
        }
      },
      generalSettings {
        title
      }
    }
  `);
  const { data } = (await worksResponse.json()) as PageDataWPGraphQLResponse;

  if (data.page === null) {
    return {
      data: {
        title: '',
        siteName: '',
        navigationItems: [],
      },
      error: new Error('Page not found'),
    };
  }

  return {
    data: {
      title: data.page.title,
      siteName: data.generalSettings.title,
      navigationItems: data.menu.menuItems.nodes.map(toMenuNavigationItem),
    },
  };
}
