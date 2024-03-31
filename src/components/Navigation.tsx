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
  email: string;
  phone: string;
};

export default function Navigation({
  menuItems,
  email,
  phone,
}: Props): React.JSX.Element {
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

  const [worksMenuItem, aboutMenuItem] = menuItems;

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
            <Row as='nav' className='mb-10'>
              <Col className='relative text-7xl lg:text-8xl group' lg={3}>
                <Link href={worksMenuItem.uri}>{worksMenuItem.label}</Link>
                <svg
                  width={48}
                  height={48}
                  className='rotate-180 hidden group-hover:lg:block lg:absolute lg:top-7 lg:left-52'
                >
                  <use href='/icons.svg#arrow' />
                </svg>
              </Col>
              <Col className='relative text-7xl lg:text-8xl group' lg={3}>
                <svg
                  width={48}
                  height={48}
                  className='hidden inset-y-auto group-hover:lg:block lg:absolute lg:top-7 lg:-left-14'
                >
                  <use href='/icons.svg#arrow' />
                </svg>
                <Link href={aboutMenuItem.uri}>{aboutMenuItem.label}</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  M:{' '}
                  <a className='text-link' href='mailto:'>
                    {email}
                  </a>
                </p>
                <p>
                  T: <a href={`tel:${phone.replaceAll(' ', '')}`}>{phone}</a>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
