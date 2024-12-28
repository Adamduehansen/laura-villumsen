import { JSX } from "preact/jsx-runtime";

interface Props {
  services: string[];
}

export function CaseServices({ services }: Props): JSX.Element | null {
  return (
    <div>
      <p>Services</p>
      <ul>
        {services.map((tagName) => {
          return <li>{tagName}</li>;
        })}
      </ul>
    </div>
  );
}
