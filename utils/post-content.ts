import { HTMLElement, Node, NodeType, parse } from "node-html-parser";

interface TextBlock {
  type: "text";
  text: string;
}

interface VideoBlock {
  type: "video";
  src: string;
}

type Block = TextBlock | VideoBlock;

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

      if (classList.contains("wp-block-video")) {
        const videoElement = node.querySelector("video");
        if (videoElement === null) {
          console.log("Whops, video figure had no video element");
          return nodes;
        }
        const videoSrc = videoElement.getAttribute("src");
        if (videoSrc === undefined) {
          console.log("Whops, video element had no src");
          return nodes;
        }
        return [...nodes, {
          type: "video",
          src: videoSrc,
        }];
      }

      return nodes;
    }, []);
  }
}
