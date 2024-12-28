import { JSX } from "preact/jsx-runtime";

interface Props {
  client: string;
}

export function CaseClient({ client }: Props): JSX.Element {
  return (
    <div>
      <p>Client</p>
      <p>{client}</p>
    </div>
  );
}
