import * as v from "@valibot/valibot";
import { Page, PageSchema } from "$services/page/page.ts";

export interface PageRepository {
  getPage: (slug: string) => Promise<Page | null>;
}

class HttpPageRepository implements PageRepository {
  async getPage(slug: string): Promise<Page | null> {
    const WpSiteHost = Deno.env.get("WP_SITE_URL");
    const url = new URL(`${WpSiteHost}/wp-json/wp/v2/pages?slug=${slug}`);

    const response = await fetch(url);
    const json = await response.json();
    const parsedPages = v.parse(v.array(PageSchema), json);

    if (parsedPages.length === 0) {
      return null;
    }

    if (parsedPages.length > 1) {
      throw new Error(`Found more that one page for slug ${slug}`);
    }

    return parsedPages[0];
  }
}

export class PageService {
  #pageRepository: PageRepository = new HttpPageRepository();

  async getPage(slug: string): Promise<Page | null> {
    return await this.#pageRepository.getPage(slug);
  }
}
