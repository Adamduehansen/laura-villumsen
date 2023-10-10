import { wordPressClient } from '@/services/WordPressClient';
import { PageData } from '@/utils/models';
import { GetStaticProps } from 'next';

export default function Error(): JSX.Element {
  return <main>Der er sket en fejl</main>;
}

export const getStaticProps: GetStaticProps<PageData> = async function () {
  const { data } = await wordPressClient.getPageData('/');

  return {
    props: {
      ...data,
    },
  };
};
