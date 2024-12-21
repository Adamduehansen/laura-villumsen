import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";

export function Image(props: JSX.IntrinsicElements["img"]): JSX.Element {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href={props.src} />
      </Head>
      <img {...props} decoding="async" />
    </>
  );
}
