import Link from 'next/link';
import Container from './Container';
import Navigation from './Navigation';

export default function Header(): JSX.Element {
  return (
    <header className='fixed inset-x-0'>
      <div className='bg-transparent lg:py-2'>
        <Container>
          <div className='flex items-center justify-between pb-6'>
            <Link
              href='/'
              className='block lg:flex lg:w-full lg:justify-between lg:text-lg'
            >
              <div>Laura Villumsen, Grafisk Designer</div>
              <div>Portefølje</div>
            </Link>
            <Navigation />
          </div>
        </Container>
      </div>
    </header>
  );
}
