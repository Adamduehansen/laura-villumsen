import { type PageProps } from "$fresh/server.ts";
import { Header } from "../components/header.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>laura-villumsen</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body>
        <Header />
        <Component />
      </body>
    </html>
  );
}
