import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import PageDataProvider from '@/components/PageDataProvider';
import { PageProps } from '@/utils/models';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <>
      <PageDataProvider pageData={pageProps}>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </PageDataProvider>
    </>
  );
}
