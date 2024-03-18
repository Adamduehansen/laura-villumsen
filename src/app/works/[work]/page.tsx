import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import WorkList from '@/components/WorkList';
import { wordPressClient } from '@/services/WordPressClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page(context: {
  params: {
    work: string;
  };
}) {
  const work = await wordPressClient.work.getWork(context.params.work);

  if (work === undefined) {
    notFound();
  }

  return (
    <>
      <Container>
        <Row className='pb-24'>
          <Col>
            <p>{work.text}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <p>Client</p>
            <p>{work.client}</p>
          </Col>
          <Col sm={6}>
            <p>Year</p>
            <p>{work.year}</p>
          </Col>
          <Col sm={6}>
            <p>Services</p>
            {work.services.map((service, index) => {
              return <p key={index}>{service}</p>;
            })}
          </Col>
          {work.url && (
            <Col sm={6}>
              <a href={work.url}>Visit website here</a>
            </Col>
          )}
        </Row>
      </Container>
      <WorkList
        list={work.images}
        renderItem={(image) => {
          return (
            <Image
              src={image.src}
              alt={image.alt}
              width={parseInt(image.width.toString())}
              height={parseInt(image.height.toString())}
              className='w-full'
              priority
            />
          );
        }}
      />
    </>
  );
}
