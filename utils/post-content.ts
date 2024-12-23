import { Node, parse } from "node-html-parser";

interface TextBlock {
  type: "text";
  text: string;
}

type Block = TextBlock;

export class PostContent {
  readonly intro: string;
  readonly text: string;
  readonly blocks: Block[];

  constructor(rawContent: string) {
    const htmlDocument = parse(rawContent);
    const [intro, text, ...rest] = htmlDocument.childNodes.filter((node) => {
      return node.rawTagName !== "";
    });

    this.intro = intro.innerText;
    this.text = text.innerText;
    this.blocks = this.#getBlocks(rest);
  }

  #getBlocks(nodes: Node[]): Block[] {
    return nodes.reduce<Block[]>((nodes, node): Block[] => {
      console.log(node.rawTagName);

      switch (node.rawTagName) {
        default:
          return nodes;
      }
    }, []);
  }
}
