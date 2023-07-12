import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import PageDataProvider from '@/components/PageData';
import { PageProps } from '@/utils/models';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <PageDataProvider pageData={pageProps}>
      <Header />
      <Component {...pageProps} />;
    </PageDataProvider>
  );
}
