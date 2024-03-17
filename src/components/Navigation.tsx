'use client';

import { MenuItem } from '@/services/MenuRepository';
import classNames from 'classnames';
import { useState } from 'react';
import Col from './Col';
import Container from './Container';
import Row from './Row';

type Props = {
  menuItems: MenuItem[];
};

export default function Navigation({ menuItems }: Props): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
  }

  return (
    <div>
      <button onClick={toggleMobileMenu} className='z-20 relative'>
        {isMobileMenuOpen ? 'Close' : 'Menu'}
      </button>
      <div
        className={classNames('z-10 fixed inset-0 bg-[#E8E6E7] duration-200', {
          'translate-y-0': isMobileMenuOpen,
          '-translate-y-full': !isMobileMenuOpen,
        })}
      >
        <div className='absolute bottom-0'>
          <Container>
            <Row>
              <Col>
                <nav>
                  <ul>
                    {menuItems.map((menuItem): React.JSX.Element => {
                      return (
                        <li key={menuItem.id}>
                          <a href={menuItem.uri}>{menuItem.label}</a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <p>
                  M: <a href='mailto:'>design@lauravillumsen.dk</a>
                </p>
                <p>
                  M: <a href='tel:+'>+45 88888888</a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
