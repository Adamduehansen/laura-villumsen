import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { sitemapPlugin } from "$plugins/sitemap.ts";

// TODO: add robots.txt.
// TODO: add open graph and twitter cards

export default defineConfig({
  plugins: [tailwind(), sitemapPlugin],
});
