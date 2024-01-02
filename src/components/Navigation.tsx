'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Container from './Container';
import NavigationItem from './NavigationItem';

export default function Navigation(): JSX.Element {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  function toggleBurgerMenu(): void {
    setShow((current) => !current);
  }

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={toggleBurgerMenu}
        className='h-5 w-5 lg:hidden'
        aria-label='menu'
      >
        <Image
          src='/add.svg'
          alt=''
          width={20}
          height={20}
          className={classNames('duration-300', {
            'rotate-45': show,
            'rotate-0': !show,
          })}
        />
      </button>
      <nav
        className={classNames(
          'fixed inset-0 -z-10 h-full bg-[#E8E6E7] pt-main duration-300',
          {
            'translate-y-0': show,
            '-translate-y-full': !show,
          },
          'lg:bottom-0 lg:top-auto lg:h-auto lg:translate-y-0 lg:bg-transparent lg:pt-0',
        )}
      >
        <Container className='h-full'>
          <ul className='max-[375px]:w-[13.4rem] flex h-full w-64 flex-col justify-around leading-none lg:flex-row lg:justify-between md:w-full'>
            <NavigationItem
              text='Arbejde'
              url='/'
              className='lg:after:hover:content-[url(/arrow-left.svg)] lg:after:hover:absolute lg:after:hover:w-12 lg:after:hover:-right-12 xl:after:hover:w-16 xl:after:hover:-right-16'
            />
            <NavigationItem
              text='Om mig'
              url='/om-mig'
              className='lg:after:hover:content-[url(/arrow-right.svg)] lg:after:hover:absolute lg:after:hover:w-12 lg:after:hover:-left-12 xl:after:hover:w-16 xl:after:hover:-left-16'
            />
            <NavigationItem
              text='Kontakt'
              url='/kontakt'
              className='lg:after:hover:content-[url(/arrow-right.svg)] lg:after:hover:absolute lg:after:hover:w-12 lg:after:hover:-left-12 xl:after:hover:w-16 xl:after:hover:-left-16'
            />
          </ul>
        </Container>
      </nav>
    </>
  );
}
