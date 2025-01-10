export interface TextBlock {
  type: "text";
  text: string;
  size: "normal" | "large" | "extra large";
}

export interface VideoBlock {
  type: "video";
  src: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  height?: string;
  width?: string;
  alt?: string;
}

export interface HeadingBlock {
  type: "heading";
  text: string;
  variant: "h1" | "h2";
}

export interface ColumnBlock {
  type: "columns";
  columns: {
    width: 4 | 6 | 8;
    blocks: Block[];
  }[];
}

export interface CaseInfoBlock {
  type: "case-info";
}

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | HeadingBlock
  | ColumnBlock
  | CaseInfoBlock;
