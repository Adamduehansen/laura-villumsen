import { FunctionComponent as FC } from "preact";
import { Block } from "$utils/block.ts";
import { Image } from "$component/image.tsx";
import { JSX } from "preact/jsx-runtime";
import { Col } from "$component/layout/col.tsx";

interface Props {
  block: Block;
}

function isAllTextBlock(blocks: Block[]) {
  return blocks.every((block) =>
    block.type === "heading" || block.type === "text"
  );
}

// TODO: Could we optimize this further so that there are no redundant elements?
function getBlock(block: Block): JSX.Element | null | never {
  switch (block.type) {
    case "heading":
      return (
        <Col>
          {block.variant === "h1" && (
            <h1 class="text-xl mb-8.5 mx-2.5">{block.text}</h1>
          )}
        </Col>
      );
    case "text":
      return (
        <Col>
          <p class="mx-2.5">{block.text}</p>
        </Col>
      );
    case "video":
      return (
        <Col>
          <figure>
            <video muted loop autoPlay src={block.src}>
            </video>
          </figure>
        </Col>
      );
    case "image":
      return (
        <Col>
          <Image src={block.src} />
        </Col>
      );
    case "case-info":
      return null;
    case "two-columns":
      return (
        <>
          <Col
            lg={6}
            className={isAllTextBlock(block.left) ? "my-7 mx-2.5" : undefined}
          >
            {block.left.map((block): JSX.Element | null | never => {
              switch (block.type) {
                case "image":
                  return <Image src={block.src} alt={block.alt} />;
                case "heading":
                  return <h2 class="text-xl">{block.text}</h2>;
                case "text":
                  return <p class="text-sm">{block.text}</p>;
                case "video":
                  return <video autoplay loop src={block.src}></video>;
                case "case-info":
                  return null;
                case "two-columns":
                  return null;
              }
            })}
          </Col>
          <Col
            lg={6}
            className={isAllTextBlock(block.right) ? "my-7 mx-2.5" : undefined}
          >
            {block.right.map((block): JSX.Element | null | never => {
              switch (block.type) {
                case "image":
                  return <Image src={block.src} alt={block.alt} />;
                case "heading":
                  return <h2 class="text-xl">{block.text}</h2>;
                case "text":
                  return <p class="text-sm">{block.text}</p>;
                case "video":
                  return <video autoplay loop src={block.src}></video>;
                case "case-info":
                  return null;
                case "two-columns":
                  return null;
              }
            })}
          </Col>
        </>
      );
  }
}

export const CaseBlock: FC<Props> = function ({ block }) {
  return getBlock(block);
};
