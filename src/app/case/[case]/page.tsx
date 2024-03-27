import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import WorkList from '@/components/WorkList';
import { wordPressClient } from '@/services/WordPressClient';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type PageContext = {
  params: {
    case: string;
  };
};

export async function generateMetadata(
  context: PageContext,
): Promise<Metadata> {
  const metaData = await wordPressClient.meta.getMetaData();
  const work = await wordPressClient.work.getWork(context.params.case);

  return {
    title: `${work?.client} | ${metaData.title}`,
    description: metaData.description,
  };
}

export default async function Page(context: PageContext) {
  const work = await wordPressClient.work.getWork(context.params.case);

  if (work === undefined) {
    notFound();
  }

  return (
    <>
      <Container>
        <Row className='pb-24'>
          <Col lg={11}>
            <p className='text-2xl lg:text-5xl'>{work.text}</p>
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
                className='text-link underline'
              >
                Visit website here
              </a>
            </Col>
          )}
        </Row>
      </Container>
      <WorkList
        list={work.medias}
        renderItem={(media) => {
          if (media.type === 'image') {
            return (
              <Image
                src={media.src}
                alt={media.alt}
                width={parseInt(media.width.toString())}
                height={parseInt(media.height.toString())}
                className='w-full'
                priority
              />
            );
          }
          if (media.type === 'video') {
            return <video src={media.src} autoPlay loop controls></video>;
          }
        }}
      />
    </>
  );
}
