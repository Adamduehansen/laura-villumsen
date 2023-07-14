import Margin from '@/components/Margin';
import { getPageData } from '@/services/getPageData';
import { getWorkTeasers } from '@/services/getWorkTeasers';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps, WorkTeaser } from '@/utils/models';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type HomeProps = PageProps<{
  workTeasers: WorkTeaser[];
}>;

const dateFormatter = new Intl.DateTimeFormat('da-DK', {
  month: 'long',
  year: 'numeric',
});

export default function Home(props: HomeProps): JSX.Element {
  const workTeaserComponents = props.workTeasers.map(
    ({ id, title, date, image }): JSX.Element => {
      const dateString = dateFormatter.format(new Date(date));

      return (
        <li key={id} className='mb-6'>
          <Link href={title}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
            />
            <Margin>
              <div className='flex justify-between'>
                <h2>{title}</h2>
                <time dateTime={date}>{dateString}</time>
              </div>
            </Margin>
          </Link>
        </li>
      );
    }
  );

  return (
    <main>
      <ul>{workTeaserComponents}</ul>
    </main>
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
