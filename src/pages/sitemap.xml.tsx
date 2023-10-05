import { wordPressClient } from '@/services/WordPressClient';
import { GetServerSideProps } from 'next';

export default function Sitemap(): JSX.Element {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async function ({ res }) {
  const { data } = await wordPressClient.getSitemapData();

  // We generate the XML sitemap with the posts data
  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data
        .map((sitemapNode) => {
          return `
            <url>
              <loc>${sitemapNode.url}</loc>
              <lastmod>${sitemapNode.date}</lastmod>
            </url>`;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
