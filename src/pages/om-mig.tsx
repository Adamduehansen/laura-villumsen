import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import { getPageData } from '@/services/getPageData';
import { REVALIDATE_TIME } from '@/utils/const';
import { PageProps } from '@/utils/models';
import { GetStaticProps } from 'next';
import Image from 'next/image';

type PageData = PageProps;

export default function About(props: PageData): JSX.Element {
  return (
    <div className='pt-main md:pt-14'>
      <Container>
        <Row>
          <Col>
            {props.image && (
              <Image
                src={props.image.src}
                alt={props.image.alt}
                width={props.image.width}
                height={props.image.height}
              />
            )}
          </Col>
        </Row>
        <div
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
        ></div>
      </Container>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PageData> = async function () {
  const { data: pageData, error: pageError } = await getPageData('/om-mig');

  return {
    props: {
      ...pageData,
    },
    revalidate: REVALIDATE_TIME,
  };
};
