import { JSX } from "preact/jsx-runtime";
import { CaseContentWrapper } from "$component/case-content/case-content-wrapper.tsx";

interface Props {
  services: string[];
}

export function CaseServices({ services }: Props): JSX.Element | null {
  return (
    <CaseContentWrapper heading="Services">
      <ul>
        {services.map((tagName) => {
          return <li>{tagName}</li>;
        })}
      </ul>
    </CaseContentWrapper>
  );
}
