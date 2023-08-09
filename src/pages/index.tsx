import WorkTeasersList from '@/components/WorkTeasersList';
import { getPageData } from '@/services/getPageData';
import { getWorkTeasers } from '@/services/getWorkTeasers';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps, WorkTeaser } from '@/utils/models';
import { GetStaticProps } from 'next';

type HomeProps = PageProps<{
  workTeasers: WorkTeaser[];
}>;

export default function Home(props: HomeProps): JSX.Element {
  return (
    
      <WorkTeasersList workTeasers={props.workTeasers} />
    
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async function () {
  const { data: pageData, error: pageError } = await getPageData('/');

  const { data: workTeasersData, error: workTeasersError } =
    await getWorkTeasers();

  return {
    props: {
      ...pageData,
      workTeasers: workTeasersData,
    },
    revalidate: REVALIDATE_TIME,
  };
};
