import { wordPressClient } from '@/services/WordPressClient';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await wordPressClient.getSitemapData();

  return data.map((sitemapNode) => {
    return {
      url: sitemapNode.url,
      lastModified: sitemapNode.date,
    };
  });
}
