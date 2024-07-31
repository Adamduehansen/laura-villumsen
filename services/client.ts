import ky from "ky";

export const api = ky.extend({
  prefixUrl: Deno.env.get("WP_SITE_URL"),
});
