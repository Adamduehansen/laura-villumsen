import { NavigationItem } from '@/utils/models';
import Image from 'next/image';
import { useContext } from 'react';
import Col from './Col';
import Container from './Container';
import { PageDataContext } from './PageDataProvider';
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
  const pageData = useContext(PageDataContext);
  const [instagram, linkedIn] = pageData.socials.map(toSocialComponent);

  return (
    <footer className='my-20'>
      <Container>
        <Row>
          <Col lgStart={9}>
            <Container fluid>
              <Row>
                <Col sm={4} md={2} lg={3}>
                  <div className='flex gap-1'>
                    footer
                    <Image
                      src='arrow-right.svg'
                      alt=''
                      width={14}
                      height={24}
                      className='inline'
                    />
                  </div>
                </Col>
                <Col sm={4} md={2} lg={3}>
                  {instagram}
                </Col>
                <Col sm={4} md={2} lg={3}>
                  {linkedIn}
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
