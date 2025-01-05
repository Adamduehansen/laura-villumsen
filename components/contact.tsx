import { JSX } from "preact/jsx-runtime";

export function Contact(): JSX.Element {
  return (
    <div>
      <ul>
        <li>
          Open for new biz
        </li>
        <li>
          M:{" "}
          <a href={`mailto:design@lauravillumsen.dk`}>
            design@lauravillumsen.dk
          </a>
        </li>
        <li>
          T:{" "}
          <a href={`tel:+4530118674`}>
            +4530118674
          </a>
        </li>
      </ul>
    </div>
  );
}
