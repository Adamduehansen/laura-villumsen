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

export interface TwoColumnBlock {
  type: "two-columns";
  left: Block[];
  right: Block[];
}

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | HeadingBlock
  | TwoColumnBlock;
