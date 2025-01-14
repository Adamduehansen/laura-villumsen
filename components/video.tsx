import { JSX } from "preact/jsx-runtime";

type Props = JSX.IntrinsicElements["video"];

export function Video({ src }: Props): JSX.Element {
  return <video src={src} autoplay muted loop playsinline></video>;
}
