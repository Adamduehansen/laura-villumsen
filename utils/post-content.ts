import { HTMLElement, Node, NodeType, parse } from "node-html-parser";

interface TextBlock {
  type: "text";
  text: string;
}

interface VideoBlock {
  type: "video";
  src: string;
}

interface ImageBlock {
  type: "image";
  src: string;
}

type ContentBlock = TextBlock | ImageBlock | VideoBlock;

interface TwoColumnBlock {
  type: "two-columns";
  left: ContentBlock | null;
  right: ContentBlock | null;
}

type Block = ContentBlock | TwoColumnBlock;

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

  #getBlocks(nodes: HTMLElement[]): Block[] {
    return nodes.reduce<Block[]>((nodes, node): Block[] => {
      const { classList } = node;

      if (classList.contains("wp-block-columns")) {
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
    const { classList, tagName } = htmlElement;
    if (classList.contains("wp-block-image")) {
      const imageElement = htmlElement.querySelector("img");
      if (imageElement === null) {
        console.log("Whops, image figure had no image element");
        return null;
      }
      const imageSrc = imageElement.getAttribute("src");
      if (imageSrc === undefined) {
        console.log("Whops, video element had no src");
        return null;
      }
      return {
        type: "image",
        src: imageSrc,
      };
    } else if (classList.contains("wp-block-video")) {
      const videoElement = htmlElement.querySelector("video");
      if (videoElement === null) {
        console.log("Whops, video figure had no video element");
        return null;
      }
      const videoSrc = videoElement.getAttribute("src");
      if (videoSrc === undefined) {
        console.log("Whops, video element had no src");
        return null;
      }
      return {
        type: "video",
        src: videoSrc,
      };
    } else if (tagName.toLowerCase() === "p") {
      return {
        type: "text",
        text: htmlElement.innerText,
      };
    }

    return null;
  }
}
