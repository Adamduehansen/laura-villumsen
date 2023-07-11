import { GetPageDataResponse, getPageData } from '@/utils/wpService';
import { GetStaticPaths, GetStaticProps } from 'next';

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

interface PageProps {
  headerTitle: string;
}

export default function Home(props: PageProps) {
  return (
    <>
      <header>{props.headerTitle}</header>
      <main></main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async function (
  context
) {
  const { data, notFound } = await getPageData(context);

  if (notFound || data === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      headerTitle: data.siteName,
    },
    notFound: false,
  };
};
