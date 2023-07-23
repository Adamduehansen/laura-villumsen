import { PageData, ServiceResponse } from '@/utils/models';
import { query } from '@/utils/query';
import { FeaturedImage, MenuWPGRaphQL, findNavigationItems } from './common';

interface PageDataWPGraphQLResponse {
  data: {
    page: {
      title: string;
      content: string;
      featuredImage: FeaturedImage | null;
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
        content
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width,
              height
            }
          }
        }
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
        content: '',
        title: '',
        siteName: '',
        description: '',
        navigationItems: [],
        socials: [],
        image: null,
      },
    };
  }

  return {
    data: {
      title: data.page.title,
      content: data.page.content,
      siteName: data.generalSettings.title,
      description: data.generalSettings.description,
      image:
        data.page.featuredImage !== null
          ? {
              src: data.page.featuredImage?.node.sourceUrl,
              alt: data.page.featuredImage?.node.altText,
              width: data.page.featuredImage?.node.mediaDetails.width,
              height: data.page.featuredImage?.node.mediaDetails.height,
            }
          : null,
      navigationItems: findNavigationItems(data.menus.nodes, 'navigation'),
      socials: findNavigationItems(data.menus.nodes, 'socials'),
    },
  };
}
