import { PageData, getPageData } from '@/utils/wpService';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

export default function Home(props: PageData) {
  return (
    <>
      <header>
        <Link href='/'>{props.siteName}</Link>
        <nav>
          <ul></ul>
          {props.navigationItems.map(({ id, text, url }): JSX.Element => {
            return (
              <li key={id}>
                <a href={url}>{text}</a>
              </li>
            );
          })}
        </nav>
      </header>
      <main>
        <h1>{props.title}</h1>
      </main>
    </>
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
