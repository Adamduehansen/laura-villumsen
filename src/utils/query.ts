import { raise } from './raise';

function wrapQuery(query: string): string {
  return JSON.stringify({
    query: query,
    variables: null,
  });
}

export async function query(query: string) {
  const siteUrl =
    process.env.SITE_URL ??
    raise('Environment variable SITE_URL was not defined');

  return await fetch(`${siteUrl}/index.php?graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: wrapQuery(query),
  });
}
