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
}

export type ContentBlock = TextBlock | ImageBlock | VideoBlock;

export interface TwoColumnBlock {
  type: "two-columns";
  left: ContentBlock | null;
  right: ContentBlock | null;
}

export type Block = ContentBlock | TwoColumnBlock;
