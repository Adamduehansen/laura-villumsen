import type { PageProps } from "fresh";
import { getPageContent } from "../services/page.ts";
import { Breadcrumb } from "../components/Breadcrumb.tsx";

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
        <link rel="stylesheet" href="https://use.typekit.net/wsq1sgw.css">
        </link>
      </head>
      <body>
        <header class="container main-header">
          <div>
            <div>
              <a href="/">Laura Villumsen</a>
              <Breadcrumb path={new URL(req.url).pathname} />
            </div>
            <div>
              <input type="checkbox" id="menuToggleInput" />
              <button id="menuToggleButton">
                <label for="menuToggleInput">
                  <svg width={14} height={14}>
                    <use href="/icons.svg#plus" />
                  </svg>
                  Menu
                </label>
              </button>
              <div id="menu">
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
              </div>
            </div>
          </div>
        </header>
        <Component />
        <footer class="container">
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
