import WorkList from '@/components/WorkList';
import WorkTeaser from '@/components/WorkTeaser';
import { wordPressClient } from '@/services/WordPressClient';

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
