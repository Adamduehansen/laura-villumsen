import Container from '@/components/Container';
import { getPostData } from '@/services/getPostData';
import { PageProps, WorkData } from '@/utils/models';
import { GetStaticPaths, GetStaticProps } from 'next';

type WorkProps = PageProps<WorkData>;

export default function Work({ title, content }: WorkProps): JSX.Element {
  return (
    <Container>
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
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
