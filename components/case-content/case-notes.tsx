import { JSX } from "preact/jsx-runtime";
import { CaseContentWrapper } from "$component/case-content/case-content-wrapper.tsx";

interface Props {
  notes: string[];
}

export function CaseNotes({ notes }: Props): JSX.Element | null {
  if (notes.length === 0) {
    return null;
  }

  return (
    <CaseContentWrapper heading="Notes">
      <ul>
        {notes.map((note) => {
          return <li>{note}</li>;
        })}
      </ul>
    </CaseContentWrapper>
  );
}
