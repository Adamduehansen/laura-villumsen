import { useContext } from 'react';
import { PageDataContext } from './PageDataProvider';
import Link from 'next/link';
import Container from './Container';
import classNames from 'classnames';

interface Props {
  show: boolean;
}

export default function Navigation({ show }: Props): JSX.Element {
  const pageData = useContext(PageDataContext);

  return (
    <nav
      className={classNames(
        'bg-[#E8E6E7] h-full fixed inset-0 -z-10 pt-main duration-300',
        {
          'translate-y-0': show,
          '-translate-y-full': !show,
        },
        'md:translate-y-0 md:bg-transparent md:h-auto md:bottom-0 md:top-auto md:pt-0'
      )}
    >
      <Container className='h-full'>
        <div className='flex flex-col h-full justify-around'>
          {pageData.navigationItems.map(({ id, text, url }): JSX.Element => {
            return (
              <Link key={id} href={url} className='block'>
                {text}
              </Link>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
