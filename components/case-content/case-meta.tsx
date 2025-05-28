import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";

interface Props {
  title: string;
  description: string;
  ogImageUrl: string | null;
  ogImageAlt: string | null;
  ogUrl: string;
}

export function CaseMeta({
  title,
  description,
  ogImageUrl,
  ogImageAlt,
  ogUrl,
}: Props): JSX.Element {
  return (
    <Head>
      <title>{title} | Laura Villumsen, Graphic Designer</title>
      <meta
        name="description"
        content={description}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImageUrl !== null && (
        <>
          <meta property="og:image" content={ogImageUrl} />
          {ogImageAlt !== null && (
            <meta property="og:image:alt" content={ogImageAlt} />
          )}
        </>
      )}
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta
        property="og:site_name"
        content="Laura Villumsen, Graphic Designer"
      />
    </Head>
  );
}
