import { type PageProps } from "$fresh/server.ts";
import { Header } from "../components/header.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* TODO: Use a unique title for each page. */}
        <title>laura-villumsen</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link rel="stylesheet" href="https://use.typekit.net/wsq1sgw.css" />
      </head>
      <body class="font-neue-haas text-base">
        <Header />
        <Component />
      </body>
    </html>
  );
}
