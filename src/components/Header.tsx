import { wordPressClient } from '@/services/WordPressClient';
import Link from 'next/link';
import Breadcrumb from './Breadcrumb';
import Col from './Col';
import Container from './Container';
import Navigation from './Navigation';
import Row from './Row';

export default async function Header() {
  const navigation = await wordPressClient.menu.getMenu('navigation');
  const contactInfo = await wordPressClient.meta.getContactInfo();

  return (
    <header className='z-10'>
      <Container>
        <Row>
          <Col>
            <div className='flex justify-between py-12 lg:py-0 z-20 items-start'>
              <div className='z-20 lg:flex lg:justify-between lg:fixed lg:left-[10px] lg:right-[10px] lg:top-3'>
                <Link href='/' className='block z-20'>
                  Laura Villumsen
                </Link>
                <Breadcrumb />
              </div>
              <Navigation
                menuItems={navigation}
                email={contactInfo.email}
                phone={contactInfo.phone}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
