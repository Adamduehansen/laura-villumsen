import Link from 'next/link';
import { useContext } from 'react';
import { PageDataContext } from './PageDataProvider';
import Image from 'next/image';
import Container from './Container';

export default function Header(): JSX.Element {
  const { siteName, subName } = useContext(PageDataContext);

  return (
    <Container as='header'>
      <div className='flex justify-between items-center mt-4 mb-6'>
        <Link href='/' className='block'>
          <div>{siteName}</div>
          <div>{subName}</div>
        </Link>
        <button className='w-5 h-5'>
          <Image src='add.svg' alt='' width={20} height={20} />
        </button>
      </div>
    </Container>
  );
}
