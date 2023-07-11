import Link from 'next/link';
import { useContext } from 'react';
import { PageDataContext } from './PageData';
import Navigation from './Navigation';

export default function Header(): JSX.Element {
  const pageData = useContext(PageDataContext);

  return (
    <header>
      <Link href='/'>{pageData.siteName}</Link>
      <Navigation />
    </header>
  );
}
