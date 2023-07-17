import classNames from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';
import Container from './Container';
import { PageDataContext } from './PageDataProvider';

interface Props {
  show: boolean;
}

export default function Navigation({ show }: Props): JSX.Element {
  const pageData = useContext(PageDataContext);

  return (
    <nav
      className={classNames(
        'fixed inset-0 -z-10 h-full bg-[#E8E6E7] pt-main duration-300',
        {
          'translate-y-0': show,
          '-translate-y-full': !show,
        },
        'md:bottom-0 md:top-auto md:h-auto md:translate-y-0 md:bg-transparent md:pt-0',
      )}
    >
      <Container className='h-full'>
        <ul className='flex h-full w-64 flex-col justify-around leading-none md:flex-row md:justify-between'>
          {pageData.navigationItems.map(({ id, text, url }): JSX.Element => {
            return (
              <li key={id}>
                <Link
                  href={url}
                  className='block break-words font-owners-wide text-[5rem] uppercase max-[375px]:text-[4.375rem]'
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
