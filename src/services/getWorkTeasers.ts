import { ServiceResponse, WorkTeaser } from '@/utils/models';
import { query } from '@/utils/query';

interface WorkTeaserGraphQL {
  id: string;
  title: string;
  workData: {
    date: string;
  };
}

interface WorkTeaserWPGraphQLResponse {
  data: {
    posts: {
      nodes: WorkTeaserGraphQL[];
    };
  };
}

function toWorkTeaser({ id, title, workData }: WorkTeaserGraphQL): WorkTeaser {
  return {
    id: id,
    title: title,
    date: workData.date,
  };
}

export async function getWorkTeasers(): Promise<ServiceResponse<WorkTeaser[]>> {
  const worksResponse = await query(`
    query FrontpageData {
      posts {
        nodes {
          id
          title
          workData {
            date
          }
        }
      }
    }
  `);
  const { data } = (await worksResponse.json()) as WorkTeaserWPGraphQLResponse;

  return {
    data: data.posts.nodes.map(toWorkTeaser),
  };
}
