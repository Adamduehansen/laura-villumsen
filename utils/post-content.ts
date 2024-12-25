import { HTMLElement, Node, NodeType, parse } from "node-html-parser";
import { Block, ContentBlock } from "$utils/block.ts";
import { BlockCreator, BlockFactory } from "$utils/block-factory.ts";

export class PostContent {
  readonly intro: string;
  readonly text: string;
  readonly blocks: Block[];

  constructor(rawContent: string) {
    const htmlDocument = parse(rawContent);
    const [intro, text, ...rest] = htmlDocument.childNodes.filter(
      this.#isHtmlNode,
    );

    this.intro = intro.innerText;
    this.text = text.innerText;
    this.blocks = this.#getBlocks(rest);
  }

  #isHtmlNode(node: Node): node is HTMLElement {
    return node.nodeType === NodeType.ELEMENT_NODE;
  }

  #isImageBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-image");
  }

  #isVideoBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-video");
  }

  #isTextBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.tagName.toLowerCase() === "p";
  }

  #isColumnBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-columns");
  }

  #getBlocks(nodes: HTMLElement[]): Block[] {
    return nodes.reduce<Block[]>((nodes, node): Block[] => {
      if (this.#isColumnBlock(node)) {
        const columns = node.querySelectorAll("div");
        if (columns.length !== 2) {
          console.log("Whops, columns are not correct number");
          return nodes;
        }
        const [leftElement, rightElement] = columns;

        const leftElementChild =
          leftElement.childNodes.filter(this.#isHtmlNode)[0];
        const rightElementChild =
          rightElement.childNodes.filter(this.#isHtmlNode)[0];

        if (leftElementChild === undefined || rightElementChild === undefined) {
          console.log("Whops, columns does not have children");
          return nodes;
        }

        if (
          !this.#isHtmlNode(leftElementChild) ||
          !this.#isHtmlNode(rightElementChild)
        ) {
          console.log("Whops, column children is not HTML elements");
          return nodes;
        }

        return [...nodes, {
          type: "two-columns",
          left: this.#getBlock(leftElementChild),
          right: this.#getBlock(rightElementChild),
        }];
      }

      const block = this.#getBlock(node);

      if (block === null) {
        return nodes;
      } else {
        return [...nodes, block];
      }
    }, []);
  }

  #getBlock(htmlElement: HTMLElement): ContentBlock | null {
    let blockCreator: BlockCreator | null = null;
    if (this.#isImageBlock(htmlElement)) {
      blockCreator = BlockFactory.get("image");
    } else if (this.#isVideoBlock(htmlElement)) {
      blockCreator = BlockFactory.get("video");
    } else if (this.#isTextBlock(htmlElement)) {
      blockCreator = BlockFactory.get("text");
    }

    return blockCreator?.create(htmlElement) ?? null;
  }
}
