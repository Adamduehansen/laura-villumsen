import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Container from './Container';
import Navigation from './Navigation';
import { PageDataContext } from './PageDataProvider';

export default function Header(): JSX.Element {
  const [showBurgerMenu, setshowBurgerMenu] = useState(false);
  const { siteName } = useContext(PageDataContext);
  const { events } = useRouter();

  function toggleBurgerMenu(): void {
    setshowBurgerMenu((current) => !current);
  }

  function handleRouteChangeCompleteEvent() {
    setshowBurgerMenu(false);
  }

  useEffect(() => {
    events.on('routeChangeComplete', handleRouteChangeCompleteEvent);
  }, [events]);

  return (
    <header className='fixed inset-x-0'>
      <div className='bg-transparent lg:py-2'>
        <Container>
          <div className='flex items-center justify-between pb-6'>
            <Link
              href='/'
              className='block lg:flex lg:w-full lg:justify-between lg:text-lg'
            >
              <div>{siteName}</div>
              <div>Portefølje</div>
            </Link>
            <button
              onClick={toggleBurgerMenu}
              className='h-5 w-5 lg:hidden'
              aria-label='menu'
            >
              <Image
                src='add.svg'
                alt=''
                width={20}
                height={20}
                className={classNames('duration-300', {
                  'rotate-45': showBurgerMenu,
                  'rotate-0': !showBurgerMenu,
                })}
              />
            </button>
          </div>
        </Container>
      </div>
      <Navigation show={showBurgerMenu} />
    </header>
  );
}
