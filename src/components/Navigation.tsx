import { useContext } from 'react';
import { PageDataContext } from './PageDataProvider';
import Link from 'next/link';
import Container from './Container';
import Row from './Row';
import Col from './Col';

export default function Navigation(): JSX.Element {
  const pageData = useContext(PageDataContext);

  return (
    <nav className='bg-[#E8E6E7] h-full'>
      <Container>
        <Row>
          {pageData.navigationItems.map(({ id, text, url }): JSX.Element => {
            return (
              <Col key={id}>
                <Link href={url}>{text}</Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </nav>
  );
}
