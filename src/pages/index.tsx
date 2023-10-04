import WorkTeasersList from '@/components/WorkTeasersList';
import { WordPressClient } from '@/services/WordPressClient';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps, WorkTeaser } from '@/utils/models';
import { GetStaticProps } from 'next';

type HomeProps = PageProps<{
  workTeasers: WorkTeaser[];
}>;

export default function Home(props: HomeProps): JSX.Element {
  return <WorkTeasersList workTeasers={props.workTeasers} />;
}

export const getStaticProps: GetStaticProps<HomeProps> = async function () {
  const wordPressClient = new WordPressClient();

  const { data: pageData, error: pageError } =
    await wordPressClient.getPageData('/');

  const { data: workTeasersData, error: workTeasersError } =
    await wordPressClient.getWorkTeasers();

  return {
    props: {
      ...pageData,
      workTeasers: workTeasersData,
    },
    revalidate: REVALIDATE_TIME,
  };
};
