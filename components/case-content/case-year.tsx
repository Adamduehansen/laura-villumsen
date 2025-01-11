import { JSX } from "preact/jsx-runtime";
import { CaseContentWrapper } from "$component/case-content/case-content-wrapper.tsx";

interface Props {
  year: string;
}

export function CaseYear({ year }: Props): JSX.Element {
  return (
    <CaseContentWrapper heading="Year">
      <p>{year}</p>
    </CaseContentWrapper>
  );
}
