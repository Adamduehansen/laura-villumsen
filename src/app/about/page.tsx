import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import { wordPressClient } from '@/services/WordPressClient';
import { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await wordPressClient.meta.getMetaData();

  return {
    title: `About | ${metaData.title}`,
    description: metaData.description,
  };
}

export default async function Page() {
  const content = await wordPressClient.page.getAboutPageContent();

  return (
    <>
      <Container className='mb-28 lg:mt-32'>
        <Row>
          <Col>
            <p className='text-2xl lg:text-4xl'>{content.text}</p>
          </Col>
        </Row>
      </Container>
      {content.image && (
        <Container fluid className='mb-36'>
          <Row>
            <Col>
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={1440}
                height={653}
                className='w-full'
              />
            </Col>
          </Row>
        </Container>
      )}
      <Container>
        <Row>
          <Col className='mb-16' lg={4}>
            <p className='mb-2'>{content.educations.title}</p>
            <div
              className='[&>table>tbody>tr>td]:align-top [&>table>tbody>tr>td]:pb-4 first:[&>table>tbody>tr>td]:w-28 [&>table]:w-full '
              dangerouslySetInnerHTML={{
                __html: content.educations.content,
              }}
            ></div>
          </Col>
          <Col className='mb-16' lg={4}>
            <p className='mb-2'>{content.employments.title}</p>
            <div
              className='[&>table>tbody>tr>td]:align-top [&>table>tbody>tr>td]:pb-4 first:[&>table>tbody>tr>td]:w-28 [&>table]:w-full'
              dangerouslySetInnerHTML={{
                __html: content.employments.content,
              }}
            ></div>
          </Col>
          <Col className='mb-16' lg={4}>
            <p className='mb-2'>{content.awards.title}</p>
            <div
              className='[&>table>tbody>tr>td]:align-top [&>table>tbody>tr>td]:pb-4 first:[&>table>tbody>tr>td]:w-28 [&>table]:w-full'
              dangerouslySetInnerHTML={{
                __html: content.awards.content,
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
