import { NavigationItem } from '@/utils/models';
import Image from 'next/image';
import Col from './Col';
import Container from './Container';
import Row from './Row';

function toSocialComponent({ id, url, text }: NavigationItem): JSX.Element {
  return (
    <a
      key={id}
      href={url}
      className='italic underline'
      rel='noopener noreferrer'
    >
      {text}
    </a>
  );
}

export default function Footer(): JSX.Element {
  return (
    <footer className='py-24'>
      <Container>
        <Row>
          <Col lgStart={9}>
            <Container fluid>
              <Row>
                <Col sm={4} md={2} lg={3}>
                  <div className='flex gap-1'>
                    footer
                    <Image
                      src='/arrow-right.svg'
                      alt=''
                      width={14}
                      height={24}
                      className='inline'
                    />
                  </div>
                </Col>
                <Col sm={4} md={2} lg={3}>
                  <a
                    href='https://www.instagram.com/lauravill_design/?hl=da'
                    className='italic underline'
                  >
                    instragram
                  </a>
                </Col>
                <Col sm={4} md={2} lg={3}>
                  <a
                    href='https://www.linkedin.com/in/laura-villumsen-design'
                    className='italic underline'
                  >
                    linkedin
                  </a>
                </Col>
                <Col sm={4} md={2} lg={3} className='hidden md:block'>
                  <a href='#' className='italic underline'>
                    Til toppen
                  </a>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
