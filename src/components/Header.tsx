import Link from 'next/link';
import { useContext } from 'react';
import { PageDataContext } from './PageDataProvider';
import Navigation from './Navigation';

export default function Header(): JSX.Element {
  const { siteName, subName } = useContext(PageDataContext);

  return (
    <header>
      <Link href='/' className='block'>
        <div>{siteName}</div>
        <div>{subName}</div>
      </Link>
      <Navigation />
    </header>
  );
}
