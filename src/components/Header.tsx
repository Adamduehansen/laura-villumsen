import Link from 'next/link';
import { useContext, useState } from 'react';
import { PageDataContext } from './PageDataProvider';
import Image from 'next/image';
import Container from './Container';
import Navigation from './Navigation';

export default function Header(): JSX.Element {
  const [showBurgerMenu, setshowBurgerMenu] = useState(false);

  const { siteName, subName } = useContext(PageDataContext);

  function toggleBurgerMenu(): void {
    setshowBurgerMenu((current) => !current);
  }

  return (
    <header className='fixed inset-x-0'>
      <div className='bg-white'>
        <Container>
          <div className='flex justify-between items-center pt-4 pb-6'>
            <Link
              href='/'
              className='block md:w-full md:flex md:justify-between'
            >
              <div>{siteName}</div>
              <div>{subName}</div>
            </Link>
            <button onClick={toggleBurgerMenu} className='w-5 h-5 md:hidden'>
              <Image src='add.svg' alt='' width={20} height={20} />
            </button>
          </div>
        </Container>
      </div>
      <Navigation show={showBurgerMenu} />
    </header>
  );
}
