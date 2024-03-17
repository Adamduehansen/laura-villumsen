import { wordPressClient } from '@/services/WordPressClient';
import Col from './Col';
import Container from './Container';

export default async function Footer(): Promise<JSX.Element> {
  const [instagramLink, linkedInLink] = await wordPressClient.menu.getMenu(
    'socials',
  );
  const inquiries = await wordPressClient.meta.getInquiriesText();

  return (
    <footer className='bg-[#D9D9D9] py-3'>
      <Container className='pb-64'>
        <Col sm={10}>
          <p>{inquiries}</p>
        </Col>
      </Container>
      <Container className='pb-3'>
        <Col sm={4}>
          <a href={instagramLink.uri}>{instagramLink.label}</a>
        </Col>
        <Col sm={4}>
          <a href={linkedInLink.uri}>{linkedInLink.label}</a>
        </Col>
        <Col sm={4} className='flex justify-end'>
          <button className='flex items-center gap-x-2'>
            To the top
            <svg width={16} height={16} className='-rotate-90'>
              <use href='icons.svg#arrow' />
            </svg>
          </button>
        </Col>
      </Container>
      <Container>
        <Col sm={4} className='text-xs'>
          <p>©2024</p>
        </Col>
        <Col sm={8} className='text-xs'>
          <p>Design by Laura Villumsen</p>
          <p>Coded by Adam Due Hansen</p>
        </Col>
      </Container>
    </footer>
  );
}
