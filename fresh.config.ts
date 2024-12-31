import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

// TODO: add Sitemap plugin.

export default defineConfig({
  plugins: [tailwind()],
});
