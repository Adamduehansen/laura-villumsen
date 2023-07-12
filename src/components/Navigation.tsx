import { useContext } from 'react';
import { PageDataContext } from './PageDataProvider';
import Link from 'next/link';

export default function Navigation(): JSX.Element {
  const pageData = useContext(PageDataContext);

  return (
    <nav>
      <ul>
        {pageData.navigationItems.map(({ id, text, url }): JSX.Element => {
          return (
            <li key={id}>
              <Link href={url}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
