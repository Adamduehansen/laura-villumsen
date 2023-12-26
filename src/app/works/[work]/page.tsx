import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import TagList from '@/components/TagList';
import { wordPressClient } from '@/services/WordPressClient';
import { formatDateString } from '@/utils/workDateFormatter';
import { Metadata } from 'next';

export async function generateMetadata(context: {
  params: { work: string };
}): Promise<Metadata> {
  const { data } = await wordPressClient.getPostData(
    `works/${context.params.work}`,
  );

  return {
    title: `${data.title} | ${data.siteName}`,
    description: data.description,
  };
}

export default async function Work(context: {
  params: { work: string };
}): Promise<JSX.Element> {
  const { data } = await wordPressClient.getPostData(
    `works/${context.params.work}`,
  );

  return (
    <div className='pt-main'>
      <Container>
        <Row>
          <Col>
            <div className='mb-10 text-xl'>
              <h1>{data.title}</h1>
              <div>{data.types}</div>
              <time dateTime={data.date}>{formatDateString(data.date)}</time>
            </div>
          </Col>
          <Col md={5}>
            <p
              className='mb-10'
              dangerouslySetInnerHTML={{
                __html: data.content,
              }}
            ></p>
          </Col>
          <Col md={3} mdStart={10}>
            <TagList
              tags={data.tags}
              className='mb-7 text-right md:text-left'
            />
          </Col>
        </Row>
      </Container>
      <div
        className='gallery'
        dangerouslySetInnerHTML={{
          __html: data.galleryContent,
        }}
      ></div>
    </div>
  );
}
