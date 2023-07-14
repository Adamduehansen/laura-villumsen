import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='da'>
      <Head>
        <link
          rel='stylesheet'
          href='https://use.typekit.net/wsq1sgw.css'
        ></link>
        <link rel='shortcut icon' href='favicon.png' type='image/x-icon' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
