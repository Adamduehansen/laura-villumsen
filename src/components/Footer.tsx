import { wordPressClient } from '@/services/WordPressClient';
import Col from './Col';
import Container from './Container';
import Row from './Row';

export default async function Footer(): Promise<JSX.Element> {
  const [instagramLink, linkedInLink] = await wordPressClient.menu.getMenu(
    'socials',
  );
  const inquiries = await wordPressClient.meta.getInquiriesText();

  return (
    <footer className='bg-[#D9D9D9] py-3'>
      <Container>
        <Row className='pt-64 pb-4 lg:pt-0 lg:pb-64'>
          <Col lg={3} className='pb-4'>
            <p>{inquiries}</p>
          </Col>
          <Col sm={4} lg={1} lgStart={10}>
            <a href={instagramLink.uri} target='_blank' rel='noreferrer'>
              {instagramLink.label}
            </a>
          </Col>
          <Col sm={4} lg={1}>
            <a href={linkedInLink.uri} target='_blank' rel='noreferrer'>
              {linkedInLink.label}
            </a>
          </Col>
          <Col sm={4} lg={1}>
            <a
              href='#top'
              className='flex items-center gap-x-2 justify-end lg:justify-normal'
            >
              To the top
              <svg width={16} height={16} className='-rotate-90'>
                <use href='/icons.svg#arrow' />
              </svg>
            </a>
          </Col>
        </Row>
        <Row className='pb-4'>
          <Col sm={4} lg={1} lgStart={10} className='text-xs'>
            <p>©2024</p>
          </Col>
          <Col sm={8} lg={2} className='text-xs'>
            <p>Design by Laura Villumsen</p>
            <p>Coded by Adam Due Hansen</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
