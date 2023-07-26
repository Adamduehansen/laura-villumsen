import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import TagList from '@/components/TagList';
import { getPostData } from '@/services/getPostData';
import { PageProps, WorkData } from '@/utils/models';
import { query } from '@/utils/query';
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
    <div className='pt-main'>
      <Container>
        <Row>
          <Col>
            <div className='mb-10 text-xl'>
              <h1>{title}</h1>
              <div>{types}</div>
              <time dateTime={date}>{formatDateString(date)}</time>
            </div>
          </Col>
          <Col md={5}>
            <p
              className='mb-10'
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></p>
          </Col>
          <Col md={3} mdStart={10}>
            <TagList tags={tags} className='mb-7 text-right md:text-left' />
          </Col>
        </Row>
      </Container>
      <div
        className='gallery'
        dangerouslySetInnerHTML={{
          __html: galleryContent,
        }}
      ></div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  const response = await query(`
    query Works {
      posts {
        nodes {
          uri
        }
      }
    }
  `);

  const { data } = (await response.json()) as {
    data: {
      posts: {
        nodes: {
          uri: string;
        }[];
      };
    };
  };

  return {
    fallback: 'blocking',
    paths: data.posts.nodes.map((node) => {
      return node.uri;
    }),
  };
};

export const getStaticProps: GetStaticProps<WorkProps> = async function (
  context,
) {
  const { data, error } = await getPostData(
    `works/${context.params!.work?.toString()}`,
  );

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...data,
    },
  };
};
