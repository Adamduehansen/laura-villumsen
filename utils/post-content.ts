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

  #isHeadingBlock(htmlDocument: HTMLElement): boolean {
    return htmlDocument.tagName.toLowerCase() === "h2";
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

        const leftChildren = leftElement.childNodes.filter(this.#isHtmlNode);
        const rightChildren = rightElement.childNodes.filter(this.#isHtmlNode);

        const rightBlocks: ContentBlock[] = [];
        for (const child of rightChildren) {
          const block = this.#getBlock(child);
          if (block === null) {
            continue;
          }
          rightBlocks.push(block);
        }

        const leftBlocks: ContentBlock[] = [];
        for (const child of leftChildren) {
          const block = this.#getBlock(child);
          if (block === null) {
            continue;
          }
          leftBlocks.push(block);
        }

        return [...nodes, {
          type: "two-columns",
          left: leftBlocks,
          right: rightBlocks,
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
    } else if (this.#isHeadingBlock(htmlElement)) {
      blockCreator = BlockFactory.get("heading");
    }

    return blockCreator?.create(htmlElement) ?? null;
  }
}
