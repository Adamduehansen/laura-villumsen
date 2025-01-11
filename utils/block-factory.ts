import { HTMLElement } from "node-html-parser";
import {
  Block,
  CaseInfoBlock,
  ColumnBlock,
  HeadingBlock,
  ImageBlock,
  TableBlock,
  TextBlock,
  VideoBlock,
} from "$utils/block.ts";
import { parseBlocks } from "$utils/parse-blocks.ts";
import { Post } from "../services/post-service.ts";

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
    return {
      type: "image",
      src: srcAttribute,
      alt: imageElement.getAttribute("alt"),
      height: imageElement.getAttribute("height"),
      width: imageElement.getAttribute("width"),
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
      text: htmlElement.textContent,
      size: this.#getSize(htmlElement.classList),
    };
  }

  #getSize(classList: HTMLElement["classList"]): TextBlock["size"] {
    if (classList.contains("has-x-large-font-size")) {
      return "extra-large";
    } else if (classList.contains("has-large-font-size")) {
      return "large";
    }
    return "normal";
  }
}

class HeadingBlockCreator implements BlockCreator {
  create(htmlElement: HTMLElement): Block | null {
    const tagName = htmlElement.tagName.toLowerCase();
    return {
      type: "heading",
      text: htmlElement.textContent,
      size: this.#getSize(htmlElement.classList),
      variant: tagName === "h1" ? "h1" : "h2",
    };
  }

  #getSize(classList: HTMLElement["classList"]): HeadingBlock["size"] {
    if (classList.contains("has-x-large-font-size")) {
      return "extra-large";
    }
    return "large";
  }
}

class ColumnsBlockCreator implements BlockCreator {
  #columnElement!: HTMLElement;
  #numberOfColumns = 0;

  create(htmlElement: HTMLElement): Block | null {
    this.#columnElement = htmlElement;
    const columnElements = htmlElement.querySelectorAll("div");
    this.#numberOfColumns = columnElements.length;

    return {
      type: "columns",
      columns: htmlElement
        .querySelectorAll("div")
        .map(this.#createColumn.bind(this)),
    };
  }

  #createColumn(columnElement: HTMLElement): ColumnBlock["columns"][number] {
    return {
      width: this.#getWidth(columnElement.getAttribute("style")),
      blocks: parseBlocks(columnElement.innerHTML),
    };
  }

  #getWidth(style?: string): ColumnBlock["columns"][number]["width"] {
    if (this.#numberOfColumns === 1) {
      return 12;
    }
    if (style === "flex-basis:66.66%") {
      return 8;
    } else if (style === "flex-basis:33.33%" || this.#numberOfColumns === 3) {
      return 4;
    } else {
      return 6;
    }
  }
}

export class CaseInfoBlockCreator implements BlockCreator {
  readonly #post: Post;

  constructor(post: Post) {
    this.#post = post;
  }

  create(): CaseInfoBlock {
    return {
      type: "case-info",
      client: this.#post.acf.client,
      year: this.#post.acf.date.substring(0, 4),
      notes: this.#post.acf.notes,
      services: this.#post.tagNames,
      websiteUrl: this.#post.acf.website,
    };
  }
}

export class TableBlockCreator implements BlockCreator {
  create(htmlElement: HTMLElement): TableBlock | null {
    const tableRows = htmlElement.querySelectorAll("tr");
    const rows = tableRows.map((row): [string, string] => {
      const cellElements = row.querySelectorAll("td");
      return [cellElements[0].textContent, cellElements[1].textContent];
    });
    return {
      type: "table",
      heading: htmlElement
        .querySelector(".wp-element-caption")?.textContent ??
        "",
      rows: rows,
    };
  }
}

const BlockFactoryCreatorMap: Record<Block["type"], BlockCreator> = {
  "heading": new HeadingBlockCreator(),
  "image": new ImageBlockCreator(),
  "text": new TextBlockCreator(),
  "columns": new ColumnsBlockCreator(),
  "video": new VideoBlockCreator(),
  "case-info": {
    create: function () {
      return {
        type: "case-info",
        client: "",
        notes: [],
        services: [],
        year: "",
        websiteUrl: null,
      };
    },
  },
  "table": new TableBlockCreator(),
};

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
    const tagName = htmlDocument.tagName.toLowerCase();
    return tagName === "h1" || tagName === "h2";
  }

  static isColumnBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-columns");
  }

  static isCaseInfo(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-case-info");
  }

  static isTableBlock(htmlElement: HTMLElement): boolean {
    return htmlElement.classList.contains("wp-block-table");
  }

  static getBlock(htmlElement: HTMLElement): Block | null {
    let blockCreator: BlockCreator | undefined;
    if (BlockFactory.isColumnBlock(htmlElement)) {
      blockCreator = BlockFactoryCreatorMap["columns"];
    } else if (BlockFactory.isHeadingBlock(htmlElement)) {
      blockCreator = BlockFactoryCreatorMap["heading"];
    } else if (BlockFactory.isTextBlock(htmlElement)) {
      blockCreator = BlockFactoryCreatorMap["text"];
    } else if (BlockFactory.isImageBlock(htmlElement)) {
      blockCreator = BlockFactoryCreatorMap["image"];
    } else if (BlockFactory.isVideoBlock(htmlElement)) {
      blockCreator = BlockFactoryCreatorMap["video"];
    } else if (BlockFactory.isCaseInfo(htmlElement)) {
      blockCreator = BlockFactoryCreatorMap["case-info"];
    } else if (BlockFactory.isTableBlock(htmlElement)) {
      blockCreator = BlockFactoryCreatorMap["table"];
    }

    return blockCreator?.create(htmlElement) ?? null;
  }
}
