import WorkList from '@/components/WorkList';
import WorkTeaser from '@/components/WorkTeaser';
import { wordPressClient } from '@/services/WordPressClient';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await wordPressClient.meta.getMetaData();

  return {
    title: metaData.title,
    description: metaData.description,
  };
}

export default async function Page() {
  const workTeasers = await wordPressClient.work.getTeasers();

  return (
    <WorkList
      pattern='2-1'
      list={workTeasers}
      renderItem={(workTeaser) => {
        const { id, ...rest } = workTeaser;
        return <WorkTeaser key={id} {...rest} />;
      }}
    />
  );
}
