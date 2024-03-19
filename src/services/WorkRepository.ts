import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import parse from 'node-html-parser';
import { z } from 'zod';
import { Repository } from './Repository';
import workQuery from './Work.graphql';
import workTeaserQuery from './workTeasers.graphql';

export type WorkTeaser = {
  id: string;
  uri: string;
  client: string;
  text: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const workTeasersSchema = z.object({
  posts: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        uri: z.string(),
        featuredImage: z.object({
          node: z.object({
            sourceUrl: z.string(),
            altText: z.string(),
            mediaDetails: z.object({
              height: z.number(),
              width: z.number(),
            }),
          }),
        }),
        workData: z.object({
          client: z.string(),
          frontpageText: z.string(),
        }),
      }),
    ),
  }),
});

const workSchema = z.object({
  post: z
    .object({
      content: z.string(),
      tags: z.object({
        nodes: z.array(
          z.object({
            name: z.string(),
          }),
        ),
      }),
      workData: z.object({
        client: z.string(),
        types: z.string(),
        date: z.string(),
        website: z
          .object({
            title: z.string(),
            url: z.string(),
          })
          .nullable(),
      }),
    })
    .nullable(),
});

export type Work = {
  text: string;
  client: string;
  year: string;
  services: string[];
  url?: string;
  medias: Media[];
};

type Media =
  | {
      type: 'image';
      src: string;
      alt: string;
      width: string;
      height: string;
    }
  | {
      type: 'video';
      src: string;
    };

export class WorkRepository extends Repository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client);
  }

  async getWork(id: string): Promise<Work | undefined> {
    const response = await this.client.query({
      query: workQuery,
      variables: {
        id: id,
      },
      fetchPolicy: 'no-cache',
    });

    const { post } = workSchema.parse(response.data);

    if (post === null) {
      return undefined;
    }

    return {
      text: this.#extractText(post.content),
      client: post.workData.client,
      medias: this.#extractImagesAndVideos(post.content),
      services: post.tags.nodes.map((tag) => tag.name),
      year: new Date(post.workData.date).getFullYear().toString(),
      url: post.workData.website?.url || undefined,
    };
  }

  async getTeasers(): Promise<WorkTeaser[]> {
    const response = await this.client.query({
      query: workTeaserQuery,
      fetchPolicy: 'no-cache',
    });

    const workTeasers = workTeasersSchema.parse(response.data);
    return workTeasers.posts.nodes.map((node): WorkTeaser => {
      return {
        id: node.id,
        uri: node.uri,
        text: node.workData.frontpageText,
        client: node.workData.client,
        image: {
          src: node.featuredImage.node.sourceUrl,
          alt: node.featuredImage.node.altText,
          height: node.featuredImage.node.mediaDetails.height,
          width: node.featuredImage.node.mediaDetails.width,
        },
      };
    });
  }

  #extractText(content: string): string {
    const document = parse(content);
    return document.querySelector('p')?.textContent || '';
  }

  #extractImagesAndVideos(content: string): Media[] {
    const document = parse(content);
    const elements = [
      ...document.querySelectorAll('img'),
      ...document.querySelectorAll('video'),
    ];

    return elements
      .map((element): Media | undefined => {
        if (element.rawTagName === 'img') {
          return {
            type: 'image',
            src: element.getAttribute('src') || '',
            alt: element.getAttribute('alt') || '',
            height: element.getAttribute('height') || '256',
            width: element.getAttribute('width') || '256',
          };
        }
        if (element.rawTagName === 'video') {
          return {
            type: 'video',
            src: element.getAttribute('src') || '',
          };
        }
        return undefined;
      })
      .filter((element): element is Media => element !== undefined);
  }
}
