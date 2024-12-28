import { JSX } from "preact/jsx-runtime";

interface Props {
  notes: string[];
}

export function CaseNotes({ notes }: Props): JSX.Element | null {
  if (notes.length === 0) {
    return null;
  }

  return (
    <div>
      <p>Notes</p>
      <ul>
        {notes.map((note) => {
          return <li>{note}</li>;
        })}
      </ul>
    </div>
  );
}
