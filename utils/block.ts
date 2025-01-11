export interface TextBlock {
  type: "text";
  text: string;
  size: "normal" | "large" | "extra-large";
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
  size: "large" | "extra-large";
}

export interface ColumnBlock {
  type: "columns";
  columns: {
    width: 4 | 6 | 8 | 12;
    blocks: Block[];
  }[];
}

export interface CaseInfoBlock {
  type: "case-info";
  client: string;
  year: string;
  services: string[];
  websiteUrl: string | null;
  notes: string[];
}

export type Block =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | HeadingBlock
  | ColumnBlock
  | CaseInfoBlock;
