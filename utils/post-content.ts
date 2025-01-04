import { HTMLElement, Node, NodeType, parse } from "node-html-parser";
import { Block } from "$utils/block.ts";
import { BlockFactory } from "$utils/block-factory.ts";

export class PostContent {
  readonly blocks: Block[];

  constructor(rawContent: string) {
    const htmlDocument = parse(rawContent);
    const blocks = htmlDocument.childNodes.filter(
      this.#isHtmlNode,
    );
    this.blocks = this.#getBlocks(blocks);
  }

  #isHtmlNode(node: Node): node is HTMLElement {
    return node.nodeType === NodeType.ELEMENT_NODE;
  }

  #getBlocks(nodes: HTMLElement[]): Block[] {
    return nodes.reduce<Block[]>((nodes, node): Block[] => {
      const block = BlockFactory.getBlock(node);

      if (block === null) {
        return nodes;
      } else {
        return [...nodes, block];
      }
    }, []);
  }
}
