import { JSX } from "preact/jsx-runtime";

interface Props {
  website: string | null;
}

export function CaseWebsite({ website }: Props): JSX.Element | null {
  if (website === null) {
    return null;
  }

  return (
    <div>
      <a href={website} target="_BLANK" rel="noopener noreferrer">
        View website here
      </a>
    </div>
  );
}
