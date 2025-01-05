import { JSX } from "preact/jsx-runtime";

export function Navigation(): JSX.Element {
  return (
    <nav class="flex-1 flex items-center">
      <ul class="text-4xl">
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
