import Header from '@/components/Header';
import PageDataProvider from '@/components/PageData';
import { getPageData } from '@/services/getPageData';
import { getWorkTeasers } from '@/services/getWorkTeasers';
import { PageProps, WorkTeaser } from '@/utils/models';
import { GetStaticProps } from 'next';
import Link from 'next/link';

type HomeProps = PageProps<{
  workTeasers: WorkTeaser[];
}>;

export default function Home(props: HomeProps): JSX.Element {
  return (
    <PageDataProvider pageData={props}>
      <Header />
      <main>
        <h1>{props.title}</h1>
      </main>
      <div>
        Home
        <ul>
          {props.workTeasers.map(({ id, title, date }) => {
            const dateString = new Intl.DateTimeFormat('da-DK', {
              month: 'long',
              year: 'numeric',
            }).format(new Date(date));

            return (
              <li key={id}>
                <Link href={title}>
                  {/* <img src='' alt='' /> */}
                  <h2>{title}</h2>
                  <time dateTime={date}>{dateString}</time>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </PageDataProvider>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async function (
  context
) {
  const { data: pageData, error: pageError } = await getPageData('/');

  const { data: workTeasersData, error: workTeasersError } =
    await getWorkTeasers();

  return {
    redirect: false,
    props: {
      ...pageData,
      workTeasers: workTeasersData,
    },
  };
};
