import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import PageDataProvider from '@/components/PageDataProvider';
import { PageProps } from '@/utils/models';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://use.typekit.net/wsq1sgw.css'
        ></link>
        <link rel='shortcut icon' href='favicon.png' type='image/x-icon' />
      </Head>
      <PageDataProvider pageData={pageProps}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </PageDataProvider>
    </>
  );
}
