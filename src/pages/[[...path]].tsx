import { raise } from '@/utils/raise';
import { getPageData } from '@/utils/wpService';
import { GetStaticPaths, GetStaticProps } from 'next';

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

interface PageProps {
  headerTitle: string;
}

export default function Home(props: PageProps) {
  return <main>{props.headerTitle}</main>;
}

export const getStaticPaths: GetStaticPaths = async function () {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async function () {
  const siteName =
    process.env.SITE_NAME ??
    raise('Environment variable "SITE_NAME" was not defined');

  const { data, error } = await getPageData(siteName);

  return {
    props: {
      headerTitle: data.siteInfo.name,
    },
  };
};
