import { HTMLElement, Node, NodeType } from "node-html-parser";
import { Block, ImageBlock, VideoBlock } from "$utils/block.ts";

export interface BlockCreator {
  create: (htmlElement: HTMLElement) => Block | null;
}

class ImageBlockCreator implements BlockCreator {
  create(htmlElement: HTMLElement): ImageBlock | null {
    const imageElement = htmlElement.querySelector("img");
    if (imageElement === null) {
      console.log("Whops, image figure had no image element");
      return null;
    }
    const srcAttribute = imageElement.getAttribute("src");
    if (srcAttribute === undefined) {
      console.log("Whops, video element had no src");
      return null;
    }
    const altAttribute = imageElement.getAttribute("alt");
    return {
      type: "image",
      src: srcAttribute,
      alt: altAttribute,
    };
  }
}

class VideoBlockCreator implements BlockCreator {
  create(htmlElement: HTMLElement): VideoBlock | null {
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
  }
}

class TextBlockCreator implements BlockCreator {
  create(htmlElement: HTMLElement): Block | null {
    return {
      type: "text",
      text: htmlElement.innerText,
    };
  }
}

class HeadingBlockCreator implements BlockCreator {
  create(htmlElement: HTMLElement): Block | null {
    return {
      type: "heading",
      text: htmlElement.innerText,
    };
  }
}

class TwoColumnBlockCreator implements BlockCreator {
  #isHtmlNode(node: Node): node is HTMLElement {
    return node.nodeType === NodeType.ELEMENT_NODE;
  }

  create(htmlElement: HTMLElement): Block | null {
    const columns = htmlElement.querySelectorAll("div");
    if (columns.length !== 2) {
      console.log("Whops, columns are not correct number");
      return null;
    }
    const [leftElement, rightElement] = columns;

    const leftChildren = leftElement.childNodes.filter(this.#isHtmlNode);
    const rightChildren = rightElement.childNodes.filter(this.#isHtmlNode);

    const rightBlocks: Block[] = [];
    for (const child of rightChildren) {
      const block = BlockFactory.getBlock(child);
      if (block === null) {
        continue;
      }
      rightBlocks.push(block);
    }

    const leftBlocks: Block[] = [];
    for (const child of leftChildren) {
      const block = BlockFactory.getBlock(child);
      if (block === null) {
        continue;
      }
      leftBlocks.push(block);
    }

    return {
      type: "two-columns",
      left: leftBlocks,
      right: rightBlocks,
    };
  }
}

export class BlockFactory {
  static isImageBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-image");
  }

  static isVideoBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-video");
  }

  static isTextBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.tagName.toLowerCase() === "p";
  }

  static isHeadingBlock(htmlDocument: HTMLElement): boolean {
    return htmlDocument.tagName.toLowerCase() === "h2";
  }

  static isColumnBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-columns");
  }

  static getBlock(htmlElement: HTMLElement): Block | null {
    let blockCreator: BlockCreator | null = null;
    if (BlockFactory.isImageBlock(htmlElement)) {
      blockCreator = BlockFactory.get("image");
    } else if (BlockFactory.isVideoBlock(htmlElement)) {
      blockCreator = BlockFactory.get("video");
    } else if (BlockFactory.isTextBlock(htmlElement)) {
      blockCreator = BlockFactory.get("text");
    } else if (BlockFactory.isHeadingBlock(htmlElement)) {
      blockCreator = BlockFactory.get("heading");
    } else if (BlockFactory.isColumnBlock(htmlElement)) {
      blockCreator = BlockFactory.get("two-columns");
    }

    return blockCreator?.create(htmlElement) ?? null;
  }

  static get(type: Block["type"]): BlockCreator | never {
    switch (type) {
      case "image":
        return new ImageBlockCreator();
      case "text":
        return new TextBlockCreator();
      case "video":
        return new VideoBlockCreator();
      case "heading":
        return new HeadingBlockCreator();
      case "two-columns":
        return new TwoColumnBlockCreator();
    }
  }
}
