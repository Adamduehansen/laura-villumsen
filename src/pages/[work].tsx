import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import TagList from '@/components/TagList';
import { getPostData } from '@/services/getPostData';
import { PageProps, WorkData } from '@/utils/models';
import { formatDateString } from '@/utils/workDateFormatter';
import { GetStaticPaths, GetStaticProps } from 'next';

type WorkProps = PageProps<WorkData>;

export default function Work({
  title,
  date,
  content,
  tags,
  galleryContent,
  types,
}: WorkProps): JSX.Element {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='text-lg mb-10'>
              <h1>{title}</h1>
              <div>{types}</div>
              <time dateTime={date}>{formatDateString(date)}</time>
            </div>
            <p
              className='mb-10'
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></p>
          </Col>
          <Col>
            <TagList tags={tags} className='text-right mb-7' />
          </Col>
        </Row>
      </Container>
      <div
        className='gallery mb-20'
        dangerouslySetInnerHTML={{
          __html: galleryContent,
        }}
      ></div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<WorkProps> = async function (
  context
) {
  const { data } = await getPostData(context.params!.work!.toString());

  return {
    props: {
      ...data,
    },
  };
};
