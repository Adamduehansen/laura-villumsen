import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import { wordPressClient } from '@/services/WordPressClient';
import Image from 'next/image';

export default async function Page() {
  const content = await wordPressClient.page.getAboutPageContent();

  return (
    <>
      <Container className='mb-28'>
        <Row>
          <Col>
            <p className='text-3xl'>{content.text}</p>
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
          <Col className='mb-20'>
            <p>{content.educations.title}</p>
            <div
              className='[&>table>tbody>tr>td]:align-top first:[&>table>tbody>tr>td]:w-28 [&>table]:w-full'
              dangerouslySetInnerHTML={{
                __html: content.educations.content,
              }}
            ></div>
          </Col>
          <Col className='mb-20'>
            <p>{content.employments.title}</p>
            <div
              className='[&>table>tbody>tr>td]:align-top first:[&>table>tbody>tr>td]:w-28 [&>table]:w-full'
              dangerouslySetInnerHTML={{
                __html: content.employments.content,
              }}
            ></div>
          </Col>
          <Col className='mb-20'>
            <p>{content.awards.title}</p>
            <div
              className='[&>table>tbody>tr>td]:align-top first:[&>table>tbody>tr>td]:w-28 [&>table]:w-full'
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
