import { PageData } from '@/utils/models';
import { createContext } from 'react';

export const PageDataContext = createContext<PageData>({
  siteName: '',
  description: '',
  title: '',
  navigationItems: [],
  socials: [],
});

type Props = React.PropsWithChildren<{
  pageData: PageData;
}>;

export default function PageDataProvider({
  pageData,
  children,
}: Props): JSX.Element {
  return (
    <PageDataContext.Provider value={pageData}>
      {children}
    </PageDataContext.Provider>
  );
}
