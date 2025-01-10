import { HTMLElement, Node, NodeType, parse } from "node-html-parser";
import { Block } from "$utils/block.ts";
import { BlockFactory } from "$utils/block-factory.ts";

function isHtmlNode(node: Node): node is HTMLElement {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

export function parseBlocks(rawContent: string): Block[] {
  const htmlDocument = parse(rawContent);
  return htmlDocument
    .childNodes
    .filter(isHtmlNode)
    .reduce<Block[]>((blocks, node): Block[] => {
      const block = BlockFactory.getBlock(node);

      if (block === null) {
        return blocks;
      } else {
        return [...blocks, block];
      }
    }, []);
}
