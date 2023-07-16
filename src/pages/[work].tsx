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
}: WorkProps): JSX.Element {
  return (
    <Container>
      <Row>
        <Col>
          <h1>{title}</h1>
          <time dateTime={date}>{formatDateString(date)}</time>
          <p
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></p>
        </Col>
        <Col>
          <TagList tags={tags} className='text-right' />
        </Col>
      </Row>
      <div
        className='work-content'
        dangerouslySetInnerHTML={{
          __html: galleryContent,
        }}
      ></div>
    </Container>
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
