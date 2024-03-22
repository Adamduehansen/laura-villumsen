import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Rootlayout({
  children,
}: React.PropsWithChildren): Promise<JSX.Element> {
  return (
    <html lang='da' className='scroll-smooth'>
      <head>
        <link
          rel='stylesheet'
          href='https://use.typekit.net/wsq1sgw.css'
        ></link>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
