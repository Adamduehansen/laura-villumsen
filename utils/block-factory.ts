import { HTMLElement } from "node-html-parser";
import { ContentBlock, ImageBlock, VideoBlock } from "$utils/block.ts";

export interface BlockCreator {
  create: (htmlElement: HTMLElement) => ContentBlock | null;
}

class ImageBlockCreator implements BlockCreator {
  create(htmlElement: HTMLElement): ImageBlock | null {
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
  create(htmlElement: HTMLElement): ContentBlock | null {
    return {
      type: "text",
      text: htmlElement.innerText,
    };
  }
}

export class BlockFactory {
  static get(type: ContentBlock["type"]): BlockCreator | never {
    switch (type) {
      case "image":
        return new ImageBlockCreator();
      case "text":
        return new TextBlockCreator();
      case "video":
        return new VideoBlockCreator();
    }
  }
}
