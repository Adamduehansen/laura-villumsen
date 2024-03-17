import WorkTeasersList from '@/components/WorkTeasersList';

export default async function Page(): Promise<JSX.Element> {
  return (
    <div className='mb-2'>
      <WorkTeasersList />
    </div>
  );
}
