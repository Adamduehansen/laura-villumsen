import { JSX } from "preact/jsx-runtime";

interface Props {
  date: string;
}

export function CaseYear({ date }: Props): JSX.Element {
  return (
    <div>
      <p>Year</p>
      <p>{date.slice(0, 4)}</p>
    </div>
  );
}
