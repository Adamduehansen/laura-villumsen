import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import { getPageData } from '@/services/getPageData';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps } from '@/utils/models';
import { GetStaticProps } from 'next';
import parse from 'node-html-parser';

export default function Contact(props: PageProps): JSX.Element {
  const { content } = props;

  const root = parse(content);
  const [intro, contactInfo] = root.querySelectorAll('p');

  return (
    <div>
      <Container>
        <Row>
          <Col lgStart={6} lg={6} lgOrder={2}>
            <p
              className='mb-6 text-[2rem] leading-9'
              dangerouslySetInnerHTML={{
                __html: contactInfo.innerHTML,
              }}
            ></p>
          </Col>
          <Col lgStart={2} lg={3} lgOrder={1}>
            <p
              className='text-sm'
              dangerouslySetInnerHTML={{
                __html: intro.innerHTML,
              }}
            ></p>
          </Col>
        </Row>
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
