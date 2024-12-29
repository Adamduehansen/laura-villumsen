import { JSX } from "preact/jsx-runtime";
import { CaseContentWrapper } from "$component/case-content/case-content-wrapper.tsx";

interface Props {
  client: string;
}

export function CaseClient({ client }: Props): JSX.Element {
  return (
    <CaseContentWrapper heading="Client">
      <p>{client}</p>
    </CaseContentWrapper>
  );
}
