import { transformPathToBreadcrumb } from "../lib/content/transformPathToBreadcrumb.ts";

type Props = {
  path: string;
};

export function Breadcrumb({ path }: Props) {
  return <p>/{transformPathToBreadcrumb(path)}</p>;
}
