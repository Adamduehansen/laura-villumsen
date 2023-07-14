import { useContext } from 'react';
import Image from 'next/image';
import { PageDataContext } from './PageDataProvider';
import { NavigationItem } from '@/utils/models';
import Container from './Container';
import Row from './Row';
import Col from './Col';

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
    <footer>
      <Container>
        <Row>
          <Col sm={4}>
            <div className='flex gap-1'>
              footer
              <Image
                src='arrow-right.svg'
                alt=''
                width={14}
                height={12}
                className='inline'
              />
            </div>
          </Col>
          <Col sm={4}>{instagram}</Col>
          <Col sm={4}>{linkedIn}</Col>
        </Row>
      </Container>
    </footer>
  );
}
