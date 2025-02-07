import { defineConfig, Plugin } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { getPosts } from "$services/post-service.ts";
import { getPage } from "$services/page-services.ts";

// TODO: add Sitemap plugin.
// TODO: add robots.txt.
// TODO: add canonical url.
// TODO: add open graph and twitter cards

interface Url {
  loc: string;
  lastmod: string;
}

function getSitemapUrlsObjects(): Url[] {
  return [];
}

function adaptUrlToXml(
  { loc, lastmod }: Url,
): `<loc>${string}</loc><lastmod>${string}</lastmod>` {
  return `<loc>${loc}</loc><lastmod>${lastmod}</lastmod>`;
}

const sitemapPlugin: Plugin = {
  name: "sitemap-plugin",
  routes: [
    {
      path: "sitemap.xml",
      handler: {
        GET: async function (req) {
          const domain = new URL(req.url).origin;

          // const posts = (await getPosts()).map((post) => {
          //   const path = new URL(post.link).pathname;
          //   return {
          //     loc: new URL(path, domain).toString(),
          //   };
          // });

          const posts = await getPosts();
          const pages = await getPage("/about");

          const sitemapHeader =
            `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url>${
              adaptUrlToXml({
                loc: "Hello",
                lastmod: "World",
              })
            }</url></urlset>`;
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
