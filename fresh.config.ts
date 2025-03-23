import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { sitemapPlugin } from "$plugins/sitemap.ts";

export default defineConfig({
  plugins: [tailwind(), sitemapPlugin],
});
