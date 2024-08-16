import type { PageProps } from "fresh";
import { getPageContent } from "../services/page.ts";

export default async function App({ Component, req }: PageProps) {
  const { navigationMenu, contactMenu, socialMenu } = await getPageContent();

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Laura Villumsen</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </head>
      <body>
        <header>
          <div>
            <a href="/">Laura Villumsen</a>
            <p>{new URL(req.url).pathname}</p>
          </div>
          <nav>
            <ul>
              {navigationMenu.nodes.map((menuItem) => {
                return (
                  <li>
                    <a href={menuItem.uri}>{menuItem.label}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div>
            <ul>
              <li>
                M:{" "}
                <a href={`mailto:${contactMenu.email}`}>
                  {contactMenu.email}
                </a>
              </li>
              <li>
                T:{" "}
                <a href={`mailto:${contactMenu.phone}`}>
                  {contactMenu.phone}
                </a>
              </li>
            </ul>
          </div>
        </header>
        <Component />
        <footer>
          <p>{contactMenu.inquiries}</p>
          <ul>
            {socialMenu.nodes.map((menuItem) => {
              return (
                <li>
                  <a href={menuItem.uri}>{menuItem.label}</a>
                </li>
              );
            })}
            <li>
              <a href="#top">To the top</a>
            </li>
          </ul>
          <p>©2024</p>
          <div>
            <p>Design by Laura Villumsen</p>
            <p>Coded by Adam Due Hansen</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
