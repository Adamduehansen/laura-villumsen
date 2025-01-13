import { FunctionComponent as FC } from "preact";
import { JSX } from "preact/jsx-runtime";
import classNames from "classnames";
import { Block } from "$utils/block.ts";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";
import { Image } from "$component/image.tsx";
import { CaseClient } from "$component/case-content/case-client.tsx";
import { CaseNotes } from "$component/case-content/case-notes.tsx";
import { CaseServices } from "$component/case-content/case-services.tsx";
import { CaseWebsite } from "$component/case-content/case-website.tsx";
import { CaseYear } from "$component/case-content/case-year.tsx";

interface Props {
  blocks: Block[];
}

function parseComponent(block: Block): JSX.Element | null | never {
  switch (block.type) {
    case "columns": {
      return (
        <Container fluid>
          <Row className="gap-y-3 lg:gap-y-0 lg:gap-x-3">
            {block.columns.map((column) => {
              return (
                <Col
                  lg={column.width}
                  className="grid gap-y-3 lg:flex lg:flex-col"
                >
                  <Blocks blocks={column.blocks} />
                </Col>
              );
            })}
          </Row>
        </Container>
      );
    }
    case "heading": {
      const H = block.variant;
      return (
        <H
          class={classNames("mx-2.5", {
            "text-xl lg:text-3xl lg:mb-14": block.size === "extra-large",
            "text-xl lg:text-2xl": block.size === "large",
          })}
        >
          {block.text}
        </H>
      );
    }
    case "text":
      return (
        <p
          class={classNames("mx-2.5", {
            "text-3xl lg:mb-14": block.size === "extra-large",
          })}
        >
          {block.text}
        </p>
      );
    case "image":
      return (
        <Image
          src={block.src}
          width={block.width}
          height={block.height}
          alt={block.alt}
          class="w-full"
        />
      );
    case "video":
      // TODO: Create a video component for reusability.
      return <video autoplay muted loop playsInline src={block.src}></video>;
    case "case-info":
      return (
        <Container className="my-8.5">
          <Row className="gap-3">
            <Col sm={6} lg={2}>
              <CaseClient client={block.client} />
            </Col>
            <Col sm={6} lg={2}>
              <CaseYear year={block.year} />
            </Col>
            <Col sm={6} lg={2}>
              <CaseServices services={block.services} />
            </Col>
            <Col sm={6} lg={2}>
              <CaseWebsite website={block.websiteUrl} />
            </Col>
            <Col sm={6} lg={2}>
              <CaseNotes notes={block.notes} />
            </Col>
          </Row>
        </Container>
      );
    case "table":
      // FIXME: cells are vertically centered.
      return (
        <figure class="mb-14 mx-2.5 lg:mx-0">
          <figcaption class="font-semibold mb-4">{block.heading}</figcaption>
          <table>
            <tbody>
              {block.rows.map(([key, value]) => {
                return (
                  <tr class="[&>td]:pb-4">
                    <td class="w-28">{key}</td>
                    <td
                      class="[&>a]:text-link"
                      dangerouslySetInnerHTML={{
                        __html: value,
                      }}
                    >
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </figure>
      );
  }
}

export const Blocks: FC<Props> = function ({ blocks }) {
  return (
    <>
      {blocks.map(parseComponent)}
    </>
  );
};
