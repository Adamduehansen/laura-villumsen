import { useContext } from 'react';
import { PageDataContext } from './PageDataProvider';
import { NavigationItem } from '@/utils/models';

function toSocialComponent({ id, url, text }: NavigationItem): JSX.Element {
  return (
    <li key={id}>
      <a href={url} rel='noopener noreferrer'>
        {text}
      </a>
    </li>
  );
}
export default function Footer(): JSX.Element {
  const pageData = useContext(PageDataContext);

  const socialLinkComponents = pageData.socials.map(toSocialComponent);

  return (
    <footer>
      <nav>
        <ul>{socialLinkComponents}</ul>
      </nav>
    </footer>
  );
}
