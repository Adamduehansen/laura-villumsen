import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Container from './Container';
import Navigation from './Navigation';
import { PageDataContext } from './PageDataProvider';

export default function Header(): JSX.Element {
  const [showBurgerMenu, setshowBurgerMenu] = useState(false);

  const { siteName, subName } = useContext(PageDataContext);

  function toggleBurgerMenu(): void {
    setshowBurgerMenu((current) => !current);
  }

  return (
    <header className='fixed inset-x-0'>
      <div className='bg-white md:py-2'>
        <Container>
          <div className='flex items-center justify-between pb-6 pt-4 md:p-0'>
            <Link
              href='/'
              className='block md:flex md:w-full md:justify-between md:text-lg'
            >
              <div>{siteName}</div>
              <div>{subName}</div>
            </Link>
            <button onClick={toggleBurgerMenu} className='h-5 w-5 md:hidden'>
              <Image src='add.svg' alt='' width={20} height={20} />
            </button>
          </div>
        </Container>
      </div>
      <Navigation show={showBurgerMenu} />
    </header>
  );
}
