import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageDataProvider from '@/components/PageDataProvider';
import '@/styles/globals.css';
import { PageProps } from '@/utils/models';
import type { AppProps } from 'next/app';

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
