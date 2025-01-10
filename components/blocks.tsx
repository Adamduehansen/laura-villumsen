import { FunctionComponent as FC } from "preact";
import { JSX } from "preact/jsx-runtime";
import classNames from "classnames";
import { Block } from "$utils/block.ts";
import { Container } from "$component/layout/container.tsx";
import { Row } from "$component/layout/row.tsx";
import { Col } from "$component/layout/col.tsx";
import { Image } from "$component/image.tsx";

interface Props {
  blocks: Block[];
}

function parseComponent(block: Block): JSX.Element | null | never {
  switch (block.type) {
    case "columns": {
      return (
        <Container>
          <Row className="lg:gap-x-3">
            {block.columns.map((column) => {
              return (
                <Col lg={column.width}>
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
          class={classNames("mx-2.5 lg:m-0", {
            "text-xl lg:text-3xl": block.size === "extra-large",
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
          class={classNames("mx-2.5 lg:m-0", {
            "text-3xl": block.size === "extra-large",
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
    case "case-info":
      return null;
  }
}

export const Blocks: FC<Props> = function ({ blocks }) {
  return (
    <>
      {blocks.map(parseComponent)}
    </>
  );
};
