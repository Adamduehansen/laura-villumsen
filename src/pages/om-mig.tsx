import Container from '@/components/Container';
import { getPageData } from '@/services/getPageData';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps } from '@/utils/models';
import { GetStaticProps } from 'next';

export default function About(props: PageProps): JSX.Element {
  return (
    <div className='pt-main md:pt-14'>
      <Container>
        <p>{props.title}</p>
      </Container>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async function () {
  const { data: pageData, error: pageError } = await getPageData('/om-mig');

  return {
    props: {
      ...pageData,
    },
    revalidate: REVALIDATE_TIME,
  };
};
