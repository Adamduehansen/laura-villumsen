import { wordPressClient } from '@/services/WordPressClient';
import Col from './Col';
import Container from './Container';
import Navigation from './Navigation';
import Row from './Row';

export default async function Header() {
  const navigation = await wordPressClient.menu.getMenu('navigation');

  return (
    <header className='z-10'>
      <Container>
        <Row>
          <Col>
            <div className='flex justify-between py-12 z-20'>
              <div className='z-20'>
                <p>Laura Villumsen</p>
                <p>Portfolio</p>
              </div>
              <p className='hidden lg:block z-20'>Portfolio</p>
              <Navigation menuItems={navigation} />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
