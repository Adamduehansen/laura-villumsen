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
          <Col lg={11}>
            <p className='text-2xl lg:text-4xl'>{work.text}</p>
          </Col>
        </Row>
        <Row className='gap-y-10 pb-32 lg:pb-24'>
          <Col sm={6} lg={2}>
            <p>Client:</p>
            <p>{work.client}</p>
          </Col>
          <Col sm={6} lg={2}>
            <p>Year:</p>
            <p>{work.year}</p>
          </Col>
          <Col sm={6} lg={2}>
            <p>Services:</p>
            {work.services.map((service, index) => {
              return <p key={index}>{service}</p>;
            })}
          </Col>
          {work.url && (
            <Col sm={6} lg={2} lgStart={10}>
              <a
                href={work.url}
                target='_blank'
                rel='noreferrer'
                className='text-[#1453F7] underline'
              >
                Visit website here
              </a>
            </Col>
          )}
        </Row>
      </Container>
      <WorkList
        list={work.images}
        renderItem={(image) => {
          return (
            <div className='relative overflow-hidden group'>
              <Image
                src={image.src}
                alt={image.alt}
                width={parseInt(image.width.toString())}
                height={parseInt(image.height.toString())}
                className='w-full scale-100 lg:duration-700 lg:ease-out lg:group-hover:scale-105'
                priority
              />
            </div>
          );
        }}
      />
    </>
  );
}
