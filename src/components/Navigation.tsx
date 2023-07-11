import { useContext } from 'react';
import { PageDataContext } from './PageData';

export default function Navigation(): JSX.Element {
  const pageData = useContext(PageDataContext);

  return (
    <nav>
      <ul>
        {pageData.navigationItems.map(({ id, text, url }): JSX.Element => {
          return (
            <li key={id}>
              <a href={url}>{text}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
