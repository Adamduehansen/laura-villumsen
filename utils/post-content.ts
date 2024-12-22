import { parse } from "node-html-parser";

export class PostContent {
  readonly intro: string;
  readonly text: string;

  constructor(rawContent: string) {
    const htmlDocument = parse(rawContent);
    const [intro, text, ...rest] = htmlDocument.childNodes.filter((node) => {
      return node.rawTagName !== "";
    });

    this.intro = intro.innerText;
    this.text = text.innerText;
  }
}
