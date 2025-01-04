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
  variant: "h1" | "h2";
}

export interface TwoColumnBlock {
  type: "two-columns";
  left: Block[];
  right: Block[];
}

export interface CaseInfoBlock {
  type: "case-info";
}

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | HeadingBlock
  | TwoColumnBlock
  | CaseInfoBlock;
