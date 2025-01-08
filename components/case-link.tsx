import { FunctionComponent as FC } from "preact";

interface Props {
  link: string;
}

export const CaseLink: FC<Props> = function ({ link, children }) {
  const url = new URL(link);

  // TODO: missing hover animation.
  return (
    <a href={url.pathname} class="block relative">
      {children}
    </a>
  );
};
