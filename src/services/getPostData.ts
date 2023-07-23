import { ServiceResponse, Tag, WorkData } from '@/utils/models';
import { query } from '@/utils/query';
import { parse } from 'node-html-parser';
import {
  GeneralSettingsWPGraphQL,
  MenusWPGraphQL,
  findNavigationItems,
} from './common';

interface TagWPGraphQL {
  id: string;
  name: string;
}

interface PostWPGraphQL {
  title: string;
  content: string;
  tags: {
    nodes: TagWPGraphQL[];
  };
  workData: {
    date: string;
    types: string;
  };
}

interface PostWPGraphQLResponse {
  data: {
    post: PostWPGraphQL | null;
    menus: MenusWPGraphQL;
    generalSettings: GeneralSettingsWPGraphQL;
  };
}

export async function getPostData(
  path: string,
): Promise<ServiceResponse<WorkData>> {
  const postDataResponse = await query(`
    query PostData {
      post(id: "${path}", idType: URI) {
        title
        content
        tags {
          nodes {
            id
            name
          }
        }
        workData {
          date
          types
        }
      }
      menus {
        nodes {
          id
          name
          menuItems {
            nodes {
              id
              label
              uri
            }
          }
        }
      }
      generalSettings {
        title
        description
      }
    }
  `);

  const { data } = (await postDataResponse.json()) as PostWPGraphQLResponse;

  if (data.post === null) {
    return {
      error: new Error('Post not found'),
      data: {
        image: null,
        galleryContent: '',
        title: '',
        content: '',
        date: '',
        tags: [],
        navigationItems: [],
        siteName: '',
        socials: [],
        description: '',
        types: '',
      },
    };
  }

  const root = parse(data.post.content);
  const content = root.querySelector('p');
  const gallery = root.querySelectorAll(':scope > figure');

  return {
    data: {
      title: data.post.title,
      content: content?.innerHTML ?? '',
      date: data.post.workData.date,
      tags: data.post.tags.nodes.map(({ id, name }): Tag => {
        return {
          id: id,
          name: name,
        };
      }),
      siteName: data.generalSettings.title,
      description: data.generalSettings.description,
      navigationItems: findNavigationItems(data.menus.nodes, 'navigation'),
      socials: findNavigationItems(data.menus.nodes, 'socials'),
      galleryContent: gallery.join(''),
      types: data.post.workData.types,
      image: null,
    },
  };
}
