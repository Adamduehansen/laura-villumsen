import {
  NavigationItem,
  PageData,
  ServiceResponse,
  SitemapNode,
  Tag,
  WorkData,
  WorkTeaser,
} from '@/utils/models';
import { raise } from '@/utils/raise';
import { parse as htmlParse } from 'node-html-parser';
import {
  MenuWPGraphQLSchema,
  pageDataWPGraphQLResponseSchema,
  postDataWPGraphQLResponse,
  sitemapWPGraphQLResponseSchema,
  workTeaserWPGraphQLResponseSchema,
} from './schemas';

export class WordPressClient {
  async getSitemapData(): Promise<ServiceResponse<SitemapNode[]>> {
    const response = await this.#queryGraphQL(`
      query Sitemap {
        posts {
          nodes {
            uri,
            date
          }
        }
        pages {
          nodes {
            uri
            date
          }
        }
      }
    `);

    const { data } = sitemapWPGraphQLResponseSchema.parse(response);

    return {
      data: [...data.pages.nodes, ...data.posts.nodes].map((node) => {
        const [month, day, year] = new Intl.DateTimeFormat('en-EN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
          .formatToParts(new Date(node.date))
          .filter((dateTimeFormatPart) => {
            return dateTimeFormatPart.type !== 'literal';
          });

        return {
          url: `${process.env['SITE_URL']}${node.uri}`,
          date: `${year.value}-${month.value}-${day.value}`,
        };
      }),
    };
  }

  async getPageData(path: string): Promise<ServiceResponse<PageData>> {
    const response = await this.#queryGraphQL(`
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

    const { data } = pageDataWPGraphQLResponseSchema.parse(response);

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
        navigationItems: this.#findNavigationItems(
          data.menus.nodes,
          'navigation',
        ),
        socials: this.#findNavigationItems(data.menus.nodes, 'socials'),
      },
    };
  }

  async getPostData(path: string): Promise<ServiceResponse<WorkData>> {
    const response = await this.#queryGraphQL(`
      query PostData {
        post(id: "${path}", idType: URI) {
          title
          content
          tags {
            nodes {
              id
              name
            }
          }
          workData {
            date
            types
          }
        }
        menus {
          nodes {
            id
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

    const { data } = postDataWPGraphQLResponse.parse(response);

    if (data.post === null) {
      return {
        error: new Error('Post not found'),
        data: {
          image: null,
          galleryContent: '',
          title: '',
          content: '',
          date: '',
          tags: [],
          navigationItems: [],
          siteName: '',
          socials: [],
          description: '',
          types: '',
        },
      };
    }

    const root = htmlParse(data.post.content);
    const content = root.querySelector('p');
    const gallery = root.querySelectorAll(':scope > figure');

    return {
      data: {
        title: data.post.title,
        content: content?.innerHTML ?? '',
        date: data.post.workData.date,
        tags: data.post.tags.nodes.map(({ id, name }): Tag => {
          return {
            id: id,
            name: name,
          };
        }),
        siteName: data.generalSettings.title,
        description: data.generalSettings.description,
        navigationItems: this.#findNavigationItems(
          data.menus.nodes,
          'navigation',
        ),
        socials: this.#findNavigationItems(data.menus.nodes, 'socials'),
        galleryContent: gallery.join(''),
        types: data.post.workData.types,
        image: null,
      },
    };
  }

  async getWorkTeasers(): Promise<ServiceResponse<WorkTeaser[]>> {
    const response = await this.#queryGraphQL(`
      query FrontpageData {
        posts {
          nodes {
            id
            title
            uri
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  height
                  width
                }
              }
            }
            workData {
              date
            }
          }
        }
      }
    `);

    const { data } = workTeaserWPGraphQLResponseSchema.parse(response);

    return {
      data: data.posts.nodes
        .map((workTeaser) => {
          return {
            id: workTeaser.id,
            title: workTeaser.title,
            path: workTeaser.uri,
            date: workTeaser.workData.date,
            image: workTeaser.featuredImage
              ? {
                  src: workTeaser.featuredImage.node.sourceUrl,
                  alt: workTeaser.featuredImage.node.altText,
                  width: workTeaser.featuredImage.node.mediaDetails.width,
                  height: workTeaser.featuredImage.node.mediaDetails.height,
                }
              : null,
          };
        })
        .sort((workTeaserA: WorkTeaser, workTeaserB: WorkTeaser): number => {
          if (workTeaserA.date > workTeaserB.date) {
            return -1;
          } else if (workTeaserA.date < workTeaserB.date) {
            return 1;
          } else {
            return 0;
          }
        }),
    };
  }

  async #queryGraphQL(query: string): Promise<unknown> {
    const siteUrl =
      process.env.WP_SITE_URL ??
      raise('Environment variable WP_SITE_URL was not defined');

    const response = await fetch(`${siteUrl}/index.php?graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: null,
      }),
    });

    return response.json();
  }

  #findNavigationItems(
    menus: MenuWPGraphQLSchema[],
    key: string,
  ): NavigationItem[] {
    const menu = menus.find((menu) => menu.name.toLowerCase() === key);

    if (menu === undefined) {
      return [];
    }

    return menu.menuItems.nodes.map((node) => {
      return {
        id: node.id,
        text: node.label,
        url: node.uri,
      };
    });
  }
}
