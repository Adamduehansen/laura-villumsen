import classNames from 'classnames';
import { useContext } from 'react';
import Container from './Container';
import NavigationItem from './NavigationItem';
import { PageDataContext } from './PageDataProvider';

interface Props {
  show: boolean;
}

export default function Navigation({ show }: Props): JSX.Element {
  const pageData = useContext(PageDataContext);

  const [firstNavigation, secondNavigation, thirdNavigation] =
    pageData.navigationItems;

  return (
    <nav
      className={classNames(
        'fixed inset-0 -z-10 h-full bg-[#E8E6E7] pt-main duration-300',
        {
          'translate-y-0': show,
          '-translate-y-full': !show,
        },
        'lg:bottom-0 lg:top-auto lg:h-auto lg:translate-y-0 lg:bg-transparent lg:pt-0',
      )}
    >
      <Container className='h-full'>
        <ul className='max-[375px]:w-[13.4rem] flex h-full w-64 flex-col justify-around leading-none lg:flex-row lg:justify-between md:w-full'>
          <NavigationItem
            text={firstNavigation.text}
            url={firstNavigation.url}
            className='after:content-["-"] after:absolute after:top-0 after:-right-6 md:after:content-none'
          />
          <NavigationItem
            text={secondNavigation.text}
            url={secondNavigation.url}
          />
          <NavigationItem
            text={thirdNavigation.text}
            url={thirdNavigation.url}
            className='after:content-["-"] after:absolute after:top-0 after:-right-6 md:after:content-none'
          />
        </ul>
      </Container>
    </nav>
  );
}
