import { JSX } from "preact/jsx-runtime";

export function Navigation(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <a href="work">Work</a>
        </li>
        <li>
          <a href="about">About</a>
        </li>
      </ul>
    </nav>
  );
}
