import { JSX } from "preact/jsx-runtime";
import { CaseContentWrapper } from "$component/case-content/case-content-wrapper.tsx";

interface Props {
  date: string;
}

export function CaseYear({ date }: Props): JSX.Element {
  return (
    <CaseContentWrapper heading="Year">
      <p>{date.slice(0, 4)}</p>
    </CaseContentWrapper>
  );
}
