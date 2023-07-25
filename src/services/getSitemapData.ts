import { ServiceResponse, SitemapNode } from '@/utils/models';
import { query } from '@/utils/query';

interface SitemapNodeWPGraphResponse {
  uri: string;
  date: string;
}

interface SitemapWPGraphResponse {
  data: {
    posts: {
      nodes: SitemapNodeWPGraphResponse[];
    };
    pages: {
      nodes: SitemapNodeWPGraphResponse[];
    };
  };
}

export async function getSitemapData(): Promise<
  ServiceResponse<SitemapNode[]>
> {
  const sitemapDataResponse = await query(`
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

  const { data } = (await sitemapDataResponse.json()) as SitemapWPGraphResponse;

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
