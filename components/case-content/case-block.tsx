import { FunctionComponent as FC } from "preact";
import { Block } from "$utils/block.ts";
import { Image } from "$component/image.tsx";
import { JSX } from "preact/jsx-runtime";
import { Col } from "$component/layout/col.tsx";

interface Props {
  block: Block;
}

// TODO: Could we optimize this further so that there are no redundant elements?

function getBlock(block: Block): JSX.Element | never {
  switch (block.type) {
    case "heading":
      return (
        <Col>
          <h2>{block.text}</h2>
        </Col>
      );
    case "text":
      return (
        <Col>
          <p>{block.text}</p>
        </Col>
      );
    case "video":
      return (
        <Col>
          <video autoplay loop src={block.src}></video>
        </Col>
      );
    case "image":
      return (
        <Col>
          <Image src={block.src} />
        </Col>
      );
    case "two-columns":
      return (
        <>
          <Col lg={6}>
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
                case "two-columns":
                  return null;
              }
            })}
          </Col>
          <Col lg={6}>
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
