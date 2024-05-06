import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import WorkList from '@/components/WorkList';
import { wordPressClient } from '@/services/WordPressClient';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      <Container className='lg:mt-32'>
        <Row className='pb-24'>
          <Col lg={11}>
            <p className='text-2xl lg:text-[55px] lg:leading-[63px]'>
              {work.text}
            </p>
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
        pattern='1-2'
        list={work.medias}
        renderItem={(media) => {
          if (media.rawTagName === 'img') {
            return (
              <img
                src={media.getAttribute('src') || ''}
                alt={media.getAttribute('alt') || ''}
                height={media.getAttribute('height') || '256'}
                width={media.getAttribute('width') || '256'}
                className='w-full'
                srcSet={media.getAttribute('srcset')}
              />
            );
          }
          if (media.rawTagName === 'video') {
            return (
              <video
                src={media.getAttribute('src')}
                autoPlay
                loop
                controls={false}
                className='w-full'
              ></video>
            );
          }
        }}
      />
      <Container className='pt-4 pb-36 lg:h-[440px] lg:py-0 relative'>
        <Row className='lg:absolute lg:bottom-10 lg:flex lg:gap-x-24'>
          <Col sm={6} lg={2}>
            {work.previousCase && (
              <Link
                href={work.previousCase}
                className='text-link underline underline-offset-4'
              >
                Previous project
              </Link>
            )}
          </Col>
          <Col sm={6} lg={2} className='text-right lg:text-left'>
            {work.nextCase && (
              <Link
                href={work.nextCase}
                className='text-link underline underline-offset-4'
              >
                Next project
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
