import WorkList from '@/components/WorkList';
import WorkTeaser from '@/components/WorkTeaser';
import { wordPressClient } from '@/services/WordPressClient';
import { Metadata } from 'next';

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
      list={workTeasers}
      renderItem={(workTeaser) => {
        return <WorkTeaser key={workTeaser.id} workTeaser={workTeaser} />;
      }}
    />
  );
}
