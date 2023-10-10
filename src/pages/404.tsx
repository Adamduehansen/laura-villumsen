import Container from '@/components/Container';
import { wordPressClient } from '@/services/WordPressClient';
import { PageData } from '@/utils/models';
import { GetStaticProps } from 'next';

export default function NotFound(): JSX.Element {
  return (
    <div className='pt-main'>
      <Container>
        <h1>Siden kunne ikke findes!</h1>
      </Container>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageData> = async function () {
  const { data } = await wordPressClient.getPageData('/');

  return {
    props: {
      ...data,
    },
  };
};
