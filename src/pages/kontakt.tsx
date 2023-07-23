import Container from '@/components/Container';
import { getPageData } from '@/services/getPageData';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps } from '@/utils/models';
import { GetStaticProps } from 'next';
import parse from 'node-html-parser';

export default function Contact(props: PageProps): JSX.Element {
  const { content } = props;

  const root = parse(content);

  return (
    <div className='pt-main md:pt-14'>
      <Container>
        <div
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
        ></div>
      </Container>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async function () {
  const { data: pageData, error: pageError } = await getPageData('/kontakt');

  return {
    props: {
      ...pageData,
    },
    revalidate: REVALIDATE_TIME,
  };
};
