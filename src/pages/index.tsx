import { getWorkTeasers } from '@/services/getWorkTeasers';
import { WorkTeaser } from '@/utils/models';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface HomeProps {
  workTeasers: WorkTeaser[];
}

export default function Home(props: HomeProps): JSX.Element {
  return (
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
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async function (
  context
) {
  const { data, error } = await getWorkTeasers();

  return {
    redirect: false,
    props: {
      workTeasers: data,
    },
  };
};
