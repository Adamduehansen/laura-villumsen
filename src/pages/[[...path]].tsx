import Header from '@/components/Header';
import PageDataProvider from '@/components/PageData';
import { getPageData } from '@/utils/wpService';
import type { PageData } from '@/utils/wpService';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

export default function Home(props: PageData) {
  return (
    <PageDataProvider pageData={props}>
      <Header />
      <main>
        <h1>{props.title}</h1>
      </main>
    </PageDataProvider>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<PageData> = async function (
  context
) {
  const { data, notFound } = await getPageData(context);

  if (notFound || data === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: data,
    notFound: false,
  };
};
