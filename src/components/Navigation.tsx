'use client';

import { MenuItem } from '@/services/MenuRepository';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Col from './Col';
import Container from './Container';
import Row from './Row';

type Props = {
  menuItems: MenuItem[];
};

export default function Navigation({ menuItems }: Props): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.documentElement.classList.remove('overflow-hidden');
  }, [pathname]);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((current) => !current);
    document.documentElement.classList.toggle('overflow-hidden');
  }

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className='z-20 relative flex items-center gap-x-1 lg:hidden'
      >
        <svg
          width={14}
          height={14}
          className={classNames('rotate-0 duration-200', {
            'rotate-45 duration-200': isMobileMenuOpen,
          })}
        >
          <use href='/icons.svg#plus' />
        </svg>
        {isMobileMenuOpen ? 'Close' : 'Menu'}
      </button>
      <div
        className={classNames(
          'z-10 fixed inset-0 bg-[#E8E6E7] duration-200 lg:translate-y-0 lg:bg-transparent lg:bottom-0 lg:inset-y-auto lg:inset-x-0',
          {
            'translate-y-0': isMobileMenuOpen,
            '-translate-y-full': !isMobileMenuOpen,
          },
        )}
      >
        <div className='absolute bottom-0 lg:inset-x-0'>
          <Container>
            <Row>
              <Col>
                <nav className='mb-10'>
                  <ul className='lg:flex lg:gap-x-10'>
                    {menuItems.map((menuItem): React.JSX.Element => {
                      return (
                        <li key={menuItem.id} className='text-7xl lg:text-8xl'>
                          <Link href={menuItem.uri}>{menuItem.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className='mb-10'>
                  <p>
                    M:{' '}
                    <a className='text-link' href='mailto:'>
                      design@lauravillumsen.dk
                    </a>
                  </p>
                  <p>
                    T: <a href='tel:+'>+45 88888888</a>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
