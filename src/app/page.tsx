import WorkTeasersList from '@/components/WorkTeasersList';
import { wordPressClient } from '@/services/WordPressClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await wordPressClient.getPageData('/');

  return {
    title: `${data.title} | ${data.siteName}`,
    description: data.description,
  };
}

export default async function Page(): Promise<JSX.Element> {
  const { data } = await wordPressClient.getWorkTeasers();

  return <WorkTeasersList workTeasers={data} />;
}
