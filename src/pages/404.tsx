import { getPageData } from '@/services/getPageData';
import { PageData } from '@/utils/models';
import { GetStaticProps } from 'next';

export default function NotFound(): JSX.Element {
  return <main>Siden kunne ikke findes!</main>;
}

export const getStaticProps: GetStaticProps<PageData> = async function () {
  const { data: pageData, error: pageError } = await getPageData('/');

  return {
    props: {
      ...pageData,
    },
  };
};
