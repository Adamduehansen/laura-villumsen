import { Plugin } from "$fresh/server.ts";
import { FetchGetPostsHandler, getPosts } from "$services/post/get-posts.ts";
import { getPage } from "$services/page-services.ts";

interface Url {
  loc: string;
  lastmod: string;
}

function adaptUrlToXml(
  { loc, lastmod }: Url,
): `<url><loc>${string}</loc><lastmod>${string}</lastmod></url>` {
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
}

const dateFormater = Intl.DateTimeFormat("da-DK", {
  dateStyle: "short",
});

function adaptDateToSitemapLastMod(date: Date): string {
  return dateFormater.formatToParts(new Date(date))
    .reduce<string[]>((parts, currentPart): string[] => {
      if (currentPart.type === "literal") {
        return parts;
      }
      return [...parts, currentPart.value];
    }, [])
    .toReversed()
    .join("-");
}

async function getPostsForSitemap(domain: string): Promise<Url[]> {
  const posts = await getPosts(new FetchGetPostsHandler());
  return posts.map((post): Url => {
    const path = new URL(post.link).pathname;
    return {
      loc: new URL(path, domain).toString(),
      lastmod: adaptDateToSitemapLastMod(new Date(post.date)),
    };
  });
}

async function getPagesForSitemap(domain: string): Promise<Url[]> {
  const pageFetches = [getPage("/work"), getPage("/about")];
  const pages = await Promise.allSettled(pageFetches);

  return pages.reduce<Url[]>((urls, currentFetchPageResult): Url[] => {
    if (
      currentFetchPageResult.status === "rejected" ||
      currentFetchPageResult.value === null
    ) {
      return urls;
    }

    const page = currentFetchPageResult.value;
    const path = new URL(page.link).pathname;

    return [...urls, {
      loc: new URL(path, domain).toString(),
      lastmod: adaptDateToSitemapLastMod(new Date(page.date)),
    }];
  }, []);
}

export const sitemapPlugin: Plugin = {
  name: "sitemap-plugin",
  routes: [
    {
      path: "sitemap.xml",
      handler: {
        GET: async function (req) {
          const domain = new URL(req.url).origin;

          const urls: Url[] = [
            ...await getPagesForSitemap(domain),
            ...await getPostsForSitemap(domain),
          ];

          const sitemapHeader =
            `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
              urls.map(adaptUrlToXml).join("")
            }</urlset>`;
          return new Response(sitemapHeader, {
            headers: {
              "Content-Type": "text/xml",
            },
          });
        },
      },
    },
  ],
};
