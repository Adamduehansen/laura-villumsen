export interface TextBlock {
  type: "text";
  text: string;
}

export interface VideoBlock {
  type: "video";
  src: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt?: string;
}

export interface HeadingBlock {
  type: "heading";
  text: string;
}

export type ContentBlock = TextBlock | ImageBlock | VideoBlock | HeadingBlock;

export interface TwoColumnBlock {
  type: "two-columns";
  left: ContentBlock[];
  right: ContentBlock[];
}

export type Block = ContentBlock | TwoColumnBlock;
