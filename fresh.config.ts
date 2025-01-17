import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

// TODO: add Sitemap plugin.
// TODO: add robots.txt.
// TODO: add canonical url.
// TODO: add open graph and twitter cards

export default defineConfig({
  plugins: [tailwind()],
});
