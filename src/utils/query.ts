import { raise } from './raise';

function wrapQuery(query: string): string {
  return JSON.stringify({
    query: query,
    variables: null,
  });
}

export async function query(query: string) {
  const siteUrl =
    process.env.WP_SITE_URL ??
    raise('Environment variable WP_SITE_URL was not defined');

  return await fetch(`${siteUrl}/index.php?graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: wrapQuery(query),
  });
}
