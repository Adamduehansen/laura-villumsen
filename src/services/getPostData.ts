import { ServiceResponse, Tag, WorkData } from '@/utils/models';
import { query } from '@/utils/query';
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
  path: string
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
        title: '',
        content: '',
        date: '',
        tags: [],
        navigationItems: [],
        siteName: '',
        socials: [],
        subName: '',
      },
    };
  }

  return {
    data: {
      title: data.post.title,
      content: data.post.content,
      date: data.post.workData.date,
      tags: data.post.tags.nodes.map(({ id, name }): Tag => {
        return {
          id: id,
          name: name,
        };
      }),
      siteName: data.generalSettings.title,
      subName: data.generalSettings.description,
      navigationItems: findNavigationItems(data.menus.nodes, 'navigation'),
      socials: findNavigationItems(data.menus.nodes, 'socials'),
    },
  };
}