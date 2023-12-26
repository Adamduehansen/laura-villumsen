import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';

export default async function Rootlayout({
  children,
}: React.PropsWithChildren): Promise<JSX.Element> {
  return (
    <html lang='da'>
      <head>
        <link
          rel='stylesheet'
          href='https://use.typekit.net/wsq1sgw.css'
        ></link>
        <link rel='shortcut icon' href='favicon.png' type='image/x-icon' />
      </head>
      <body className='flex h-screen flex-col'>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
