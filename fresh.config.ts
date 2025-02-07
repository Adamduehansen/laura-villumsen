import { defineConfig, Plugin } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { FetchGetPostsHandler, getPosts } from "$services/post/get-posts.ts";

// TODO: add Sitemap plugin.
// TODO: add robots.txt.
// TODO: add canonical url.
// TODO: add open graph and twitter cards

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

const sitemapPlugin: Plugin = {
  name: "sitemap-plugin",
  routes: [
    {
      path: "sitemap.xml",
      handler: {
        GET: async function (req) {
          const domain = new URL(req.url).origin;

          const posts = await getPosts(new FetchGetPostsHandler());
          // TODO: Get all pages and add them to sitemap.
          const urls: Url[] = [
            ...posts.map((post): Url => {
              const path = new URL(post.link).pathname;

              return {
                loc: new URL(path, domain).toString(),
                lastmod: adaptDateToSitemapLastMod(new Date(post.date)),
              };
            }),
          ];

          const sitemapHeader =
            `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
              urls.map(adaptUrlToXml)
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

export default defineConfig({
  plugins: [tailwind(), sitemapPlugin],
});
