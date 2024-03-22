import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import parse, { HTMLElement, Node, NodeType } from 'node-html-parser';
import { z } from 'zod';
import aboutQuery from './About.graphql';
import { Repository } from './Repository';

const aboutSchema = z.object({
  page: z.object({
    content: z.string(),
  }),
});

type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Table = {
  title: string;
  content: string;
};

type AboutContent = {
  text: string;
  image?: Image;
  educations: Table;
  employments: Table;
  awards: Table;
};

function isElementNode(node: Node): node is HTMLElement {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

function isTextElement(htmlElement: HTMLElement): boolean {
  return htmlElement.rawTagName === 'p';
}

function isFigureWithImageElement(htmlElement: HTMLElement): boolean {
  if (htmlElement.rawTagName !== 'figure') {
    return false;
  }

  return htmlElement.querySelector('img') !== null;
}

function extractImage(htmlElement: HTMLElement | undefined) {
  return htmlElement?.querySelector('img');
}

function getImageProperties(
  htmlElement: HTMLElement | undefined | null,
): Image | undefined {
  if (htmlElement === undefined || htmlElement === null) {
    return undefined;
  }

  return {
    src: htmlElement.getAttribute('src') ?? '',
    alt: htmlElement.getAttribute('alt') ?? '',
    width: parseInt(htmlElement.getAttribute('width') ?? '') ?? 0,
    height: parseInt(htmlElement.getAttribute('height') ?? '') ?? '',
  };
}

function isFigureWithTableElement(htmlElement: HTMLElement): boolean {
  if (htmlElement.rawTagName !== 'figure') {
    return false;
  }

  return htmlElement.querySelector('table') !== null;
}

function extractTableElement(htmlElement: HTMLElement): Table | null {
  const table = htmlElement.querySelector('table');
  const caption = htmlElement.querySelector('figcaption');
  if (table === null || caption === null) {
    return null;
  }

  return {
    content: table.outerHTML,
    title: caption.textContent,
  };
}

function isNotNull<T>(htmlElement: T | null): htmlElement is T {
  return htmlElement !== null;
}

export class PageRepository extends Repository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client);
  }

  async getAboutPageContent(): Promise<AboutContent> {
    const response = await this.client.query({
      query: aboutQuery,
    });

    const { page } = aboutSchema.parse(response.data);

    const htmlElements = parse(page.content).childNodes.filter(isElementNode);
    const textElement = htmlElements.find(isTextElement);
    const imageElement = getImageProperties(
      extractImage(htmlElements.find(isFigureWithImageElement)),
    );
    const [education, employment, awards] = htmlElements
      .filter(isFigureWithTableElement)
      .map(extractTableElement)
      .filter(isNotNull);

    return {
      text: textElement?.textContent ?? '',
      image: imageElement,
      educations: education,
      employments: employment,
      awards: awards,
    };
  }
}
