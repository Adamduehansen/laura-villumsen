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
      <a
        href={website}
        class="text-link"
        target="_BLANK"
        rel="noopener noreferrer"
      >
        Visit website here
      </a>
    </div>
  );
}
