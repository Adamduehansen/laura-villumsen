import { useContext } from 'react';
import { PageDataContext } from './PageDataProvider';
import Link from 'next/link';
import Container from './Container';
import Row from './Row';
import Col from './Col';

interface Props {
  show: boolean;
}

export default function Navigation({ show }: Props): JSX.Element {
  const pageData = useContext(PageDataContext);

  return (
    <nav
      className={`bg-[#E8E6E7] h-full fixed inset-0 -z-10 pt-[88px] duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
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
