import { useContext } from 'react';
import Image from 'next/image';
import { PageDataContext } from './PageDataProvider';
import { NavigationItem } from '@/utils/models';
import Margin from './Margin';

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
      <Margin>
        <div className='flex'>
          footer
          <Image
            src='arrow-right.svg'
            alt=''
            width={14}
            height={12}
            className='inline'
          />
        </div>
        <nav>
          <ul>{socialLinkComponents}</ul>
        </nav>
      </Margin>
    </footer>
  );
}
